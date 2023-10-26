import { AwesomeEditor } from '@proudlydev/awesome-editor';

export function App() {
  const uploadMethod = async (): Promise<string> => {
    return '';
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
