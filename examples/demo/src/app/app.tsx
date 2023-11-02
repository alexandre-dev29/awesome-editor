import { AwesomeEditor } from '@proudlydev/awesome-editor';

export function App() {
  const uploadMethod = async (): Promise<string> => {
    return 'https://www.seiu1000.org/sites/main/files/imagecache/hero/main-images/camera_lense_0.jpeg';
  };
  return (
    <div style={{ padding: '4rem', width: '80%', margin: '0 auto' }}>
      <AwesomeEditor
        content={'# Alexandre mwenze'}
        imageUploadMethod={uploadMethod}
      />
    </div>
  );
}

export default App;
