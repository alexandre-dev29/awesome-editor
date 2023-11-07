import './styles/global.css';
import Tiptap from './components/tiptap/Tiptap';
import { Editor } from '@tiptap/react';

export const AwesomeEditor = ({ editor }: { editor: Editor | null }) => {
  return (
    <>
      <Tiptap editor={editor} />
    </>
  );
};

export default AwesomeEditor;
