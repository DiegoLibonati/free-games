import { InputFormProps } from "@/types/props";

const InputForm = ({ type, placeholder, value, name, className, onChange }: InputFormProps) => {
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
