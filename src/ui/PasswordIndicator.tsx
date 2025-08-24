import {
  checkLowercase,
  checkNumber,
  checkSpecialCharacter,
  checkUppercase,
} from "../utils/checkString";

interface PasswordIndicatorProps {
  password?: string;
}

function PasswordIndicator({ password = "" }: PasswordIndicatorProps) {
  let score = 0;

  if (checkLowercase(password)) {
    score++;
  }

  if (checkNumber(password)) {
    score++;
  }

  if (checkSpecialCharacter(password)) {
    score++;
  }

  if (checkUppercase(password)) {
    score++;
  }

  if (password.length >= 6) {
    score++;
  }

  const divs = new Array(5)
    .fill(null)
    .map((_, index) => (
      <div
        className={`border grow h-1 ${index < score ? "bg-purple-300" : ""}`}
        key={index}
      />
    ));

  return <div className="flex gap-1 mt-1">{divs}</div>;
}

export default PasswordIndicator;
