import { Client } from "minio";

const endPoint = process.env.MINIO_ENDPOINT;
const port = Number(process.env.MINIO_PORT || 9000);
const useSSL = process.env.MINIO_USE_SSL === "true";
const accessKey = process.env.MINIO_ACCESS_KEY;
const secretKey = process.env.MINIO_SECRET_KEY;

if (!endPoint || !accessKey || !secretKey) {
  throw new Error("MinIO environment variables are missing.");
}

export const minioClient = new Client({
  endPoint,
  port,
  useSSL,
  accessKey,
  secretKey,
});

export const MINIO_BUCKET = process.env.MINIO_BUCKET || "haliverse-assets";