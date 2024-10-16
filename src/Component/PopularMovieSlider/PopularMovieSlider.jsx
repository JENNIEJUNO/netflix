import React from 'react'
import { usePopularMovie } from '../../hooks/usePopularMovie';
import { ClipLoader } from 'react-spinners';
import MovieSlider from '../../comon/MovieSlide/MovieSlider';

const PopularMovieSlider = ({genreData}) => {
    const {data, isLoading, isError, error} = usePopularMovie()
    console.log('data', data)
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

  return (
    <div>
        <MovieSlider title="Popular Movies" data={data} genreData={genreData}/>
    </div>
  )
}

export default PopularMovieSlider