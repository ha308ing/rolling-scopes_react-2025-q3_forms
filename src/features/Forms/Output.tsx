import { useAppSelector } from "../../store";
import { selectForm } from "./formSlice";

function Output() {
  const {
    name,
    picture,
    age,
    email,
    country,
    gender,
    password,
    password_confirm,
    toc,
    lastUpdated,
  } = useAppSelector(selectForm);

  const className = (key: string) =>
    lastUpdated.includes(key) ? "text-green-500" : "initial";

  return (
    <article>
      <img
        src={picture as string}
        alt={name}
        width={200}
        height={200}
        className="object-fill"
      />
      <p className={className("name")}>Name: {name}</p>
      <p className={className("age")}>Age: {age}</p>
      <p className={className("email")}>Email: {email}</p>
      <p className={className("password")}>Password: {password}</p>
      <p className={className("password_confirm")}>
        Password confirm: {password_confirm}
      </p>
      <p className={className("gender")}>Gender: {gender}</p>
      <p className={className("country")}>Country: {country}</p>
      <p className={className("toc")}>TOC: {toc}</p>
    </article>
  );
}

export default Output;
