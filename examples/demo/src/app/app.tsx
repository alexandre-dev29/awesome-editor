import { AwesomeEditor } from '@proudlydev/awesome-editor';

export function App() {
  const uploadMethod = async (): Promise<string> => {
    return '';
  };
  return (
    <div>
      <AwesomeEditor
        content={'# Alexandre mwenze'}
        imageUploadMethod={uploadMethod}
      />
    </div>
  );
}

export default App;
