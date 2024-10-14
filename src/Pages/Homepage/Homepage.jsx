import React from 'react'
import Banner from '../../Component/Banner/Banner'
import './Homepage.style.css'
import PopularMovieSlider from '../../Component/PopularMovieSlider/PopularMovieSlider'
import TopRatedMovieSlider from '../../Component/TopRatedMovieSlider/TopRatedMovieSlider'
import UpComingMovieSlider from '../../Component/UpComingMovieSlider/UpComingMovieSlider'
import { useMovieGenre } from '../../hooks/useMovieGenre'

const Homepage = () => {
  const {data:genreData} = useMovieGenre()
  return (
    <div className="homepage">
      <Banner />
      <PopularMovieSlider genreData={genreData}/>
      <TopRatedMovieSlider genreData={genreData}/>
      <UpComingMovieSlider genreData={genreData}/>
    </div>
  )
}

export default Homepage
