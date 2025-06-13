type BienvenidaProps = {
  name?: string;
  age?: number;
}

const Bienvenida: React.FC<BienvenidaProps> = ({name, age}) => {
  return <h1 className="something"> Hola Bb</h1>;
};

export default Bienvenida;