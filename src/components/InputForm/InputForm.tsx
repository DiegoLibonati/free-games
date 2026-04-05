import type { JSX } from "react";
import type { InputFormProps } from "@/types/props";

const InputForm = ({
  type,
  placeholder,
  value,
  name,
  className,
  onChange,
}: InputFormProps): JSX.Element => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      name={name}
      className={className}
      onChange={onChange}
    ></input>
  );
};

export default InputForm;
