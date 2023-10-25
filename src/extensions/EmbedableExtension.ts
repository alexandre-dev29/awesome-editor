import { mergeAttributes, Node, ReactNodeViewRenderer } from '@tiptap/react';
import { EmbeddedType } from '../types/types';
import EmbeddableTipTapComponent from '../components/tiptap/EmbeddableElement';

export default Node.create({
  name: 'embeddableElement',
  group: 'block',
  atom: true,
  addAttributes() {
    return {
      isVisible: {
        default: true,
      },
      isPopUpVisible: {
        default: true,
      },
      embeddedType: {
        default: EmbeddedType.Youtube,
      },
      embeddedUrl: {
        default: '',
      },
    };
  },
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  addCommands() {
    return {
      insertEmbeddedElement:
        () =>
        ({ commands }: any) => {
          return commands.insertContent({
            type: 'embeddableElement',
          });
        },
    };
  },
  parseHTML() {
    return [{ tag: 'embeddableElement' }];
  },
  renderHTML({ HTMLAttributes }) {
    return ['embeddableElement', mergeAttributes(HTMLAttributes)];
  },
  addNodeView() {
    return ReactNodeViewRenderer(EmbeddableTipTapComponent);
  },
});
