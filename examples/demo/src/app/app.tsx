import { AwesomeEditor, useEditorDefault } from '@proudlydev/awesome-editor';

export function App() {
  const uploadMethod = async (): Promise<string> => {
    return 'https://www.seiu1000.org/sites/main/files/imagecache/hero/main-images/camera_lense_0.jpeg';
  };
  const editorHook = useEditorDefault({
    content: `# alexandre mwenze
  * alexandre
  * mwenze`,
    imageUploadMethod: uploadMethod,
  });

  return (
    <div style={{ padding: '4rem', width: '80%', margin: '0 auto' }}>
      <AwesomeEditor editor={editorHook} />
    </div>
  );
}

export default App;
