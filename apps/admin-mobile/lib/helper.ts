import * as FileSystem from "expo-file-system/legacy";
import type { ImageInfo } from "@/components/ProjectImagePicker";

// Function to Capitalize the first letter of the sentence
export function capitalize(str: string): string {
  if (!str || typeof str !== "string") return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Title Case
export function titleCase(str: string): string {
  return str
    .split(" ")
    .map((word) => capitalize(word))
    .join(" ");
}

export interface Base64Image {
  base64: string;
  mimeType: string;
  fileName: string;
}

/**
 * Converts local image URIs to base64 strings
 * @param imageUris - Array of ImageInfo objects from ProjectImagePicker
 * @returns Promise resolving to array of base64 image data
 */
export async function convertImagesToBase64(
  imageUris: ImageInfo[]
): Promise<Base64Image[]> {
  const base64Images = await Promise.all(
    imageUris.map(async (image) => {
      try {
        const base64 = await FileSystem.readAsStringAsync(image.uri, {
          encoding: "base64",
        });

        const mimeType = image.type || "image/jpeg";
        const fileName = image.name || `image-${Date.now()}.jpg`;

        return {
          base64,
          mimeType,
          fileName,
        };
      } catch (error) {
        console.error("Error converting image to base64:", error);
        throw error;
      }
    })
  );

  return base64Images;
}
