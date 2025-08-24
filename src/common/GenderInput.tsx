import type { InputProps } from "../ui/Input";
import Input from "../ui/Input";

function TocInput(props: Omit<InputProps, "label">) {
  return (
    <Input name="toc" type="checkbox" label="" {...props}>
      <span className="ms-1">I accepts Terms and Conditions agreement </span>
    </Input>
  );
}

export default TocInput;
