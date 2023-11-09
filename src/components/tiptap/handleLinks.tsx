import Tippy from '@tippyjs/react';
import { Editor } from '@tiptap/react';
import React, { BaseSyntheticEvent } from 'react';
import { useForm } from 'react-hook-form';
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

const HandleLinks = ({
  editor,
  setIsOpen,
  isOpen,
}: {
  editor: Editor | null;
  isOpen: boolean;
  setIsOpen: any;
}) => {
  const formForLink = useForm<{ linkUrl: string }>({
    defaultValues: {
      linkUrl: '',
    },
  });

  function onSubmitLinkReplacement(
    values: { linkUrl: string },
    event?: BaseSyntheticEvent
  ) {
    event?.preventDefault();
    if (editor) {
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: values.linkUrl })
        .run();
      setIsOpen(false);
      formForLink.reset({ linkUrl: '' });
    }
  }

  return (
    <>
      <Tippy
        interactive={true}
        interactiveBorder={20}
        onClickOutside={() => setIsOpen(false)}
        visible={isOpen}
        delay={100}
        className={
          'bg-white dark:bg-gray-900 border-2 p-4 shadow-sm  w-[350px] mb-4 popUpHandling'
        }
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
                    <FormLabel>Url</FormLabel>
                    <FormControl>
                      <Input placeholder="ex: https://youtube.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type={'submit'}>Save</Button>
            </form>
          </Form>
        }
      >
        <p></p>
      </Tippy>
    </>
  );
};

export default HandleLinks;
