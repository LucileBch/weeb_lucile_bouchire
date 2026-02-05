export function PasswordRules(): React.JSX.Element {
  return (
    <div className="flex flex-col items-center italic">
      <p>
        * Le mot de passe doit contenir entre{" "}
        <span className="font-extrabold text-[var(--color-error)]">
          8 et 20 caractères.
        </span>
      </p>
      <p>
        * Le mot de passe doit contenir au moins{" "}
        <span className="font-extrabold text-[var(--color-error)]">
          une majuscule.
        </span>
      </p>
      <p>
        * Le mot de passe doit contenir au moins{" "}
        <span className="font-extrabold text-[var(--color-error)]">
          une minuscule.
        </span>
      </p>
      <p>
        * Le mot de passe doit contenir au moins{" "}
        <span className="font-extrabold text-[var(--color-error)]">
          un chiffre.
        </span>
      </p>
      <p>
        * Le mot de passe doit contenir au moins{" "}
        <span className="font-extrabold text-[var(--color-error)]">
          un caractère spécial.
        </span>
      </p>
    </div>
  );
}
