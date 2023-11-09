import './styles/global.css';
import Tiptap from './components/tiptap/Tiptap';
import { Editor } from '@tiptap/react';
import { UploadFn } from './types/types';

export const AwesomeEditor = ({
  editor,
  imageUploadFn,
}: {
  editor: Editor | null;
  imageUploadFn: UploadFn;
}) => {
  return <Tiptap editor={editor} imageUploadMethod={imageUploadFn} />;
};

export default AwesomeEditor;
