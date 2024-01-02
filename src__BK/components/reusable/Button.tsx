/** @format */
import { FC } from "react";
interface IProp {
  [props: string]: any;
}
const Button: FC<IProp> = ({
  className,
  handleClick,
  children,
}): JSX.Element => {
  return (
    <button className={className} onClick={handleClick}>
      {children}
    </button>
  );
};
export default Button;
