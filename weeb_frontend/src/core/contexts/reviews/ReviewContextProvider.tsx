// ---------- REVIEWS CONTEXT PROVIDER ---------- //
import { useCallback, useMemo, type PropsWithChildren } from "react";
import { endpoints } from "../../api/endpoints";

import type { ReviewDto } from "../../dtos/ReviewDto";
import { useReviews } from "../../hooks/useReviews";
import { ReviewContext } from "./ReviewContext";

export function ReviewContextProvider({
  children,
}: Readonly<PropsWithChildren>) {
  const { postReview } = useReviews();

  const createNewReview = useCallback(
    async (reviewDto: ReviewDto): Promise<void> => {
      const payload = {
        first_name: reviewDto.first_name,
        last_name: reviewDto.last_name,
        email: reviewDto.email,
        subject: reviewDto.subject,
        message: reviewDto.message,
      };

      return await postReview(endpoints.postReview, payload);
    },
    [postReview],
  );

  const reviewStore = useMemo(() => ({ createNewReview }), [createNewReview]);

  return (
    <ReviewContext.Provider value={reviewStore}>
      {children}
    </ReviewContext.Provider>
  );
}
