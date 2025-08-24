import { COUNTRIES } from "../constants/countries";
import type { InputProps } from "../ui/Input";
import Input from "../ui/Input";

function CountryInput({ error, ...props }: Omit<InputProps, "label">) {
  return (
    <Input
      name="country"
      list="countries"
      label="Country"
      error={error}
      {...props}
    >
      <datalist id="countries">
        {COUNTRIES.map((country) => (
          <option value={country} key={country}></option>
        ))}
      </datalist>
    </Input>
  );
}

export default CountryInput;
