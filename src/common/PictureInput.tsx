import type { InputProps } from "../ui/Input";
import Input from "../ui/Input";

function PictureInput({ error, ...props }: Omit<InputProps, "label">) {
  return (
    <Input
      name="picture"
      type="file"
      label="Picture"
      error={error}
      {...props}
    />
  );
}

export default PictureInput;
