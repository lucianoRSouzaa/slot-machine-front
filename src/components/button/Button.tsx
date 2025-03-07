import { ButtonProps, variantClasses } from "./button-props";

export function Button({
  children,
  onClick,
  variant = "primary",
}: ButtonProps) {
  const btnClass = `${variantClasses[variant]} rounded-md w-full p-2 cursor-pointer`;

  return (
    <button onClick={onClick} className={btnClass}>
      {children}
    </button>
  );
}
