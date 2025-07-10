type InputTextProps = {
  label: string;
  placeholder: string;
  name: string;
  value: string;
  type?: "text" | "email" | "password";
  required?: boolean;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
export default function InputText({
  label,
  placeholder,
  name,
  value,
  onChange,
  type = "text",
  required = false,
  error,
}: InputTextProps) {
  return (
    <>
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <input
        type={type}
        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      />
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </>
  );
}
