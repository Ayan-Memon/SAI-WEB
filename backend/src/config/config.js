import dotenv from "dotenv";

dotenv.config();

if (!process.env.PORT) {
  throw new Error("PORT is not defined in environment variables");
}

if (!process.env.REFRESH_JWT_SECRET) {
  throw new Error("REFRESH_JWT_SECRET is not defined in environment variables");
}

if (!process.env.ACCESS_JWT_SECRET) {
  throw new Error("ACCESS_JWT_SECRET is not defined in environment variables");
}

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is not defined in environment variables");
}

if (!process.env.RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY is not defined in environment variables");
}

// NODE_ENV defines the environment
if (!process.env.NODE_ENV) {
  throw new Error("NODE_ENV is not defined in environment variables");
}

if (!process.env.GOOGLE_CLIENT_ID) {
  throw new Error("GOOGLE_CLIENT_ID is not defined in environment variables");
}

if (!process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error(
    "GOOGLE_CLIENT_SECRET is not defined in environment variables",
  );
}

if (!process.env.GOOGLE_REFRESH_TOKEN) {
  throw new Error(
    "GOOGLE_REFRESH_TOKEN is not defined in environment variables",
  );
}

if (!process.env.GOOGLE_USER) {
  throw new Error(
    "GOOGLE_REDIRECT_URI is not defined in environment variables",
  );
}

if (!process.env.IMAGEKIT_PUBLIC_KEY) {
  throw new Error(
    "IMAGEKIT_PUBLIC_KEY is not defined in environment variables",
  );
}

if (!process.env.IMAGEKIT_PRIVATE_KEY) {
  throw new Error(
    "IMAGEKIT_PRIVATE_KEY is not defined in environment variables",
  );
}

if (!process.env.IMAGEKIT_URL_ENDPOINT) {
  throw new Error(
    "IMAGEKIT_URL_ENDPOINT is not defined in environment variables",
  );
}

if (!process.env.FRONTEND_URL) {
  throw new Error("FRONTEND_URL is not defined in environment variables");
}

if (!process.env.BREVO_API_KEY) {
  throw new Error("BREVO_API_KEY is not defined in environment variables");
}

export const {
  REFRESH_JWT_SECRET,
  ACCESS_JWT_SECRET,
  MONGO_URI,
  PORT,
  RESEND_API_KEY,
  NODE_ENV,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REFRESH_TOKEN,
  GOOGLE_USER,
  IMAGEKIT_PUBLIC_KEY,
  IMAGEKIT_PRIVATE_KEY,
  IMAGEKIT_URL_ENDPOINT,
  FRONTEND_URL,
  BREVO_API_KEY,
} = process.env;
