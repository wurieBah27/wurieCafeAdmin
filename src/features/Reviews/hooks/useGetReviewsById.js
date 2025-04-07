import { useQuery } from "@tanstack/react-query";
import { getReviewsById } from "../../../APIS/Api/productReviews";

const useGetReviewsById = (id) => {
  const { data: reviewsData, isLoading: isFetchingReviews } = useQuery({
    queryKey: [`reviews${id}`], // Unique key for the query
    queryFn: () => getReviewsById({ productId: id }), // Function to fetch the reviews by ID
    enabled: !!id, // Only run the query if id is truthy
  });
  return { reviewsData, isFetchingReviews };
};

export default useGetReviewsById;
