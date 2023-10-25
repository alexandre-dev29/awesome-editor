import { EditorOptions } from '@tiptap/core';
import { BulletList } from '@tiptap/extension-bullet-list';
import { Highlight } from '@tiptap/extension-highlight';
import { HorizontalRule } from '@tiptap/extension-horizontal-rule';
import { Link } from '@tiptap/extension-link';
import { OrderedList } from '@tiptap/extension-ordered-list';
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

export const tipTapEditorConfig = (
  content: string,
  imageUploadMethod: () => Promise<string>
): Partial<EditorOptions> => {
  return {
    extensions: [
      StarterKit,
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
      EmbedableExtension,
      Typography,
      BulletList.configure({
        HTMLAttributes: {
          class: 'ulTipTap',
        },
      }),
      Link.configure({
        HTMLAttributes: {
          class: 'linkTipTap',
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: 'olTipTap',
        },
      }),
      HorizontalRule.configure({ HTMLAttributes: { class: 'myHrLine' } }),
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
      }),
    ],
    content: content,
    autofocus: false,
    editorProps: {},
  };
};
