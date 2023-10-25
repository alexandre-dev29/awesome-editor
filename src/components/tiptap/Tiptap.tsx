'use client';

import { Editor, EditorContent } from '@tiptap/react';
import BubbleMenuTipTap from './BubbleMenuTipTap';

const Tiptap = ({
  editor,
  imageUploadMethod,
}: {
  editor: Editor | null;
  imageUploadMethod?: (imageFile: any) => Promise<string>;
}) => {
  return (
    <>
      <BubbleMenuTipTap editor={editor} imageUploadMethod={imageUploadMethod} />
      <EditorContent editor={editor} />
    </>
  );
};

export default Tiptap;
