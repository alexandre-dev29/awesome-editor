'use client';

import { Editor, EditorContent } from '@tiptap/react';
import BubbleMenuTipTap from './BubbleMenuTipTap';
import { UploadFn } from '../../types/types';

const Tiptap = ({
  editor,
  imageUploadMethod,
}: {
  editor: Editor | null;
  imageUploadMethod: UploadFn;
}) => {
  return (
    <>
      <BubbleMenuTipTap editor={editor} imageUploadMethod={imageUploadMethod} />
      <EditorContent editor={editor} />
    </>
  );
};

export default Tiptap;
