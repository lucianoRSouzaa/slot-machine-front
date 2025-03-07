type Variant = "primary" | "secondary";

export interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  variant?: Variant;
}

export type VariantClasses = Record<Variant, string>;

export const variantClasses: VariantClasses = {
  primary: "bg-primary text-black hover:bg-primary/90",
  secondary:
    "bg-backgound text-white transition-colors hover:bg-accent hover:text-black",
};
