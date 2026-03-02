// app/api/drive/route.ts

import { NextResponse } from "next/server";

const API_KEY = process.env.GOOGLE_API_KEY!;
const FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID!;

interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
}

interface ModelFolder {
  id: string;
  name: string;
  fileId: string | null;   // id of model.onnx (for direct download)
  fileSizeBytes: number;   // size of model.onnx
  fileCount: number;       // total files in folder
}

async function listFiles(query: string, fields: string): Promise<DriveFile[]> {
  const files: DriveFile[] = [];
  let pageToken: string | undefined;

  do {
    const params = new URLSearchParams({
      q: query,
      key: API_KEY,
      fields: `nextPageToken, files(${fields})`,
      pageSize: "1000",
    });

    if (pageToken) params.set("pageToken", pageToken);

    const res = await fetch(
      `https://www.googleapis.com/drive/v3/files?${params.toString()}`
    );

    if (!res.ok) throw new Error(`Drive API error: ${res.status}`);

    const data = await res.json();
    files.push(...data.files);
    pageToken = data.nextPageToken;
  } while (pageToken);

  return files;
}

export async function GET() {
  try {
    // Get all subfolders
    const folders = await listFiles(
      `'${FOLDER_ID}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
      "id, name"
    );

    // For each subfolder, find model.onnx and get size info
    const results: ModelFolder[] = await Promise.all(
      folders.map(async (folder) => {
        const files = await listFiles(
          `'${folder.id}' in parents and trashed = false`,
          "id, name, size"
        );

        const onnxFile = files.find((f) => f.name === "model.onnx");

        return {
          id: folder.id,
          name: folder.name,
          fileId: onnxFile?.id ?? null,
          fileSizeBytes: onnxFile?.size ? parseInt(onnxFile.size, 10) : 0,
          fileCount: files.length,
        };
      })
    );

    return NextResponse.json({ folders: results });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch folder info" },
      { status: 500 }
    );
  }
}