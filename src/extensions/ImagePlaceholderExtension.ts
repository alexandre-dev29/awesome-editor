import { Node, ReactNodeViewRenderer } from '@tiptap/react';
import ImagePlaceHolder from '../components/tiptap/ImagePlaceHolder';
import { UploadFn } from '../types/types';

const createImagePlaceHolder = (uploadFn: UploadFn) =>
  Node.create({
    name: 'placeholderImage',
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
      };
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    addCommands() {
      return {
        insertPlaceHolderImage:
          () =>
          ({ commands }: any) => {
            return commands.insertContent({
              type: 'placeholderImage',
            });
          },
      };
    },
    addNodeView() {
      return ReactNodeViewRenderer((props: any) =>
        ImagePlaceHolder({ ...props, uploadFn })
      );
    },
  });
export default createImagePlaceHolder;
