/* eslint-disable @typescript-eslint/no-explicit-any */

import { listFilesInFolderWithUrls, uploadFile } from "@/lib/firebase/storage";
import { logError, logInfo } from "@/utils/log";
import { SignedOut, SignInButton } from "@clerk/clerk-react";
import { Key, useEffect, useState } from "react";

export const LandingPage = () => {
  const [data, setData] = useState<File | null>(null); // Safely handle file input
  const [img, setImg] = useState<any>([]); // Define proper type for img state

  useEffect(() => {
    const addDoc = async () => {
      const res = await listFilesInFolderWithUrls("/");
      setImg(res); // Assuming res is an array of objects containing 'url' property
      logInfo(res);
    };
    addDoc();
  }, []);

  async function upload() {
    if (data) {
      // Only upload if `data` is not null or undefined
      const res = await uploadFile(data);
      logInfo(res);
    } else {
      logError("No file selected to upload.");
    }
  }

  return (
    <>
      <div>Landing Page</div>

      <SignedOut>
        <SignInButton />
      </SignedOut>
      <div>
        <input
          type="file"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setData(file); // Safely update state
            }
          }}
        />
        <button onClick={upload}>Upload</button>
      </div>

      <div>
        {img?.map(
          (i: { url: string | undefined }, index: Key | null | undefined) => (
            <img key={index} src={i.url} alt="Uploaded" /> // Use key prop for lists
          )
        )}
      </div>
    </>
  );
};
