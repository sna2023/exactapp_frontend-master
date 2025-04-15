export const Input = ({ name, value, onChange, placeholder, type = "text" }) => (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="border rounded-lg p-2 w-full"
    />
  );
  