import type { InputProps } from "../ui/Input";
import Input from "../ui/Input";

function PasswordConfirmInput({ error, ...props }: Omit<InputProps, "label">) {
  return (
    <Input
      name="password_confirm"
      type="password"
      label="Confirm password"
      error={error}
      {...props}
    />
  );
}

export default PasswordConfirmInput;
