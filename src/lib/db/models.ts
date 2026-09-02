import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const portfolioImageSchema = new Schema(
  {
    cloudinaryId: { type: String, required: true },
    url: { type: String, required: true },
    alt: { type: String, default: "" },
    width: { type: Number, default: 960 },
    height: { type: Number, default: 640 },
  },
  { _id: false },
);

const portfolioSeoSchema = new Schema(
  {
    metaTitle: { type: String, default: "" },
    metaDescription: { type: String, default: "" },
    keywords: { type: String, default: "" },
  },
  { _id: false },
);

const portfolioItemSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    category: { type: String, default: "" },
    summary: { type: String, default: "" },
    body: { type: String, default: null },
    externalUrl: { type: String, default: null },
    featuredOnHome: { type: Boolean, default: false, index: true },
    image: { type: portfolioImageSchema, default: null },
    seo: { type: portfolioSeoSchema, default: () => ({}) },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
      index: true,
    },
    sortOrder: { type: Number, default: 0, index: true },
  },
  { timestamps: true },
);

export type PortfolioDocument = InferSchemaType<typeof portfolioItemSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const PortfolioItem: Model<PortfolioDocument> =
  mongoose.models.PortfolioItem ??
  mongoose.model<PortfolioDocument>("PortfolioItem", portfolioItemSchema);

const adminUserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    lastLoginAt: { type: Date, default: null },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

export type AdminUserDocument = InferSchemaType<typeof adminUserSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const AdminUser: Model<AdminUserDocument> =
  mongoose.models.AdminUser ??
  mongoose.model<AdminUserDocument>("AdminUser", adminUserSchema);

const loginAttemptSchema = new Schema({
  ip: { type: String, required: true, index: true },
  attemptedAt: { type: Date, default: Date.now, expires: 900 },
});

export const LoginAttempt: Model<InferSchemaType<typeof loginAttemptSchema>> =
  mongoose.models.LoginAttempt ??
  mongoose.model("LoginAttempt", loginAttemptSchema);
