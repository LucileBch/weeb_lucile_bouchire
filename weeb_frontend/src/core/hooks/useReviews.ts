// ---------- REVIEWS HOOK ---------- //
import { useCallback } from "react";
import { api } from "../api/axiosInstance";
import type { ReviewDto } from "../dtos/ReviewDto";

interface ReviewHook {
  postReview: (url: string, payload: ReviewDto) => Promise<void>;
}

export function useReviews(): ReviewHook {
  const postReview = useCallback(
    async (url: string, payload: ReviewDto): Promise<void> => {
      await api.post<ReviewDto>(url, payload);
    },
    [],
  );

  return {
    postReview,
  };
}
