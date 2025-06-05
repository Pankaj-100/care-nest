import { eyeClosedIcon, eyeOpenIcon } from "@/lib/svg_icons";
import { Input } from "../ui/input";
import { useState } from "react";
import { Button } from "../ui/button";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
  Icon?: React.JSX.Element;
}

export const TextInput = ({
  text,
  setText,
  className,
  Icon,
  ...props
}: InputProps) => {
  const classes = `w-full border-none focus-visible:ring-[0px] shadow-none ${className}`;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  return (
    <div className={`flex items-center rounded-full bg-[#ffffff] py-2 px-4`}>
      {Icon && <div>{Icon}</div>}
      <Input
        value={text}
        onChange={handleChange}
        {...props}
        className={classes}
      />
    </div>
  );
};

export const PasswordInput = ({
  text,
  setText,
  className,
  Icon,
  ...props
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const classes = `w-full border-none  focus-visible:ring-[0px] shadow-none ${className}`;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  return (
    <div className={`flex items-center rounded-full bg-[#ffffff] py-2 px-4`}>
      {Icon && <div>{Icon}</div>}
      <Input
        type={showPassword ? "text" : "password"}
        value={text}
        onChange={handleChange}
        {...props}
        className={classes}
      />
      <button
        className="p-0 m-0"
        onClick={() => setShowPassword((prev) => !prev)}
      >
        {showPassword ? eyeClosedIcon : eyeOpenIcon}
      </button>
    </div>
  );
};

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}

export const CustomButton = ({ children, onClick, className }: ButtonProps) => {
  const classes = `bg-[var(--golden-yellow)] text-[var( --blue-gray)]  py-6 rounded-full hover:bg-[var(--golden-yellow)] hover:opacity-90 hover:cursor-pointer transition-all ${className}`;
  return (
    <Button className={classes} onClick={onClick}>
      {" "}
      {children}
    </Button>
  );
};
