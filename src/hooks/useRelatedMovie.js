import { useQuery } from "@tanstack/react-query";
import api from "../api";

const fetchRelatedMovie = ({movie_id}) => {
    return movie_id
    ? api.get(`/movie/${movie_id}/recommendations`)
    : api.get('/movie/popular')
}

export const useRelatedMovie = ({movie_id}) => {
    return useQuery({
        queryKey:['movie-recommendations', movie_id],
        queryFn: () => fetchRelatedMovie({movie_id}),
        select:(result) => result.data
    })
}