import type { InputProps } from "../ui/Input";
import Input from "../ui/Input";

function AgeInput({ error, ...props }: Omit<InputProps, "label">) {
  return (
    <Input
      name="age"
      type="number"
      min={1}
      label="Age"
      error={error}
      {...props}
    />
  );
}

export default AgeInput;
