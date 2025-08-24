import { useForm } from "react-hook-form";
import AgeInput from "../../common/AgeInput";
import CountryInput from "../../common/CountryInput";
import EmailInput from "../../common/EmailInput";
import TocInput from "../../common/GenderInput";
import NameInput from "../../common/NameInput";
import PasswordConfirmInput from "../../common/PasswordConfirmInput";
import PasswordInput from "../../common/PasswordInput";
import PictureInput from "../../common/PictureInput";
import Button from "../../ui/Button";
import PasswordIndicator from "../../ui/PasswordIndicator";
import { yupResolver } from "@hookform/resolvers/yup";
import { formSchema, type IForm } from "./schema";
import { useAppDispatch } from "../../store";
import type { FormProps } from "./formProps";
import { write } from "./formSlice";

function RhfForm({ onSuccessfulSubmit }: FormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
    mode: "onChange",
  });
  const dispatch = useAppDispatch();
  const password = watch("password");

  const onSubmit = (data: IForm) => {
    dispatch(write(data));
    onSuccessfulSubmit();
    return;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="min-w-[500px] p-12">
      <NameInput error={errors.name?.message} {...register("name")} />
      <AgeInput
        type="number"
        error={errors.age?.message}
        {...register("age")}
      />
      <EmailInput error={errors.email?.message} {...register("email")} />
      <PasswordInput
        error={errors.password?.message}
        {...register("password")}
      />
      <PasswordIndicator password={password} />
      <PasswordConfirmInput {...register("password_confirm")} />

      <fieldset className="mb-2">
        <legend>Gender</legend>
        <div className="flex flex-col gap-2">
          <label>
            <input
              type="radio"
              id="female"
              value="female"
              {...register("gender")}
            />
            <span className="ms-1">Female</span>
          </label>
          <label>
            <input
              type="radio"
              id="male"
              value="male"
              {...register("gender")}
            />
            <span className="ms-1">Male</span>
          </label>
        </div>
      </fieldset>

      <TocInput />

      <PictureInput
        error={errors.picture?.message}
        {...register("picture")}
        /*         onChange={async (event) => {
          const file = event.target.files[0];
          if (!file) {
            return "";
          }
          const s = await encodeFile(file);
          return s;
        }} */
      />

      {/*       <Controller
        render={({ field }) => (
          <PictureInput
            error={errors.picture?.message}
            {...field}
            onChange={async (event) => {
              const file = event.target.files[0];
              if (!file) {
                return "";
              }
              const s = await encodeFile(file);
              return s;
            }}
          />
        )}
        control={control}
        name="picture"
      /> */}

      <CountryInput {...register("country")} />

      <Button className="mt-6 py-4" type="submit">
        Submit
      </Button>
    </form>
  );
}

export default RhfForm;
