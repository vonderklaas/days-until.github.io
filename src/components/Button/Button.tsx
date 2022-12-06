import './Button.css';

interface ButtonInterface {
  text: string;
  clickFunction(): void;
}

const Button = ({ text, clickFunction }: ButtonInterface) => {
  return <button onClick={() => clickFunction()}>{text}</button>;
};

export default Button;
