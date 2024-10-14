import { useQuery } from "@tanstack/react-query";
import api from "../api";

const fetchUpComingMovies = () => {
    return api.get('/movie/upcoming')
}

export const useUpComingMovie = () => {
    return useQuery({
        queryKey:['movie-upComing'],
        queryFn:fetchUpComingMovies,
        select:(result) => result.data
    })
}