import { useQuery } from "@tanstack/react-query";
import api from "../api";

const fetchMovieGenre = () => {
    return api.get('/genre/movie/list')
}

export const useMovieGenre = () => {
    return useQuery({
        queryKey:['movie-gener'],
        queryFn:fetchMovieGenre,
        select:(result) => result.data.genres,
        staleTime:300000
    })
}