import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const app = express();
app.use(cors());
app.use(express.json());

// Log requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Health check route
app.get('/api/test', (req, res) => {
    res.json({ message: 'API is working!' });
});

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    ssl: {
        minVersion: 'TLSv1.2',
        rejectUnauthorized: true
    },
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test DB connection on startup
pool.getConnection()
    .then(conn => {
        console.log('✅ Connected to MySQL database');
        conn.release();
    })
    .catch(err => {
        console.error('❌ Database connection failed:', err.message);
    });

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_key_for_lms_123';

app.post('/api/auth/signup', async (req, res) => {
    console.log('Signup request received:', req.body);
    const { email, password, username, role } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const userId = crypto.randomUUID();

        console.log('Inserting user into DB...');
        await pool.query(
            'INSERT INTO profiles (id, email, password, username, role, xp, avatar_url) VALUES (?, ?, ?, ?, ?, 0, ?)',
            [userId, email, hashedPassword, username, role || 'student', '🧑‍💻']
        );

        console.log('Signup successful for:', email);
        res.status(201).json({ success: true, userId });
    } catch (err) {
        console.error('Signup error:', err);
        if (err.code === 'ER_DUP_ENTRY') return res.status(400).json({ error: 'อีเมลนี้มีผู้ใช้งานแล้ว' });
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const [rows] = await pool.query('SELECT * FROM profiles WHERE email = ?', [email]);
        if (rows.length === 0) return res.status(401).json({ error: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' });

        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' });

        const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

        res.json({
            success: true,
            token,
            user: { id: user.id, email: user.email, username: user.username, role: user.role, xp: user.xp }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Token expired or invalid' });
        req.user = user;
        next();
    });
};

app.post('/api/labs/submit', authenticateToken, async (req, res) => {
    const { userId, labId, code, isCompleted, xpEarned } = req.body;
    if (req.user.id !== userId) return res.status(403).json({ error: 'Forbidden' });

    try {
        await pool.query(
            `INSERT INTO user_labs (user_id, lab_id, code, is_completed) 
       VALUES (?, ?, ?, ?) 
       ON DUPLICATE KEY UPDATE code = ?, is_completed = VALUES(is_completed)`,
            [userId, labId, code, isCompleted, code]
        );

        if (isCompleted && xpEarned > 0) {
            await pool.query('UPDATE profiles SET xp = xp + ? WHERE id = ?', [xpEarned, userId]);
        }
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/teacher/students', authenticateToken, async (req, res) => {
    if (req.user.role !== 'teacher') return res.status(403).json({ error: 'Forbidden' });

    try {
        const [students] = await pool.query('SELECT id, username as name, avatar_url as avatar, xp FROM profiles WHERE role = "student"');

        for (let student of students) {
            const [labs] = await pool.query('SELECT lab_id, is_completed, code FROM user_labs WHERE user_id = ?', [student.id]);

            student.completedMap = {};
            student.latestCode = "";
            labs.forEach(lab => {
                student.completedMap[lab.lab_id] = !!lab.is_completed;
                if (lab.code) student.latestCode = lab.code;
            });

            const completedCount = labs.filter(l => l.is_completed).length;
            student.consistency = Math.min(100, completedCount * 20 + 30);
            student.skills = {
                logic: student.completedMap['syntax-lab'] ? 90 : 45,
                variables: student.completedMap['variables-lab'] ? 85 : 40,
                functions: student.completedMap['lab-71'] ? 80 : 35,
                problemSolving: student.xp > 200 ? 90 : 50,
                consistency: student.consistency
            };
        }

        res.json({ success: true, students });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = 3001;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Backend API running on http://localhost:${PORT}`);
});

export default app;