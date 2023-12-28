import { storage } from "../../src/services/firebaseInit";

async function uploadFile(file: File, path: string): Promise<string> {
  const storageRef = storage.ref(path);
  const fileRef = storageRef.child(file.name);
  await fileRef.put(file);
  const downloadURL = await fileRef.getDownloadURL();
  return downloadURL;
}
