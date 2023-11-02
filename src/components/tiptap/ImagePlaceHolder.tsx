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
import { zodResolver } from '@hookform/resolvers/zod';
import Tippy from '@tippyjs/react';
import { Editor, NodeViewWrapper } from '@tiptap/react';
import React, { BaseSyntheticEvent, ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { UploadFn } from '../../types/types';
import { ImagePlusIcon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Label } from '../ui/label';

interface EmbeddableElementProp {
  node: { attrs: any; nodeSize: number };
  updateAttributes: (attrs: any) => void;
  selected: boolean;
  editor: Editor;
  getPos: () => number;
  extension: Node;
  uploadFn: UploadFn;
}

const ImagePlaceHolderComponent: React.FC<EmbeddableElementProp> = ({
  editor,
  node,
  updateAttributes,
  getPos,
  extension,
  uploadFn,
}) => {
  const formSchemaForLink = z.object({
    imageUrl: z.string().url({
      message: 'Please write a correct url.',
    }),
    altText: z.string(),
  });
  const formForLink = useForm<z.infer<typeof formSchemaForLink>>({
    resolver: zodResolver(formSchemaForLink),
    defaultValues: {
      imageUrl: '',
      altText: '',
    },
  });

  const togglePopup = (isPopUpVisible: boolean) => {
    updateAttributes({
      isPopUpVisible: isPopUpVisible,
    });
  };

  function onSubmitLinkReplacement(
    values: z.infer<typeof formSchemaForLink>,
    event?: BaseSyntheticEvent
  ) {
    event?.preventDefault();
    editor.commands.insertContent(
      `<img src="${values.imageUrl}" alt="${values.altText}" />`
    );
  }

  async function handleFileUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files[0];
    const result = await uploadFn(file);
    editor.commands.insertContent(`<img src="${result}" alt="" />`);
  }

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
            <Tabs defaultValue="withUrl" className="w-[400px]">
              <TabsList>
                <TabsTrigger value="withUrl">Change using url</TabsTrigger>
                <TabsTrigger value="uploadNewImage">
                  Upload a new image
                </TabsTrigger>
              </TabsList>
              <TabsContent value="uploadNewImage">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="picture">Picture</Label>
                  <Input id="picture" type="file" onChange={handleFileUpload} />
                </div>
              </TabsContent>
              <TabsContent value="withUrl">
                <Form {...formForLink}>
                  <form
                    onSubmit={formForLink.handleSubmit(onSubmitLinkReplacement)}
                  >
                    <div className={'flex gap-4 flex-col'}>
                      <FormField
                        control={formForLink.control}
                        name="imageUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Url</FormLabel>
                            <FormControl>
                              <Input
                                autoFocus={true}
                                placeholder="ex: https://google.com"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={formForLink.control}
                        name="altText"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Alt text</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="ex: image animal"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Button type="submit" className={'mx-auto flex mt-2'}>
                      {'Insert'}
                    </Button>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>
          }
        >
          <p></p>
        </Tippy>
        <ImagePlusIcon className={'w-12 h-12'} />
        <span>Insert an image</span>
      </div>
    </NodeViewWrapper>
  );
};
export default ImagePlaceHolderComponent;
