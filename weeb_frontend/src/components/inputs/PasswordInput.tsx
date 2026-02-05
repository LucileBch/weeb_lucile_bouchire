import { Eye, EyeOff } from "lucide-react";
import type React from "react";
import { useCallback, useState } from "react";

interface IProps {
  id: string;
  placeholder: string;
  name: string;
  value: string;
  error?: string;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
}

export function PasswordInput({
  id,
  placeholder,
  name,
  value,
  error,
  onChange,
}: Readonly<IProps>): React.JSX.Element {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleDisplayPassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  return (
    <div className="flex w-full flex-col items-center">
      <div className="relative w-full">
        <input
          type={showPassword ? "text" : "password"}
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="input"
        />
        <button
          type="button"
          onClick={handleDisplayPassword}
          className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer text-[var(--color-purple-text)] opacity-80 transition-opacity hover:opacity-100"
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5 md:h-6 md:w-6" />
          ) : (
            <Eye className="h-5 w-5 md:h-6 md:w-6" />
          )}
        </button>
      </div>

      {error && (
        <span className="mt-1 text-sm text-[var(--color-error)] italic">
          {error}
        </span>
      )}
    </div>
  );
}
