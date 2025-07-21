import styled, { keyframes } from 'styled-components';
import { Loading } from '../loading/Loading';

const RawCard = ({
  data,
  loading,
  loadingName,
  error,
  emptyObject,
  children,
  className,
}) => {
  return (
    <div className={className}>
      {loading ? (
        <Loading name={loadingName}></Loading>
      ) : error ? (
        <>Error</>
      ) : data ? (
        children()
      ) : (
        <>{emptyObject}</>
      )}
    </div>
  );
};

const opacity = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const CardStyled = styled(RawCard)`
  border: 1px solid black;
  padding: 1rem;
  box-sizing: border-box;
  border-radius: 1rem;
  animation: ${opacity} 2s ease;
`;

const Card = (props) => {
  // Cambia la key cada vez que data cambia
  const key = props.data ? JSON.stringify(props.loading) : 'empty';
  return <CardStyled {...props} key={key} />;
};

export default Card;
