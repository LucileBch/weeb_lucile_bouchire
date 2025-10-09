import type React from "react";

interface IProps {
  id: string;
  placeholder: string;
  name: string;
  value: string;
  type?: React.HTMLInputTypeAttribute;
  error?: string;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
}

export function TextInput({
  id,
  placeholder,
  name,
  value,
  type = "text",
  error,
  onChange,
}: Readonly<IProps>): React.JSX.Element {
  return (
    <div className="flex w-full flex-col items-center">
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="input"
      />

      {error && (
        <span className="mt-1 text-sm text-[var(--color-error)] italic">
          {error}
        </span>
      )}
    </div>
  );
}
