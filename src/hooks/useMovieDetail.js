import { useQuery } from "@tanstack/react-query";
import api from "../api";

const fetchMovieDetail = ({movie_id}) => {
    return movie_id
    ? api.get(`/movie/${movie_id}`)
    : api.get('/movie/popular')
}

export const useMovieDetail = ({ movie_id }) => {
    return useQuery({
        queryKey: ['movie-detail', movie_id],
        queryFn: () => fetchMovieDetail({ movie_id }),
        select: (result) => result.data
    });
}
