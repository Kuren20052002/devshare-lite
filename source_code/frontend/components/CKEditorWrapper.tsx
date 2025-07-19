"use client";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

type Props = {
  value: string;
  onChange: (data: string) => void;
};

export default function CKEditorWrapper({ value, onChange }: Props) {
  function uploadAdapter(loader: any) {
    return {
      async upload() {
        const file = await loader.file;
        const formData = new FormData();
        formData.append("image", file);

        const res = await fetch("http://localhost:3001/uploads", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        return { default: data.url };
      },
    };
  }

  function CustomUploadPlugin(editor: any) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader: any) =>
      uploadAdapter(loader);
  }

  return (
    <div className="w-full h-full max-w-full mx-auto md:w-full border border-gray-300 rounded-md shadow-sm">
      <CKEditor
        editor={ClassicEditor as any}
        data={value}
        onChange={(_, editor) => {
          const data = editor.getData();
          onChange(data);
        }}
        config={{
          extraPlugins: [CustomUploadPlugin],
        }}
      />
    </div>
  );
}
