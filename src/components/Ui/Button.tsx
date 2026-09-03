import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

function Button({ children, onClick, className, ...rest }: ButtonProps) {
  return (
    <button onClick={onClick} className={`cursor-pointer ${className}`} {...rest}>
      {children}
    </button>
  );
}

export default Button;
