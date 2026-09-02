/**
 * Create or reset an admin user.
 * Usage: node --env-file=.env.local scripts/create-admin.mjs <username> <password>
 */
import "./configure-mongodb-dns.mjs";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
const username = process.argv[2];
const password = process.argv[3];

if (!MONGODB_URI) {
  console.error("MONGODB_URI is not set");
  process.exit(1);
}

if (!username || !password) {
  console.error("Usage: node --env-file=.env.local scripts/create-admin.mjs <username> <password>");
  process.exit(1);
}

const adminUserSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  passwordHash: String,
  lastLoginAt: Date,
  createdAt: { type: Date, default: Date.now },
});

const AdminUser =
  mongoose.models.AdminUser || mongoose.model("AdminUser", adminUserSchema);

await mongoose.connect(MONGODB_URI);
const passwordHash = await bcrypt.hash(password, 12);

const existing = await AdminUser.findOne({ username });
if (existing) {
  existing.passwordHash = passwordHash;
  await existing.save();
  console.log(`Password updated for "${username}"`);
} else {
  await AdminUser.create({ username, passwordHash });
  console.log(`Admin user "${username}" created`);
}

await mongoose.disconnect();
