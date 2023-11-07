import { AwesomeEditor, useEditorDefault } from '@proudlydev/awesome-editor';

export function App() {
  const uploadMethod = async (): Promise<string> => {
    return 'https://www.seiu1000.org/sites/main/files/imagecache/hero/main-images/camera_lense_0.jpeg';
  };
  const editorHook = useEditorDefault({
    content: `     
     Okay enough test

\`\`\`js
let alexandre = document.getElementById("#mwenze")
\`\`\`

![](https://res.cloudinary.com/dgsy40sdp/image/upload/v1695895085/community-blog/oun1aduqwryjgfgs6c0o.jpg)
*Okay* taht is my **code**

<div class="iframe-wrapper">
<iframe src="https://www.youtube.com/embed/He1_AH6kC8Y?feature=oembed" frameborder="0" allowfullscreen="true"></iframe>
</div>

This is my testing`,
    imageUploadMethod: uploadMethod,
    onUpdate: (props) =>
      console.log('props.editor.storage.markdown.getMarkdown()'),
  });

  return (
    <div style={{ padding: '4rem', width: '80%', margin: '0 auto' }}>
      <AwesomeEditor editor={editorHook} />
    </div>
  );
}

export default App;
