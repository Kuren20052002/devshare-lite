type InputTextProps = {
  label: string;
  placeholder: string;
  name: string;
  value: string;
  type?: "text" | "email" | "password";
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputText = ({
  label,
  placeholder,
  name,
  value,
  onChange,
  type = "text",
  required = false,
}: InputTextProps) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label.charAt(0).toUpperCase() + label.slice(1)}
      </label>
      <input
        type={type}
        id={name}
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export default InputText;
