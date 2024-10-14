import React from 'react'
import './TopRatedMovieSlider.style.css'
import { useTopRatedMovie } from '../../hooks/useTopRatedMovie'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MovieCard from '../MovieCard/MovieCard';
import { Container } from 'react-bootstrap';

const TopRatedMovieSlider = ({genreData}) => {
    const {data, isLoading, isError, error} = useTopRatedMovie()
    console.log('data', data)
    if(isLoading){
        return <div>Loading...</div>
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
          items: 5
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };
  return (
    <Container>
       <div className="titleText">Top rated Movies</div>
        <Carousel 
            infinite={true}
            centerMode={false}
            itemClass="movie-slider p-1"
            containerClass="carousel-container"
            responsive={responsive}
        >
            {data.results.map((movie) => (
                <MovieCard movie={movie} genreData={genreData}/>
            ))}
        </Carousel>
    </Container>
  )
}

export default TopRatedMovieSlider
