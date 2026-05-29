import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function testConnection() {
    console.log('Testing connection with:');
    console.log('Host:', process.env.DB_HOST);
    console.log('User:', process.env.DB_USER);
    console.log('Database:', process.env.DB_NAME);
    console.log('Password:', process.env.DB_PASSWORD ? '********' : '(empty)');

    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT || 3306,
        });
        console.log('✅ Success! Connected to the database.');
        
        const [rows] = await connection.query('SHOW TABLES LIKE "profiles"');
        if (rows.length > 0) {
            console.log('✅ Table "profiles" exists.');
            const [columns] = await connection.query('DESCRIBE profiles');
            console.log('Table structure:');
            console.table(columns);
        } else {
            console.log('❌ Table "profiles" DOES NOT exist in database:', process.env.DB_NAME);
        }
        
        await connection.end();
    } catch (err) {
        console.error('❌ Connection failed:');
        console.error(err);
    }
}

testConnection();
