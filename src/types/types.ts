export enum EmbeddedType {
  Youtube = 'Youtube',
  CodePen = 'CodePen',
  CodeSandBox = 'CodeSandBox',
}

export type UploadFn = (image: File) => Promise<string>;
