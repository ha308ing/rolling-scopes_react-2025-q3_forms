function Button({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`p-2 text-center bg-purple-800 text-lime-200 uppercase rounded-md w-[100%] font-medium shadow cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
