export const encodeFile = (file: File): Promise<string> => {
  return new Promise((res) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      res(reader.result as string);
    };

    reader.onerror = () => {
      res("");
    };

    reader.readAsDataURL(file);
  });
};
