import { WorkInProgress } from "../components/WorkInProgress";

export function AboutPage(): React.JSX.Element {
  return (
    <div className="flex flex-col items-center gap-4 py-10 text-center md:gap-8">
      <h1>À propos</h1>
      <WorkInProgress />
    </div>
  );
}
