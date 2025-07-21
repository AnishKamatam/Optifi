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
  // Financial metrics table
  db.run(`
    CREATE TABLE IF NOT EXISTS financial_metrics (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      metric_name VARCHAR(100) NOT NULL,
      value DECIMAL(15,2) NOT NULL,
      period VARCHAR(50) NOT NULL,
      change_percentage DECIMAL(5,2),
      change_type VARCHAR(20),
      additional_data TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) {
      console.error('Error creating financial_metrics table:', err.message);
    } else {
      console.log('✅ Financial metrics table ready');
    }
  });

  // Insert sample data if tables are empty
  insertSampleData();
}

// Insert sample data
function insertSampleData() {

  // Insert financial metrics data
  db.get('SELECT COUNT(*) as count FROM financial_metrics', (err, row: any) => {
    if (err) {
      console.error('Error checking financial metrics data:', err.message);
      return;
    }
    
    if (row && row.count === 0) {
      const metricsData = [
        { 
          metric_name: 'Revenue', 
          value: 499521, 
          period: 'Jun 2025', 
          change_percentage: -17.47, 
          change_type: 'decrease',
          additional_data: JSON.stringify({ '3 month rolling average': 535355.87 })
        },
        { 
          metric_name: 'Net Income (Loss)', 
          value: -9215, 
          period: 'Jun 2025', 
          change_percentage: 107.26, 
          change_type: 'decrease',
          additional_data: JSON.stringify({ '3 month rolling average': 45933.21 })
        },
        { 
          metric_name: 'Loans Funded', 
          value: 600163628, 
          period: 'Jun 2025', 
          change_percentage: 7.29, 
          change_type: 'increase',
          additional_data: JSON.stringify({ 'YTD': 3224684827, 'total': 6065072192 })
        },
        { 
          metric_name: '# Of Loans Funded', 
          value: 1033, 
          period: 'Jun 2025', 
          change_percentage: 2.99, 
          change_type: 'increase',
          additional_data: JSON.stringify({ 'YTD': 5715, 'total': 10993 })
        },
        { 
          metric_name: 'Bank Balance', 
          value: 960266, 
          period: 'Jun 2025', 
          change_percentage: 14.73, 
          change_type: 'increase',
          additional_data: JSON.stringify({ '3 month rolling average': 827460.32 })
        },
        { 
          metric_name: 'Working Capital (Cash + AR - AP - HST)', 
          value: 491735, 
          period: 'Jun 2025', 
          change_percentage: 17.69, 
          change_type: 'increase',
          additional_data: JSON.stringify({ '3 month rolling average': 366930.06 })
        },
        { 
          metric_name: 'Loans Processed', 
          value: 2226833517, 
          period: 'Jun 2025', 
          change_percentage: -14.82, 
          change_type: 'decrease',
          additional_data: JSON.stringify({ 'YTD': 14225022481, 'total': 27169819975 })
        },
        { 
          metric_name: '# Of Loans Processed', 
          value: 3919, 
          period: 'Jun 2025', 
          change_percentage: -11.89, 
          change_type: 'decrease',
          additional_data: JSON.stringify({ 'YTD': 24152, 'total': 46213 })
        }
      ];

      const metricsStmt = db.prepare(`
        INSERT INTO financial_metrics (metric_name, value, period, change_percentage, change_type, additional_data)
        VALUES (?, ?, ?, ?, ?, ?)
      `);

      metricsData.forEach(data => {
        metricsStmt.run([
          data.metric_name, 
          data.value, 
          data.period, 
          data.change_percentage, 
          data.change_type, 
          data.additional_data
        ]);
      });

      metricsStmt.finalize((err) => {
        if (err) {
          console.error('Error inserting financial metrics data:', err.message);
        } else {
          console.log('✅ Sample financial metrics data inserted');
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