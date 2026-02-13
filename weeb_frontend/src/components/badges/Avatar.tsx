// ---------- AVATAR COMPONENT ---------- //
interface IProps {
  firstName?: string;
  lastName?: string;
}

export function Avatar({
  firstName = "?",
  lastName = "?",
}: Readonly<IProps>): React.JSX.Element {
  const initialF = firstName.charAt(0).toUpperCase();
  const initialL = lastName.charAt(0).toUpperCase();

  return (
    <div className="bg-purple-bg flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-xs font-bold text-white uppercase shadow-md">
      {initialF}
      {initialL}
    </div>
  );
}
