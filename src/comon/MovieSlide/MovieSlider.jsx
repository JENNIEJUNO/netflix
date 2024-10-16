import React from 'react'
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import MovieCard from '../../Component/MovieCard/MovieCard';
import './MovieSlider.style.css'
import { Container } from 'react-bootstrap';

const MovieSlider = ({title, data, genreData}) => {
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
    <Container>
        <div className="titleText">{title}</div>
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

export default MovieSlider
