import { NextResponse } from "next/server";
import { minioClient, MINIO_BUCKET } from "@/lib/minio";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const safeName = file.name.replace(/\s+/g, "-");
    const objectName = `${Date.now()}-${safeName}`;

    const bucketExists = await minioClient.bucketExists(MINIO_BUCKET);
    if (!bucketExists) {
      await minioClient.makeBucket(MINIO_BUCKET);
    }

    await minioClient.putObject(
      MINIO_BUCKET,
      objectName,
      buffer,
      buffer.length,
      {
        "Content-Type": file.type || "application/octet-stream",
      }
    );

    const fileUrl = `http://localhost:9000/${MINIO_BUCKET}/${objectName}`;

    return NextResponse.json({
      success: true,
      objectName,
      fileUrl,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Upload failed." },
      { status: 500 }
    );
  }
}