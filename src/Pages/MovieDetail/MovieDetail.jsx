import React from 'react'
import './MoviesDetail.style.css'
import { useParams } from 'react-router-dom'
import { useMovieDetail } from '../../hooks/useMovieDetail'
import { Container, Row, Col, Badge } from 'react-bootstrap'
import RelatedMovie from '../../Component/RelatedMovie/RelatedMovie'
import ReviewsMovie from '../../Component/ReviewsMovie/ReviewsMovie'
import Banner from '../../Component/Banner/Banner'
import { ClipLoader } from "react-spinners";
import { useMovieGenre } from '../../hooks/useMovieGenre'

const MovieDetail = () => {
    const { movieId } = useParams()
    const {data, isLoading, isError, error} = useMovieDetail({movie_id: movieId})
    console.log('fdsfsf', data)
    const {data:genreData} = useMovieGenre()
    const showGenre = (item) => {
        if(!genreData) return []
        const genreList = item.map((movie) => {
        const genreObj = genreData.find((genre) => genre.id === movie.id)
        return genreObj.name
    })
    return genreList
    }
    if(isLoading){
        return <div className="spinner">
        <ClipLoader color="red" size={100}/>
    </div>
    }
    if(isError){
        return <div>Error:{error.message}</div>
    }
  return (
    <div>
    <Banner />
    <Container style={{marginTop:"30px"}}>
        <Row>
            <Col lg={6}  style={{height:"100%"}}>
                <div style={{
                    backgroundImage:"url(" + `https://media.themoviedb.org/t/p/w600_and_h900_bestv2${data.poster_path}` + ")"
                }}
                    className="movieDetail"
                >
                </div>
            </Col>
            <Col lg={6} style={{height:"100%"}}>
                <div>
                    <div className="movie-title">{data.title}</div>
                    <div className='movie-tagline'>{data.tagline}</div>
                    <div>
                        <Row className="Image">
                            <Col>
                                <img src="https://noona-netflix-react-query.vercel.app/IMDB.png" />
                                {data.vote_average}
                            </Col>
                            <Col>
                                <img src="https://noona-netflix-react-query.vercel.app/people4.png" />
                                {data.popularity}
                            </Col>
                            <Col>
                                <img src="https://noona-netflix-react-query.vercel.app/under18.svg" />
                            </Col>
                        </Row>
                    </div>
                    <div className="overview">
                        {data.overview}
                    </div>
                    <div style={{display:"flex"}}>
                    {showGenre(data?.genres)?.map((item) => (
                        <Badge bg="danger" className="detailGenre">{item}</Badge>
                    ))}
                    </div>
                    <div className="py-4">
                        <div className="d-flex align-items-center mb-2">
                            <Badge bg="danger" className="category">Budget</Badge>
                            <p>$ {data.budget}</p>
                        </div>
                        <div className="d-flex align-items-center mb-2">
                            <Badge bg="danger" className="category">Revenue</Badge>
                            <p>{data.revenue}</p>
                        </div>
                        <div className="d-flex align-items-center mb-2">
                            <Badge bg="danger" className="category">Release Date</Badge>
                            <p>{data.release_date}</p>
                        </div>
                        <div className="d-flex align-items-center mb-2">
                            <Badge bg="danger" className="category">Run time</Badge>
                            <p>{data.runtime}분</p>
                        </div>
                    </div>
                </div>
            </Col>
            <RelatedMovie />
            <ReviewsMovie />
        </Row>
    </Container>
    </div>
  )
}

export default MovieDetail