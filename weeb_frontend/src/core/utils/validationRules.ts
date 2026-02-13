// ---------- VALIDATION RULES ---------- //
/** Check name validity */
export function validateName(
  name: string,
  fieldLabel = "Ce champ",
): string | undefined {
  if (!name) return `${fieldLabel} est requis`;
  if (name.trim().length < 2)
    return `${fieldLabel} doit contenir au moins 2 caractères`;
  if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/.test(name))
    return `${fieldLabel} contient des caractères non valides`;
  return undefined;
}

/** Check email validity */
export function validateEmail(email: string): string | undefined {
  if (!email) return "L'email est requis";
  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))
    return "L'email n'est pas valide";
  return undefined;
}

/** Check password safety */
export function validatePassword(password: string): string | undefined {
  if (!password) return "Le mot de passe est requis";

  const minLength = 8;
  const maxLength = 20;
  if (password.length < minLength)
    return `Le mot de passe doit contenir au moins ${minLength} caractères`;
  if (password.length > maxLength)
    return `Le mot de passe ne doit pas dépasser ${maxLength} caractères`;

  if (!/[A-Z]/.test(password))
    return "Le mot de passe doit contenir une majuscule";
  if (!/[a-z]/.test(password))
    return "Le mot de passe doit contenir une minuscule";
  if (!/\d/.test(password)) return "Le mot de passe doit contenir un chiffre";
  if (!/[@$!%*?&]/.test(password))
    return "Le mot de passe doit contenir un caractère spécial (@$!%*?&)";
  if (/\s/.test(password))
    return "Le mot de passe ne doit pas contenir d'espaces";

  return undefined;
}

/** Check not empty field */
export function validateNotEmpty(
  code: string,
  fieldLabel = "Ce champ",
): string | undefined {
  if (!code) return `${fieldLabel} est requis`;
  if (code.trim().length < 2)
    return `${fieldLabel} doit contenir au moins 2 caractères`;
  return undefined;
}
