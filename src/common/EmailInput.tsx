import type { InputProps } from "../ui/Input";
import Input from "../ui/Input";

function EmailInput({ error, ...props }: Omit<InputProps, "label">) {
  return <Input name="email" label="Email" error={error} {...props} />;
}

export default EmailInput;
