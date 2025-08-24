import type { InputProps } from "../ui/Input";
import Input from "../ui/Input";

function PasswordInput({ error, ...props }: Omit<InputProps, "label">) {
  return (
    <Input
      name="password"
      type="password"
      label="Password"
      error={error}
      {...props}
    />
  );
}

export default PasswordInput;
