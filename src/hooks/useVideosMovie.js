import { useQuery } from "@tanstack/react-query";
import api from "../api";

const fetchVideosMovie = ({movie_id}) => {
    return api.get(`/movie/${movie_id}/videos`)
}

export const useVideosMovie = ({movie_id}) => {
    return useQuery({
        queryKey:['movie-video', movie_id],
        queryFn:() => fetchVideosMovie({movie_id}),
        select:(result) => result.data
    })
}