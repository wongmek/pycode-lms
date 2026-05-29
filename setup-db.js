import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function setupDatabase() {
    console.log('--- Starting Database Setup ---');
    
    // 1. Connect without database first to create it
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT || 3306,
        ssl: {
            minVersion: 'TLSv1.2',
            rejectUnauthorized: true
        }
    });

    try {
        console.log(`Creating database "${process.env.DB_NAME}" if it doesn't exist...`);
        await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
        await connection.query(`USE ${process.env.DB_NAME}`);

        console.log('Creating table "profiles"...');
        await connection.query(`
            CREATE TABLE IF NOT EXISTS profiles (
                id VARCHAR(255) PRIMARY KEY,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                username VARCHAR(255),
                role ENUM('student', 'teacher', 'parent') DEFAULT 'student',
                xp INT DEFAULT 0,
                avatar_url VARCHAR(255) DEFAULT '🧑‍💻',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        console.log('Creating table "user_labs"...');
        await connection.query(`
            CREATE TABLE IF NOT EXISTS user_labs (
                user_id VARCHAR(255),
                lab_id VARCHAR(255),
                code TEXT,
                is_completed BOOLEAN DEFAULT FALSE,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                PRIMARY KEY (user_id, lab_id),
                FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE
            )
        `);

        console.log('✅ Database and tables are ready!');
    } catch (err) {
        console.error('❌ Setup failed:', err.message);
    } finally {
        await connection.end();
    }
}

setupDatabase();
