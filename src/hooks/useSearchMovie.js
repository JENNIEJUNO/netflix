import { useQuery } from "@tanstack/react-query";
import api from "../api";

const fetchuseSearchMovie = ({keyword, page}) => {
    return keyword
    ? api.get(`search/movie?query=${keyword}&page=${page}`)
    : api.get(`/movie/popular?page=${page}`)
}

export const useSearchMovie = ({keyword, page}) => {
    return useQuery({
        queryKey:['movie-search', keyword, page],
        queryFn:() => fetchuseSearchMovie({keyword, page}),
        select:(result) => result.data
    })
}