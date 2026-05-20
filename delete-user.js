const sqlite3 = require('sqlite3').verbose();

// Open your database file
const db = new sqlite3.Database('./trij.db', (err) => {
  if (err) return console.error(err.message);
});

// ⚠️ CHANGE THIS to the exact email address you want to delete!
const emailToDelete = 'Leebron@gmail.com'; 

db.serialize(() => {
  db.run(`DELETE FROM users WHERE email = ?`, [emailToDelete], function(err) {
    if (err) {
      console.error("❌ Error deleting:", err.message);
    } else {
      console.log(`💥 Done! Deleted user: ${emailToDelete} (Rows affected: ${this.changes})`);
    }
  });
});

db.close();