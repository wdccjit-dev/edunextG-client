const bcrypt = require("bcryptjs");
const pool = require("./db");

async function createAdmin() {
  try {
    const name = "Administrator";
    const email = "admin@edunextg.com";
    const password = "Admin@123";

    // Check whether admin already exists
    const [existing] = await pool.execute(
      "SELECT id FROM admins WHERE email = ? LIMIT 1",
      [email]
    );

    if (existing.length > 0) {
      console.log("Admin already exists.");
      process.exit(0);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Insert admin
    await pool.execute(
      `INSERT INTO admins (name, email, password, role)
       VALUES (?, ?, ?, ?)`,
      [name, email, hashedPassword, "admin"]
    );

    console.log("Admin created successfully.");
    console.log("Email:", email);
    console.log("Password:", password);

    process.exit(0);
  } catch (error) {
    console.error("Error creating admin:", error.message);
    process.exit(1);
  }
}

createAdmin();