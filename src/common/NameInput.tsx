import type { InputProps } from "../ui/Input";
import Input from "../ui/Input";

function NameInput({ error, ...props }: Omit<InputProps, "label">) {
  return <Input name="name" label="Name" error={error} {...props} />;
}

export default NameInput;
