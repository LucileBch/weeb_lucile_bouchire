// ---------- ARTICLE CARD COMPONENT ---------- //
import NoImage from "../../assets/images/no-image-placeholder.webp";
import type { ArticleDto } from "../../core/dtos/ArticleDto";
import { DateBadge } from "../badges/DateBadge";

interface IProps {
  article: ArticleDto;
}

export function ArticleCard({ article }: Readonly<IProps>): React.JSX.Element {
  return (
    <article className="group hover:border-purple-text/50 flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 hover:shadow-[0_0_20px_rgba(192,132,252,0.15)]">
      <div className="relative aspect-video w-full overflow-hidden">
        {article.image ? (
          <img
            src={article.image}
            alt={article.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <img
            src={NoImage}
            alt="pas d'image"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}

        <DateBadge
          date={article.created_at}
          className="absolute top-3 right-3"
        />
      </div>

      <div className="flex flex-1 flex-col p-5 text-left">
        <h3 className="group-hover:text-purple-text mb-1 line-clamp-2 text-white transition-colors">
          {article.title}
        </h3>

        <p className="text-grey-light mb-4 line-clamp-2 flex-1">
          {article.content}
        </p>

        <div className="mt-auto flex items-center gap-3 border-t border-white/10 pt-4">
          <div className="bg-purple-bg flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white uppercase">
            {article.author.first_name[0]}
            {article.author.last_name[0]}
          </div>
          <div className="flex flex-col">
            <h4 className="text-purple-text m-0 leading-none lowercase italic">
              @{article.author.first_name}
            </h4>
            <span className="text-grey text-[10px]">
              {article.author.first_name} {article.author.last_name}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
