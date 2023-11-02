import { Node, ReactNodeViewRenderer } from '@tiptap/react';
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
            type: 'iframe',
          });
        },
    };
  },
  parseHTML() {
    return [{ tag: 'iframe' }];
  },
  renderHTML({ HTMLAttributes }) {
    return ['div', this.options.HTMLAttributes, ['iframe', HTMLAttributes]];
  },
  addNodeView() {
    return ReactNodeViewRenderer(EmbeddableTipTapComponent);
  },
});
