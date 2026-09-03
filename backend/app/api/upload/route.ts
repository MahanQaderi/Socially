import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json(
      { success: false, error: "No file provided" },
      { status: 400 },
    );
  }

  const uploadForm = new FormData();

  uploadForm.append("UPLOADCARE_PUB_KEY", "2293e3a64c1a7b3adee0");
  uploadForm.append("UPLOADCARE_STORE", "auto");
  uploadForm.append("file", file);

  try {
    const response = await fetch("https://upload.uploadcare.com/base/", {
      method: "POST",
      body: uploadForm,
    });
    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(error);
  }
}
