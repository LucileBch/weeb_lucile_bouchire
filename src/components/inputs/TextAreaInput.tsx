import type React from "react";

interface IProps {
  id: string;
  placeholder: string;
  name: string;
  value: string;
  error?: string;
  onChange(e: React.ChangeEvent<HTMLTextAreaElement>): void;
}

export function TextAreaInput({
  id,
  placeholder,
  name,
  value,
  error,
  onChange,
}: Readonly<IProps>): React.JSX.Element {
  return (
    <div className="flex w-full flex-col items-center">
      <textarea
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="input resize-none"
        rows={2}
      />

      {error && (
        <span className="mt-1 text-sm text-[var(--color-error)] italic">
          {error}
        </span>
      )}
    </div>
  );
}
