import {
  deleteObject,
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
} from "firebase/storage";
import { storage } from "./firebase-config";
import { v4 } from "uuid";
import { logError } from "@/utils/log";

export const uploadFile = async (file: File, filePath?: string) => {
  if (!file) return "no file";
  try {
    if (!filePath) filePath = file.name;
    const storageRef = ref(storage, filePath + v4()); // Create a reference to the file path
    const snapshot = await uploadBytes(storageRef, file); // Upload the file

    const downloadURL = await getDownloadURL(snapshot.ref); // Get the file's download URL

    // The file path is stored in snapshot.ref.fullPath (this is the path in Firebase Storage)
    const filePathInStorage = snapshot.ref.fullPath;

    // Return both the download URL and the file path (if needed)
    return { downloadURL, filePathInStorage };
  } catch (error) {
    logError("Error uploading file:", error);
    // throw error;
    return false;
  }
};

export const getFileURL = async (filePath: string) => {
  try {
    const fileRef = ref(storage, filePath);
    const url = await getDownloadURL(fileRef); // Get the file's download URL
    return url;
  } catch (error) {
    logError("Error getting file URL:", error);
    // throw error;
    return false;
  }
};

export const deleteFile = async (filePath: string) => {
  try {
    const fileRef = ref(storage, filePath); // Create a reference to the file path
    await deleteObject(fileRef); // Delete the file
  } catch (error) {
    logError("Error deleting file:", error);
    // throw error;
    return false;
  }
};

// /folder or / if no files
export const listFilesInFolder = async (folderPath: string) => {
  try {
    const folderRef = ref(storage, folderPath);
    const fileList = await listAll(folderRef);
    return fileList.items.map((item) => item.fullPath); // Return an array of file paths
  } catch (error) {
    logError("Error listing files:", error);
    // throw error;
    return false;
  }
};

export const listFilesInFolderWithUrls = async (folderPath: string) => {
  try {
    const folderRef = ref(storage, folderPath);
    const fileList = await listAll(folderRef);

    // Fetch the download URL for each file and map it with the file path
    const filesWithUrls = await Promise.all(
      fileList.items.map(async (item) => {
        const fileUrl = await getDownloadURL(item);
        return {
          url: fileUrl, // The file URL to be used in an <img> tag
        };
      })
    );

    return filesWithUrls;
  } catch (error) {
    logError("Error listing files with URLs:", error);
    return false;
  }
};

export const uploadFileWithMetadata = async (
  filePath: string,
  file: File,
  metadata: object
) => {
  try {
    const storageRef = ref(storage, filePath);
    const snapshot = await uploadBytes(storageRef, file, metadata);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    logError("Error uploading file with metadata:", error);
    // throw error;
    return false;
  }
};
