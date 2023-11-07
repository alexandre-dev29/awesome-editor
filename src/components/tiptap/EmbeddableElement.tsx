import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import Tippy from '@tippyjs/react';
import { Editor, NodeViewWrapper } from '@tiptap/react';
import React, { BaseSyntheticEvent } from 'react';
import { useForm } from 'react-hook-form';
import { EmbeddedType } from '../../types/types';
import { CodepenIcon, CodesandboxIcon, YoutubeIcon } from '../ui/Icons';

interface EmbeddableElementProp {
  node: { attrs: any; nodeSize: number };
  updateAttributes: (attrs: any) => void;
  selected: boolean;
  editor: Editor;
  getPos: () => number;
  extension: Node;
  deleteNode: any;
}

const EmbeddableTipTapComponent: React.FC<EmbeddableElementProp> = ({
  editor,
  node,
  updateAttributes,
  getPos,
  extension,
  deleteNode,
}) => {
  const formForLink = useForm<{ linkUrl: string }>({
    defaultValues: {
      linkUrl: '',
    },
  });

  const togglePopup = (isPopUpVisible: boolean) => {
    updateAttributes({
      isPopUpVisible: isPopUpVisible,
    });
  };

  function onSubmitLinkReplacement(
    values: { linkUrl: string },
    event?: BaseSyntheticEvent
  ) {
    const from = getPos() - 1;
    const to = from + node.nodeSize + 4;
    event?.preventDefault();
    if (node.attrs.embeddedType === EmbeddedType.Youtube) {
      const expression =
        /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
      const result = values.linkUrl.match(expression);
      if (result) {
        const youtubeId = result[1];
        const finalYoutubeUrl = `https://www.youtube.com/embed/${youtubeId}?feature=oembed`;
        console.log(`from : ${from}`);
        console.log(`to : ${to}`);
        editor.commands.setIframe({ src: finalYoutubeUrl });
        editor.commands.deleteRange({ from, to });
      }
    } else {
      editor.commands.deleteRange({ from, to });
      editor.commands.setIframe({ src: values.linkUrl });
    }
  }

  const getPlaceholderText = (): string => {
    switch (node.attrs.embeddedType) {
      case EmbeddedType.Youtube:
        return 'ex: https://www.youtube.com/watch?v=_uOgXpEHNbc';
      case EmbeddedType.CodePen:
        return 'ex: https://codepen.io/rcyou/embed/QEObEZ';
      case EmbeddedType.CodeSandBox:
        return 'https://codesandbox.io/embed/tiptap-react-image-upload-with-slash-command-0z9wq?hidenavigation=1&theme=dark';
      default:
        return '';
    }
  };
  const getPlaceholderIcon = (): JSX.Element => {
    switch (node.attrs.embeddedType) {
      case EmbeddedType.Youtube:
        return <YoutubeIcon className={'h-12 w-12 text-white'} />;
      case EmbeddedType.CodePen:
        return <CodepenIcon className={'h-12 w-12 text-white'} />;
      case EmbeddedType.CodeSandBox:
        return <CodesandboxIcon className={'h-12 w-12 text-white'} />;
      default:
        return <YoutubeIcon className={'h-12 w-12 text-white'} />;
    }
  };

  return (
    <NodeViewWrapper className="dark:text-white" key={Math.random()}>
      <div
        onClick={() => togglePopup(true)}
        style={{ height: '150px' }}
        className={`${
          node.attrs.isVisible ? 'flex' : 'hidden'
        } cursor-pointer  bg-gray-200 w-full gap-4  border-dashed dark:border-gray-600 border-gray-400 border-2 rounded-xl  justify-center items-center`}
      >
        <Tippy
          interactive={true}
          interactiveBorder={20}
          onClickOutside={() => togglePopup(false)}
          visible={node.attrs.isPopUpVisible}
          delay={100}
          className={'tippyEmbeddedPopup'}
          content={
            <Form {...formForLink}>
              <form
                onSubmit={formForLink.handleSubmit(onSubmitLinkReplacement)}
                className="space-y-8"
              >
                <FormField
                  control={formForLink.control}
                  name="linkUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={'text-black dark:text-white'}>
                        {`${node.attrs.embeddedType} Url`}
                      </FormLabel>
                      <FormControl>
                        <Input
                          autoFocus={true}
                          placeholder={getPlaceholderText()}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  style={{ backgroundColor: '@apply bg-blue-400' }}
                  className={'bg-blue-400'}
                  type={'submit'}
                >
                  Save
                </Button>
              </form>
            </Form>
          }
        >
          <p></p>
        </Tippy>
        {getPlaceholderIcon()}
        <span>Insert a {`${node.attrs.embeddedType} link`} link</span>
      </div>
    </NodeViewWrapper>
  );
};
export default EmbeddableTipTapComponent;
