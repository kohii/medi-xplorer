type FormLabelProps = {
  children: React.ReactNode;
  htmlFor?: string;
};

export function FormLabel({
  children,
  ...props
}: FormLabelProps) {
  return (
    <label
      className="block mb-0.5 text-sm text-gray-500 font-medium"
      {...props}
    >{children}</label>
  );
}
