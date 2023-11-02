import './styles/global.css';
import { tipTapEditorConfig } from './config/tiptap';
import { useEditor } from '@tiptap/react';
import Tiptap from './components/tiptap/Tiptap';
import { Toaster } from './components/ui/toaster';

export const AwesomeEditor = ({
  content,
  imageUploadMethod,
}: {
  content: string;
  imageUploadMethod: () => Promise<string>;
}) => {
  const editor = useEditor(tipTapEditorConfig(content, imageUploadMethod));

  return (
    <>
      <Toaster />
      <Tiptap editor={editor} />
    </>
  );
};

export default AwesomeEditor;
