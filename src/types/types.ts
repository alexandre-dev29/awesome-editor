import { EditorOptions } from '@tiptap/core';

export enum EmbeddedType {
  Youtube = 'Youtube',
  CodePen = 'CodePen',
  CodeSandBox = 'CodeSandBox',
}

export type UploadFn = (image: File) => Promise<string>;
export type EditorProps = {
  content: string;
  imageUploadMethod: UploadFn;
} & Partial<EditorOptions>;
