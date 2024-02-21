import * as React from 'react';
import './button.scss';

type ButtonProps = {
  type: string,
  text: string,
  isActive: boolean,
  onClick?: () => void,
}
const Button = ({type, text, isActive, onClick}:ButtonProps) => {
  return (
    <div className={`mb-button ${type} ${isActive ? 'active' : ''}`}>
        <button onClick={onClick}>
            <div>{text}</div>
        </button>
    </div>
  )
}

export default Button;
