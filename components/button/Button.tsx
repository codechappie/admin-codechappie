import style from "./Button.module.scss";
interface ButtonProps {
  text: string;
  type: "button" | "submit" | "reset" | undefined;
  onClick?: any;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  background?: "primary" | "secondary" | "alert" | "error" | "warning";
  className?: string;
}

const Button = ({
  text,
  type,
  onClick,
  size = "md",
  background = "primary",
  className,
}: ButtonProps) => {
  return type ? (
    <div className={`${style.chappie__button} ${style[size]} ${className}`}>
      <button
        className={`${style.button} ${style[background]}`}
        type={type}
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  ) : (
    <button>{text} und</button>
  );
};

export default Button;
