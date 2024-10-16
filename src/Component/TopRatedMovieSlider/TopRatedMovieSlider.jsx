import React from 'react'
import { useTopRatedMovie } from '../../hooks/useTopRatedMovie'
import { ClipLoader } from 'react-spinners';
import MovieSlider from '../../comon/MovieSlide/MovieSlider';

const TopRatedMovieSlider = ({genreData}) => {
    const {data, isLoading, isError, error} = useTopRatedMovie()
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
        <MovieSlider title="Top Rated Movies" data={data} genreData={genreData}/>
    </div>
  )
}

export default TopRatedMovieSlider
