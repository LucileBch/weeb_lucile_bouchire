// ---------- ARTICLE TEMPLATE COMPONENT ---------- //
import { Pencil, Trash2 } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { pagesUrl } from "../../app/appConstants";
import NoImage from "../../assets/images/no-image-placeholder.webp";
import { useArticleContext } from "../../core/contexts/articles/ArticleContext";
import { useAuthContext } from "../../core/contexts/auth/AuthContext";
import type { ArticleDto } from "../../core/dtos/articles/ArticleDto";
import {
  formatDate,
  handleNavigationWithTimeout,
} from "../../core/utils/helpers";
import { Avatar } from "../badges/Avatar";
import { IconButton } from "../buttons/IconButton";
import { ConfirmationModal } from "../modals/ConfirmationModal";

interface IProps {
  article: ArticleDto;
}

export function ArticleTemplate({
  article,
}: Readonly<IProps>): React.JSX.Element {
  const navigate = useNavigate();

  const { actualUser } = useAuthContext();
  const { removeArticleById } = useArticleContext();

  const [isConfirmationModalOpen, setIsConfirmationModalOpen] =
    useState<boolean>(false);
  const [isActionInProgress, setIsActionInProgress] = useState<boolean>(false);

  const isArticleOwner = useMemo(() => {
    return actualUser?.id === article.author.id;
  }, [actualUser?.id, article.author.id]);

  const handleUpdate = useCallback(() => {}, []);

  const handleDelete = useCallback(() => {
    setIsConfirmationModalOpen(true);
  }, []);

  const confirmDelete = useCallback(async () => {
    setIsActionInProgress(true);

    const isDeleted = await removeArticleById(article.id);
    setIsActionInProgress(false);

    if (isDeleted) {
      setIsConfirmationModalOpen(false);
      handleNavigationWithTimeout(navigate, pagesUrl.BLOG_PAGE, 0);
    }
  }, [article.id, navigate, removeArticleById]);

  const handleCloseConfirmationModal = useCallback(() => {
    setIsConfirmationModalOpen(false);
  }, []);

  return (
    <>
      <article className="flex flex-col">
        {/* Article title & image */}
        <div className="container">
          <div className="relative h-[40vh] min-h-[350px] w-full overflow-hidden rounded-3xl border border-white/10 shadow-2xl lg:h-[60vh]">
            {isArticleOwner && (
              <div className="bg-midnight/40 absolute top-6 right-6 z-20 flex items-center gap-2 rounded-full border border-white/10 p-2 backdrop-blur-md">
                <IconButton icon={Pencil} onClick={handleUpdate} />
                <div className="h-4 w-[1px] bg-white/10" />{" "}
                <IconButton icon={Trash2} onClick={handleDelete} />
              </div>
            )}

            <img
              src={article.image ?? NoImage}
              alt={article.title}
              className="h-full w-full object-cover"
            />

            <div className="from-midnight via-midnight/40 absolute inset-0 bg-linear-to-t to-transparent" />
            <div className="absolute bottom-0 left-1/2 container -translate-x-1/2 pb-10">
              <h1 className="text-left leading-tight lg:max-w-4xl">
                {article.title}
              </h1>
            </div>
          </div>
        </div>

        <div className="container py-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
            {/* Sidebar : Author infos */}
            <aside className="order-2 lg:order-1 lg:col-span-1">
              <div className="sticky top-24 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl">
                <h4 className="text-grey mb-4 text-xs font-bold tracking-widest uppercase">
                  Rédigé par
                </h4>

                <div className="mb-2 flex items-center justify-center gap-4">
                  <Avatar
                    firstName={article.author.first_name}
                    lastName={article.author.last_name}
                  />

                  <div className="flex min-w-0 flex-col">
                    <p className="truncate text-sm leading-tight font-bold text-white">
                      {article.author.first_name} {article.author.last_name}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-grey text-[10px] font-bold tracking-wider uppercase">
                      Publié le
                    </p>
                    <p className="text-sm text-white">
                      {formatDate(article.created_at)}
                    </p>
                  </div>

                  {article.updated_at !== article.created_at && (
                    <div>
                      <p className="text-grey text-[10px] font-bold tracking-wider uppercase">
                        Mis à jour le
                      </p>
                      <p className="text-sm text-white italic">
                        {formatDate(article.updated_at)}
                      </p>
                    </div>
                  )}
                </div>

                <hr className="my-6 border-white/10" />
                <button
                  onClick={() => navigate(pagesUrl.BLOG_PAGE)}
                  className="link text-sm italic"
                >
                  ← Retour aux articles
                </button>
              </div>
            </aside>

            {/* Article content */}
            <main className="order-1 min-w-0 lg:order-2 lg:col-span-3">
              <div className="w-full max-w-none">
                <p className="text-responsive text-grey-light overflow-wrap-anywhere first-letter:text-purple-text text-justify leading-relaxed break-words [word-break:break-word] whitespace-pre-wrap first-letter:float-left first-letter:mr-3 first-letter:text-6xl first-letter:font-bold">
                  {article.content}
                </p>
              </div>
            </main>
          </div>
        </div>
      </article>

      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={handleCloseConfirmationModal}
        onConfirm={confirmDelete}
        title="Confirmer la suppression"
        message="Êtes-vous sûr de vouloir supprimer cet article ? Cette action est irréversible."
        isActionInProgress={isActionInProgress}
      />
    </>
  );
}
