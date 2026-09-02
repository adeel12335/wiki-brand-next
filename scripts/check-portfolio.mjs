import "./configure-mongodb-dns.mjs";
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
await mongoose.connect(MONGODB_URI);

const col = mongoose.connection.collection("portfolioitems");
const count = await col.countDocuments();
const sample = await col
  .find({})
  .sort({ sortOrder: 1 })
  .limit(3)
  .project({ title: 1, summary: 1, externalUrl: 1, image: 1, featuredOnHome: 1, status: 1 })
  .toArray();

console.log("count:", count);
console.log(JSON.stringify(sample, null, 2));
await mongoose.disconnect();
