import './styles/global.css';
import Tiptap from './components/tiptap/Tiptap';
import { Toaster } from './components/ui/toaster';
import { Editor } from '@tiptap/react';

export const AwesomeEditor = ({ editor }: { editor: Editor | null }) => {
  return (
    <>
      <Toaster />
      <Tiptap editor={editor} />
    </>
  );
};

export default AwesomeEditor;
