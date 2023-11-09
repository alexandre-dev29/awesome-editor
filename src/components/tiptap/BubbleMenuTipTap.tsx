import { useState } from 'react';
import { Toggle } from '../ui/toggle';
import HandleImage from './HandleImage';
import HandleLinks from './handleLinks';
import HandleProgrammingLanguage from './handleProgrammingLanguage';
import { BubbleMenu, Editor } from '@tiptap/react';
import {
  BoldIcon,
  CodeIcon,
  EditIcon,
  HighlighterIcon,
  ItalicIcon,
  LanguagesIcon,
  LinkIcon,
  Strikethrough,
} from '../ui/Icons';
import HandleIframe from './HandleIframe';

const isImageSelection = (editor: Editor | any) => {
  return (
    editor?.state.selection.node &&
    editor.state.selection.node.type &&
    editor.state.selection.node.type.name === 'image'
  );
};
const isEmbeddable = (editor: Editor | any) => {
  return (
    editor?.state.selection.node &&
    editor.state.selection.node.type &&
    editor.state.selection.node.type.name === 'iframe'
  );
};

const BubbleMenuTipTap = ({
  editor,
  imageUploadMethod,
}: {
  editor: Editor | null;
  imageUploadMethod?: (imageFile: any) => Promise<string>;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isModalImageOpen, setIsModalImageOpen] = useState(false);
  const [isIframeModalOpened, setIsIframeModalOpened] = useState(false);

  return (
    <>
      {editor && (
        <BubbleMenu
          editor={editor}
          tippyOptions={{ duration: 100 }}
          className={`${
            !isEmbeddable(editor)
              ? 'bg-gray-200 dark:bg-gray-700 flex gap-2 p-2 rounded-md min-w-fit'
              : ''
          }`}
        >
          <HandleLinks editor={editor} isOpen={isOpen} setIsOpen={setIsOpen} />
          <HandleIframe
            editor={editor}
            isOpen={isIframeModalOpened}
            setIsOpen={setIsIframeModalOpened}
          />
          <HandleProgrammingLanguage
            editor={editor}
            isOpen={isLanguageOpen}
            setIsOpen={setIsLanguageOpen}
          />
          <HandleImage
            editor={editor}
            isOpen={isModalImageOpen}
            setIsOpen={setIsModalImageOpen}
            isEdit={true}
            imageUploadMethod={imageUploadMethod}
          />

          {!isEmbeddable(editor) ? (
            !isImageSelection(editor) ? (
              <div className={'flex gap-2 min-w-fit'}>
                <Toggle
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  variant={'outline'}
                  aria-label="Toggle bold"
                  aria-pressed={`${editor.isActive('bold') ? 'true' : 'false'}`}
                  data-state={`${editor.isActive('bold') ? 'on' : 'off'}`}
                >
                  <BoldIcon className="h-4 w-4" />
                </Toggle>
                <Toggle
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  variant={'outline'}
                  aria-label="Toggle italic"
                  aria-pressed={`${
                    editor.isActive('italic') ? 'true' : 'false'
                  }`}
                  data-state={`${editor.isActive('italic') ? 'on' : 'off'}`}
                >
                  <ItalicIcon className="h-4 w-4" />
                </Toggle>

                <Toggle
                  onClick={() => editor.chain().focus().toggleStrike().run()}
                  variant={'outline'}
                  aria-label="Toggle strke"
                  aria-pressed={`${
                    editor.isActive('strike') ? 'true' : 'false'
                  }`}
                  data-state={`${editor.isActive('strike') ? 'on' : 'off'}`}
                >
                  <Strikethrough className="h-4 w-4" />
                </Toggle>
                <Toggle
                  onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                  variant={'outline'}
                  aria-label="Toggle Code block"
                  aria-pressed={`${
                    editor.isActive('codeBlock') ? 'true' : 'false'
                  }`}
                  data-state={`${editor.isActive('codeBlock') ? 'on' : 'off'}`}
                >
                  <CodeIcon className="h-4 w-4" />
                </Toggle>
                {editor.isActive('codeBlock') ? (
                  <Toggle
                    onClick={() => setIsLanguageOpen(true)}
                    variant={'outline'}
                    aria-label="Change languages"
                  >
                    <LanguagesIcon className="h-4 w-4" />
                  </Toggle>
                ) : (
                  ''
                )}
                <Toggle
                  onClick={() => {
                    if (editor.isActive('link')) {
                      editor
                        .chain()
                        .focus()
                        .extendMarkRange('link')
                        .unsetLink()
                        .run();
                    } else {
                      setIsOpen(true);
                    }
                  }}
                  variant={'outline'}
                  aria-label="Toggle strke"
                  aria-pressed={`${editor.isActive('link') ? 'true' : 'false'}`}
                  data-state={`${editor.isActive('link') ? 'on' : 'off'}`}
                >
                  <LinkIcon className="h-4 w-4" />
                </Toggle>
                <Toggle
                  onClick={() => {
                    editor
                      .chain()
                      .focus()
                      .extendMarkRange('link')
                      .toggleHighlight()
                      .run();
                  }}
                  aria-pressed={`${
                    editor.isActive('highlight') ? 'true' : 'false'
                  }`}
                  data-state={`${editor.isActive('highlight') ? 'on' : 'off'}`}
                  variant={'outline'}
                  aria-label="Highlight"
                >
                  <HighlighterIcon className="h-4 w-4" />
                </Toggle>
              </div>
            ) : (
              <div className={'pr-2.5'}>
                <EditIcon
                  className={
                    'cursor-pointer transition-all duration-300 hover:scale-105 transform-gpu'
                  }
                  onClick={() => {
                    setIsModalImageOpen(true);
                  }}
                />
              </div>
            )
          ) : (
            <div className={'pr-2.5'}>
              <EditIcon
                className={
                  'cursor-pointer transition-all duration-300 hover:scale-105 transform-gpu'
                }
                onClick={() => {
                  setIsIframeModalOpened(true);
                }}
              />
            </div>
          )}
        </BubbleMenu>
      )}
    </>
  );
};

export default BubbleMenuTipTap;
