import React from 'react'
import './RelatedMovie.style.css'
import { useRelatedMovie } from '../../hooks/useRelatedMovie'
import { useParams } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import { useMovieGenre } from '../../hooks/useMovieGenre'
import MovieSlider from '../../comon/MovieSlide/MovieSlider'

const RelatedMovie = () => {
    const { movieId } = useParams()
    const {data, isLoading, isError, error} = useRelatedMovie({movie_id: movieId})
    const {data:genreData} = useMovieGenre()
    if(isLoading){
      return <div className="spinner">
          <ClipLoader color="red" size={100}/>
      </div>
  }
    if(isError){
        return <div>Error:{error.message}</div>
    }
    if(!data?.results || data.results.length === 0){
        return <div>No data available</div>
    }

    const responsive = {
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5,
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 3
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 2
      }
      };
  return (
    <div>
        <MovieSlider title="Relate Movies" data={data} genreData={genreData}/>
    </div>
  )
}

export default RelatedMovie
