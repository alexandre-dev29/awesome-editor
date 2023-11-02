import { Editor } from '@tiptap/react';
import {
  CodeIcon,
  CodepenIcon,
  CodesandboxIcon,
  DivideIcon,
  Heading1,
  Heading2,
  Heading3,
  ImagePlusIcon,
  ListIcon,
  ListOrderedIcon,
  TextQuoteIcon,
  YoutubeIcon,
} from 'lucide-react';

const getSuggestionItems = (values: any) => {
  return [
    {
      title: 'Heading 1',
      icon: Heading1,
      description: 'Big heading',
      command: ({ editor, range }: any) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode('heading', { level: 1 })
          .run();
      },
    },
    {
      title: 'Heading 2',
      icon: Heading2,
      description: 'Medium heading',

      command: ({ editor, range }: any) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode('heading', { level: 2 })
          .run();
      },
    },
    {
      title: 'Heading 3',
      icon: Heading3,
      description: 'Small heading',

      command: ({ editor, range }: any) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode('heading', { level: 3 })
          .run();
      },
    },
    {
      title: 'Bullet list',
      icon: ListIcon,
      description: 'Create a bullet list',
      command: ({ editor, range }: any) => {
        editor.chain().focus().deleteRange(range).toggleBulletList().run();
      },
    },
    {
      title: 'Ordered list',
      icon: ListOrderedIcon,
      description: 'Create an ordered list',
      command: ({ editor, range }: any) => {
        editor.chain().focus().deleteRange(range).toggleOrderedList().run();
      },
    },
    {
      title: 'Image',
      icon: ImagePlusIcon,
      description: 'Add an image',
      command: ({ editor, range }: any) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .insertPlaceHolderImage()
          .run();
      },
    },

    {
      title: 'Quotes',
      icon: TextQuoteIcon,
      description: 'Insert Quotes',
      command: ({ editor, range }: any) => {
        editor.chain().focus().deleteRange(range).toggleBlockquote().run();
      },
    },
    {
      title: 'Code Block',
      icon: CodeIcon,
      description: 'Insert a code block',
      command: ({ editor, range }: any) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .toggleCodeBlock({ language: 'css' })
          .run();
      },
    },
    {
      title: 'Divider',
      icon: DivideIcon,
      description: 'Insert an horizontal line',
      command: ({ editor, range }: any) => {
        editor.chain().focus().deleteRange(range).setHorizontalRule().run();
      },
    },
    {
      title: 'Youtube',
      icon: YoutubeIcon,
      description: 'Insert youtube',
      command: ({ editor, range }: { editor: Editor; range: any }) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .insertContent(`<iframe></iframe>`)
          .run();
      },
    },
    {
      title: 'Code SandBox',
      icon: CodesandboxIcon,
      description: 'Insert Code Sandbox',
      command: ({ editor, range }: { editor: Editor; range: any }) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .insertContent(`<iframe embeddedType="CodeSandBox"></iframe>`)
          .run();
      },
    },
    {
      title: 'Code Pen',
      icon: CodepenIcon,
      description: 'Insert Code Pen',
      command: ({ editor, range }: { editor: Editor; range: any }) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .insertContent(`<iframe embeddedType="CodePen"></iframe>`)
          .run();
      },
    },
  ]
    .filter((item) =>
      item.title.toLowerCase().startsWith(values.query.toLowerCase())
    )
    .slice(0, 20);
};

export default getSuggestionItems;
