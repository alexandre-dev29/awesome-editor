import Tippy from '@tippyjs/react';
import { Editor } from '@tiptap/react';
import React, { ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Label } from '../ui/label';
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
import { UploadFn } from '../../types/types';

const HandleImage = ({
  editor,
  setIsOpen,
  imageUploadMethod,
  isOpen,
  isEdit,
}: {
  editor: Editor | null;
  imageUploadMethod: UploadFn;
  isOpen: boolean;
  setIsOpen: any;
  isEdit: boolean;
}) => {
  const form = useForm<{ imageUrl: string; altText: string }>({
    defaultValues: {
      imageUrl: '',
      altText: '',
    },
  });

  function onSubmit(values: { imageUrl: string; altText: string }) {
    if (editor) {
      editor.commands.insertContent(
        `<img src="${values.imageUrl}" alt="${values.altText}" />`
      );
      setIsOpen(false);
      form.reset({ imageUrl: '', altText: '' });
    }
  }

  async function handleFileUpload(event: ChangeEvent<HTMLInputElement>) {
    if (event !== null) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const file = event.target?.files[0];
      const result = await imageUploadMethod(file);
      if (editor) {
        editor.commands.insertContent(`<img src="${result}" alt="" />`);
        setIsOpen(false);
        form.reset({ imageUrl: '', altText: '' });
      }
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
        <Tabs defaultValue="withUrl" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="withUrl">Change using url</TabsTrigger>
            <TabsTrigger value="uploadNewImage">Upload a new image</TabsTrigger>
          </TabsList>
          <TabsContent value="uploadNewImage">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="picture">Picture</Label>
              <Input id="picture" type="file" onChange={handleFileUpload} />
            </div>
          </TabsContent>
          <TabsContent value="withUrl">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className={'flex gap-4 flex-col'}>
                  <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Url</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="ex: https://google.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="altText"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Alt text</FormLabel>
                        <FormControl>
                          <Input placeholder="ex: image animal" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" className={'mx-auto flex mt-2'}>
                  {isEdit ? 'Edit' : 'Insert'}
                </Button>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      }
    >
      <p></p>
    </Tippy>
  );
};

export default HandleImage;
