import { object, string, number, type InferType, boolean, mixed } from "yup";
import { COUNTRIES } from "../../constants/countries";
import { encodeFile } from "../../utils/encodeFile";
import {
  checkLowercase,
  checkNumber,
  checkSpecialCharacter,
  checkUppercase,
} from "../../utils/checkString";

export const formSchema = object({
  name: string().test({
    message: "First letter in the name must be uppercase",
    skipAbsent: true,
    test: (value) => {
      if (!value) return true;

      const firstLetter = value[0];

      return firstLetter === firstLetter.toUpperCase();
    },
  }),
  age: number()
    .positive("Age must be a positive number")
    .integer("Age must be an integer")
    .transform((value) => (isNaN(value) ? undefined : value)),
  email: string().email("Email should be an email"),
  password: string().test({
    skipAbsent: true,
    test: (value, ctx) => {
      if (!value) return true;

      if (!checkNumber(value)) {
        return ctx.createError({ message: "Password must contain a number" });
      }
      if (!checkUppercase(value)) {
        return ctx.createError({
          message: "Password must contain an uppercase letter",
        });
      }
      if (!checkLowercase(value)) {
        return ctx.createError({
          message: "Password must contain a lowercase letter",
        });
      }
      if (!checkSpecialCharacter(value)) {
        return ctx.createError({
          message: "Password must contain a special character",
        });
      }

      return true;
    },
  }),
  password_confirm: string().when("password", {
    is: (password: string) => !!password,
    then: (schema) =>
      schema.test({
        message: "Password must match",
        test: (value, ctx) => ctx.parent.password === value,
      }),
  }),
  gender: string<"male" | "female">(),
  toc: boolean().transform((x) => {
    return !!x;
  }),
  picture: mixed()
    .test({
      message: "The file is wrong",
      skipAbsent: true,
      test: async (value, ctx) => {
        let valueString = "";

        if (value instanceof FileList) {
          if (value.length === 0) {
            return true;
          }
          valueString = await encodeFile(value[0]);
        } else if (typeof value === "string") {
          valueString = value;
        }

        if (
          !["data:image/png;base64", "data:image/jpeg;base64"].some((v) =>
            valueString?.startsWith(v),
          )
        ) {
          return ctx.createError({
            message: "File must have extenstion png or jpg",
          });
        }

        if (valueString?.endsWith(",")) {
          return ctx.createError({
            message: "File must not be empty",
          });
        }

        return true;
      },
    })
    .transform((value) => {
      if (value instanceof FileList) {
        return value[0];
      }
    }),
  country: string().oneOf(COUNTRIES, "Country must be from the list"),
});

export type IForm = InferType<typeof formSchema>;
