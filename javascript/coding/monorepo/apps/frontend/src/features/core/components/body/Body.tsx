import Header from '../header/Header';

export const Body: React.FunctionComponent = () => {
  return (
    <div style={{ display: 'grid', gridTemplateRows: 'auto 1fr' }}>
      <Header></Header>
    </div>
  );
};

export default Body;
