import { useRef, useState } from "react";
import Button from "../../ui/Button";
import { formSchema, type IForm } from "./schema";
import type { ValidationError } from "yup";
import { useDispatch } from "react-redux";
import { write } from "./formSlice";
import { encodeFile } from "../../utils/encodeFile";
import PasswordIndicator from "../../ui/PasswordIndicator";
import NameInput from "../../common/NameInput";
import AgeInput from "../../common/AgeInput";
import EmailInput from "../../common/EmailInput";
import PasswordInput from "../../common/PasswordInput";
import PasswordConfirmInput from "../../common/PasswordConfirmInput";
import TocInput from "../../common/GenderInput";
import PictureInput from "../../common/PictureInput";
import CountryInput from "../../common/CountryInput";
import type { FormProps } from "./formProps";

const defaultErrors = {
  age: "",
  country: "",
  email: "",
  gender: "",
  name: "",
  password: "",
  password_confirm: "",
  picture: "",
  toc: "",
};

function UncontrolledForm({ onSuccessfulSubmit }: FormProps) {
  const [errors, setErrors] =
    useState<Record<keyof IForm, string>>(defaultErrors);
  const formRef = useRef<HTMLFormElement>(null);
  const dispatch = useDispatch();
  const [password, setPassword] = useState<string>();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event,
  ) => {
    event.preventDefault();

    if (!formRef.current) return;

    const formData = new FormData(formRef.current);

    const pictureFile = formData.get("picture") as File;

    if (pictureFile && pictureFile.size === 0 && pictureFile.name === "") {
      formData.set("picture", "");
    } else {
      formData.set("picture", await encodeFile(pictureFile));
    }

    const entries = [...formData.entries()].filter(([_, value]) => value != "");

    const obj = Object.fromEntries(entries);

    try {
      const res = await formSchema.validate(obj, { abortEarly: false });

      setErrors(defaultErrors);

      dispatch(write(res));

      onSuccessfulSubmit();
    } catch (error) {
      const errorsEntries = (error as ValidationError).inner.map(
        ({ path, message }) => [path, message],
      );

      const errorsObj = Object.fromEntries(errorsEntries);

      setErrors(errorsObj);
    }
    setPassword(obj.password as string);
  };

  return (
    <form onSubmit={handleSubmit} ref={formRef} className="min-w-[500px] p-12">
      <NameInput error={errors.name} />
      <AgeInput error={errors.age} />
      <EmailInput error={errors.email} />
      <PasswordInput error={errors.password} />
      <PasswordIndicator password={password} />
      <PasswordConfirmInput />

      <fieldset className="mb-2">
        <legend>Gender</legend>
        <div className="flex flex-col gap-2">
          <label>
            <input name="gender" type="radio" id="female" value="female" />
            <span className="ms-1">Female</span>
          </label>
          <label>
            <input name="gender" type="radio" id="male" value="male" />
            <span className="ms-1">Male</span>
          </label>
        </div>
      </fieldset>

      <TocInput />

      <PictureInput error={errors.picture} />

      <CountryInput />

      <Button className="mt-6 py-4" type="submit">
        Submit
      </Button>
    </form>
  );
}

export default UncontrolledForm;
