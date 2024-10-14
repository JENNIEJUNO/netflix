import { useQuery } from "@tanstack/react-query";
import api from "../api";

const fetchReviewsMovie = ({movie_id}) => {
    return movie_id 
    ? api.get(`/movie/${movie_id}/reviews`)
    : api.get('/movie/popular')
}

export const useReviewsMovie = ({movie_id}) => {
    return useQuery({
        queryKey:['movie-reviews', movie_id],
        queryFn: () => fetchReviewsMovie({movie_id}),
        select:(result) => result.data
    })
}