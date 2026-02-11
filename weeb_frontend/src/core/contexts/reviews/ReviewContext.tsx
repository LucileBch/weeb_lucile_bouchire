// ---------- REVIEWS CONTEXT ---------- //
import React, { useContext } from "react";
import type { ReviewDto } from "../../dtos/ReviewDto";

export interface ReviewStore {
  createNewReview(reviewDto: ReviewDto): Promise<void>;
}

export const ReviewContext = React.createContext<ReviewStore | undefined>(
  undefined,
);

export const useReviewContext = () => {
  const context = useContext(ReviewContext);

  if (!context) {
    throw new Error("useReviewContext must be used in a ReviewContextProvider");
  }

  return context;
};
