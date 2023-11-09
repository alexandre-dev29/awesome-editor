import Tippy from '@tippyjs/react';
import { Editor } from '@tiptap/react';
import React from 'react';
import { useForm } from 'react-hook-form';

import { Input } from '../ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Button } from '../ui/button';

const HandleIframe = ({
  editor,
  setIsOpen,
  isOpen,
}: {
  editor: Editor | null;
  isOpen: boolean;
  setIsOpen: any;
}) => {
  const form = useForm<{ linkUrl: string }>({
    defaultValues: {
      linkUrl: '',
    },
  });

  function onSubmit(values: { linkUrl: string }) {
    const expression =
      /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
    if (editor) {
      const result = values.linkUrl.match(expression);
      if (result) {
        const youtubeId = result[1];
        const finalYoutubeUrl = `https://www.youtube.com/embed/${youtubeId}?feature=oembed`;
        editor.commands.setIframe({ src: finalYoutubeUrl });
      } else {
        editor.commands.setIframe({ src: values.linkUrl });
      }
      setIsOpen(false);
      form.reset({ linkUrl: '' });
    }
  }

  return (
    <Tippy
      interactive={true}
      interactiveBorder={20}
      onClickOutside={() => setIsOpen(false)}
      visible={isOpen}
      delay={100}
      className={
        'bg-white dark:bg-gray-900 border-2 p-4 shadow-sm  min-w-[450px] mb-4 popUpHandling'
      }
      content={
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="linkUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Url</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ex: https://www.youtube.com/watch?v=_uOgXpEHNbc"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type={'submit'}>replace</Button>
          </form>
        </Form>
      }
    >
      <p></p>
    </Tippy>
  );
};

export default HandleIframe;
