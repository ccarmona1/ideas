import { useCallback, useState, type FC } from 'react';
import { ItemDinamico, type Item } from './ItemDinamico';

interface JsonData {
  items: Item[];
}

export const FormDinamico: FC = () => {
  const [jsonData, setJsonData] = useState<JsonData>({
    items: [
      { type: 'text', label: 'Name', name: 'name' },
      { type: 'number', label: 'Phone', name: 'phone' },
      {
        type: 'select',
        label: 'País',
        name: 'pais',
        options: ['España', 'México', 'Argentina'],
      },
    ],
  });
  const [newUser, setNewUser] = useState<object | undefined>();

  const handleJsonChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      try {
        const parsed = JSON.parse(event.target.value);
        setJsonData(parsed);
      } catch {
        //
      }
    },
    []
  );

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      console.log('Form submitted with data:', newUser);
    },
    [newUser]
  );

  return (
    <>
      <div>
        <textarea onChange={handleJsonChange}></textarea>
      </div>
      <form onSubmit={handleSubmit}>
        {jsonData?.items?.map((item, index) => (
          <ItemDinamico
            id={index}
            item={item}
            handleChange={setNewUser}
          ></ItemDinamico>
        ))}
        <button type="submit">Submit</button>
      </form>
      {JSON.stringify(newUser, null, 2)}
    </>
  );
};
