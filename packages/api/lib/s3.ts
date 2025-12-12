import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.AWS_REIGON,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function uploadImageToS3(
  buffer: Buffer,
  fileName: string,
  contentType: string
): Promise<string> {
  const bucketName = process.env.S3_BUCKET_NAME!;
  const reigon = process.env.AWS_REIGON || "ca-west-1";

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: `projects/${fileName}`,
    Body: buffer,
    ContentType: contentType,
  });

  await s3Client.send(command);

  return `https://${bucketName}.s3.${reigon}.amazonaws.com/projects/${fileName}`;
}

export async function deleteImagefromS3(imageUrl: string): Promise<void> {
  const bucketName = process.env.S3_BUCKET_NAME!;

  const urlSections = imageUrl.split("/projects/");
  if (urlSections.length < 2) {
    throw new Error(`Invalid S3 URL Format: ${imageUrl}`);
  }

  const fileName = urlSections[1];
  const key = `projects/${fileName}`;

  const command = new DeleteObjectCommand({
    Bucket: bucketName,
    Key: key,
  });
  try {
    await s3Client.send(command);
    console.log("Image Deleted");
  } catch (error) {
    console.error("Failed to delete S3 Object", error);
    throw error;
  }
}
