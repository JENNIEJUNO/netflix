import { useQuery } from "@tanstack/react-query";
import api from "../api";

const fetchPopularMovies = () => {
    return api.get('/movie/popular')
}

export const usePopularMovie = () => {
    return useQuery({
        queryKey:['movie-popular'],
        queryFn:fetchPopularMovies,
        select:(result) => result.data
    })
}