import sqlite3 from 'sqlite3';
import path from 'path';

// Database file path
const dbPath = path.join(__dirname, '../../data/optifi.db');

// Create database instance
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('✅ Connected to SQLite database');
    initializeTables();
  }
});

// Initialize database tables
function initializeTables() {
  // Revenue table
  db.run(`
    CREATE TABLE IF NOT EXISTS revenue (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      amount DECIMAL(15,2) NOT NULL,
      period VARCHAR(50) NOT NULL,
      category VARCHAR(100),
      description TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) {
      console.error('Error creating revenue table:', err.message);
    } else {
      console.log('✅ Revenue table ready');
      // Insert sample data if table is empty
      insertSampleData();
    }
  });
}

// Insert sample revenue data
function insertSampleData() {
  db.get('SELECT COUNT(*) as count FROM revenue', (err, row: any) => {
    if (err) {
      console.error('Error checking revenue data:', err.message);
      return;
    }
    
    if (row && row.count === 0) {
      const sampleData = [
        { amount: 2400000, period: 'Q1 2024', category: 'Sales', description: 'Q1 Revenue' },
        { amount: 1800000, period: 'Q4 2023', category: 'Sales', description: 'Q4 Revenue' },
        { amount: 2100000, period: 'Q3 2023', category: 'Sales', description: 'Q3 Revenue' },
        { amount: 1950000, period: 'Q2 2023', category: 'Sales', description: 'Q2 Revenue' }
      ];

      const insertStmt = db.prepare(`
        INSERT INTO revenue (amount, period, category, description)
        VALUES (?, ?, ?, ?)
      `);

      sampleData.forEach(data => {
        insertStmt.run([data.amount, data.period, data.category, data.description]);
      });

      insertStmt.finalize((err) => {
        if (err) {
          console.error('Error inserting sample data:', err.message);
        } else {
          console.log('✅ Sample revenue data inserted');
        }
      });
    }
  });
}

// Helper function to run queries with promises
export function runQuery(sql: string, params: any[] = []): Promise<any> {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

// Helper function to run single query with promises
export function runSingleQuery(sql: string, params: any[] = []): Promise<any> {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

// Helper function to run insert/update/delete with promises
export function runExecute(sql: string, params: any[] = []): Promise<any> {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) {
        reject(err);
      } else {
        resolve({ id: this.lastID, changes: this.changes });
      }
    });
  });
}

export default db; 