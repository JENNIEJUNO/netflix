import React from 'react'
import './RelatedMovie.style.css'
import MovieCard from '../MovieCard/MovieCard'
import { useRelatedMovie } from '../../hooks/useRelatedMovie'
import { Container } from 'react-bootstrap'
import Carousel from "react-multi-carousel";
import { useParams } from 'react-router-dom'

const RelatedMovie = () => {
    const { movieId } = useParams()
    const {data, isLoading, isError, error} = useRelatedMovie({movie_id: movieId})
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
       <div className="titleText">Related Movies</div>
        <Carousel 
            infinite={true}
            centerMode={false}
            itemClass="movie-slider p-1"
            containerClass="carousel-container"
            responsive={responsive}
        >
            {data.results.map((movie) => (
                <MovieCard movie={movie}/>
            ))}
        </Carousel>
    </Container>
  )
}

export default RelatedMovie
