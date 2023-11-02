import { EditorOptions } from '@tiptap/core';
import { Highlight } from '@tiptap/extension-highlight';
import { Placeholder } from '@tiptap/extension-placeholder';
import Typography from '@tiptap/extension-typography';
import Youtube from '@tiptap/extension-youtube';
import StarterKit from '@tiptap/starter-kit';
import { CodeBlockPrism } from 'tiptap-extension-code-block-prism';
import { Markdown } from 'tiptap-markdown';
import Commands from '../extensions/commands/Commands';
import getSuggestionItems from '../extensions/commands/CommandsItem';
import renderItems from '../extensions/commands/renderItems';
import EmbedableExtension from '../extensions/EmbedableExtension';
import { createImageExtension } from '../extensions/customImage';
import Iframe from '../extensions/Iframe';
import { Link } from '@tiptap/extension-link';
import createImagePlaceHolder from '../extensions/ImagePlaceholderExtension';

export const tipTapEditorConfig = (
  content: string,
  imageUploadMethod: () => Promise<string>
): Partial<EditorOptions> => {
  return {
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: 'ulTipTap',
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: 'olTipTap',
          },
        },
        horizontalRule: { HTMLAttributes: { class: 'myHrLine' } },
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          return 'Write some content or type "/" for commands';
        },
      }),
      Commands.configure({
        suggestion: {
          items: getSuggestionItems,
          render: renderItems,
        },
      }),
      createImagePlaceHolder(imageUploadMethod),
      EmbedableExtension,
      Typography,
      Highlight.configure({
        multicolor: true,
        HTMLAttributes: { class: 'highlightColor' },
      }),
      Markdown,
      CodeBlockPrism.configure({ defaultLanguage: 'text' }),
      createImageExtension(imageUploadMethod),
      Youtube.configure({
        controls: true,
      }),
      Iframe,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'linkTipTap',
        },
      }),
    ],
    content: content,
    autofocus: false,
    editorProps: {},
  };
};
