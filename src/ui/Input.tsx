export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label: string;
  ref?: React.Ref<HTMLInputElement>;
}

const notTextTypes: React.InputHTMLAttributes<HTMLInputElement>["type"][] = [
  "checkbox",
  "radio",
];

function Input({
  children,
  className,
  error,
  label,
  ref,
  ...props
}: InputProps) {
  const isNotText = notTextTypes.includes(props.type);

  return (
    <label className="block relative my-2">
      <div className="flex justify-between mb-1">
        <span>{label}</span>

        <span className="text-red-400  text-right text-sm text-ellipsis overflow-hidden">
          {error}
        </span>
      </div>
      <input
        className={`p-2 rounded-md ${!isNotText ? "w-[100%]" : ""} border ${className}`}
        ref={ref}
        {...props}
      />
      {children}
    </label>
  );
}

export default Input;
