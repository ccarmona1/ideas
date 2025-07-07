import { useCallback, type ChangeEventHandler, type FC } from 'react';

export interface Item {
  type: 'text' | 'number' | 'select';
  label: string;
  name: string;
  options?: string[]; // For select type, you can define options
}

export interface ItemProps {
  id: number;
  item: Item;
  handleChange?: React.Dispatch<React.SetStateAction<object | undefined>>;
}

export const ItemDinamico: FC<ItemProps> = ({ id, item, handleChange }) => {
  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (handleChange) {
        handleChange((prevState) => ({
          ...prevState,
          [event.target.name]: event.target.value,
        }));
      }
    },
    [handleChange]
  );

  const handleSelectChange: ChangeEventHandler<HTMLSelectElement> = useCallback(
    (event) => {
      if (handleChange) {
        handleChange((prevState) => ({
          ...prevState,
          [event.target.name]: event.target.value,
        }));
      }
    },
    [handleChange]
  );

  const getItem = () => {
    if (item.type === 'text') {
      return (
        <input
          onChange={handleInputChange}
          key={id}
          type="text"
          name={item.name}
          placeholder={item.label}
        />
      );
    }
    if (item.type === 'number') {
      return (
        <input
          onChange={handleInputChange}
          key={id}
          type="number"
          name={item.name}
          placeholder={item.label}
        />
      );
    }
    if (item.type === 'select') {
      return (
        <select key={id} name={item.name} onChange={handleSelectChange}>
          <option value="">{item.label}</option>
          {item.options?.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    }
  };

  const itemComponent = getItem();

  return (
    <div className="item-dinamico" key={id}>
      {item.name}
      {itemComponent}
    </div>
  );
};
