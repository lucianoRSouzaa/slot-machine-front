import { ButtonProps, variantClasses } from "./button-props";

export function Button({
  children,
  onClick,
  variant = "primary",
}: ButtonProps) {
  const btnClass = `${variantClasses[variant]} rounded-md p-2`;

  return (
    <button onClick={onClick} className={btnClass}>
      {children}
    </button>
  );
}
