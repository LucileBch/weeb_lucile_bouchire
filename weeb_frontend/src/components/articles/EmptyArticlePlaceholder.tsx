// ---------- EMPTY ARTICLE PLACEHOLDER COMPONENT ---------- //
import NoArticle from "../../assets/images/no-article-found.webp";

export function EmptyArticlePlaceholder(): React.JSX.Element {
  return (
    <div className="rounded-2xl border border-white/5 bg-white/5 p-20 text-center">
      <img
        src={NoArticle}
        alt="pas d'article"
        className="w-full max-w-xs rounded-2xl md:max-w-md"
      />
    </div>
  );
}
