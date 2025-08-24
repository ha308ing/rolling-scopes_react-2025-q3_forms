export const checkLowercase = (string: string) => /[a-z]/.test(string);

export const checkUppercase = (string: string) => /[A-Z]/.test(string);

export const checkNumber = (string: string) => /\d/.test(string);

export const checkSpecialCharacter = (string: string) =>
  /[!@#$5^&*()_+=-]/.test(string);
