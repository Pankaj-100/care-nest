import { eyeClosedIcon, eyeOpenIcon } from "@/lib/svg_icons";
import { Input } from "../ui/input";
import { useState } from "react";
import { Button } from "../ui/button";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
  divClassName?: string;
  Icon?: React.JSX.Element;
  error?: string;
}

export const TextInput = ({
  text,
  setText,
  className,
  divClassName,
  Icon,
  error,
  ...props
}: InputProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  return (
    <div className="w-full">
      <div
        className={`flex items-center rounded-full bg-[#ffffff] py-2 px-4 ${
          error ? "border border-red-500" : ""
        } ${divClassName}`}
      >
        {Icon && <div>{Icon}</div>}
        <Input
          value={text}
          onChange={handleChange}
          {...props}
          className={`w-full border-none text-lg focus-visible:ring-0 shadow-none placeholder:text-lg placeholder:text-gray-400 ${className}`}
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-1 ml-3">{error}</p>}
    </div>
  );
};

export const PasswordInput = ({
  text,
  setText,
  className,
  Icon,
  error,
  ...props
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  return (
    <div className="w-full">
      <div
        className={`flex items-center rounded-full bg-[#ffffff] py-2 px-4 ${
          error ? "border border-red-500" : ""
        }`}
      >
        {Icon && <div>{Icon}</div>}
        <Input
          type={showPassword ? "text" : "password"}
          value={text}
          onChange={handleChange}
          className={`w-full border-none focus-visible:ring-0 shadow-none placeholder:text-lg placeholder:text-gray-400 ${className}`}
          {...props}
        />
        <button
          className="p-0 m-0"
          onClick={() => setShowPassword((prev) => !prev)}
          type="button"
        >
          {showPassword ? eyeOpenIcon : eyeClosedIcon}
        </button>
      </div>
      {error && <p className="text-red-500 text-sm mt-1 ml-3">{error}</p>}
    </div>
  );
};

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}

export const CustomButton = ({
  children,
  onClick,
  className,
  disabled,
}: ButtonProps) => {
  const classes = `bg-[var(--golden-yellow)] text-md font-semibold text-[var(--blue-gray)] py-6 rounded-full hover:bg-[var(--golden-yellow)] hover:opacity-90 hover:cursor-pointer transition-all ${className}`;
  return (
    <Button className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </Button>
  );
};
