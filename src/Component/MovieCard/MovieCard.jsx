import React from 'react'
import './MovieCard.style.css'
import { Badge } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({movie, genreData}) => {
  const navigate = useNavigate()
  const showGenre = (item) => {
    if(!genreData) return []
    const genreList = item.map((id) => {
    const genreObj = genreData.find((genre) => genre.id === id)
    return genreObj.name
  })
  return genreList
  }

  const goToMovieDetail = () => {
    navigate(`/Movie/${movie.id}`)
  }
 
  return (
    <div style={{
      backgroundImage:'url(' + 
      `https://media.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}` +
      ")"
    }}
    className="movieCard"
    onClick={goToMovieDetail}
    >
      <div className="movieItem">
        <div>{movie.title}</div>
        <div>
          {showGenre(movie.genre_ids)?.map((item) => (
            <Badge bg="danger" style={{marginRight:"5px"}}>{item}</Badge>
          ))}
        </div>
          <img style={{
            height:'20px'
          }}
          src={
            `${movie.adult
            ? "https://i.namu.wiki/i/T7UOEa5MJGtVii7S9tbNcz3aNLEFiX_4PqfmVPtWEK9AmUoqsNzOl7SeyUgl2V1pCGBuUP3W-rR1IXDIFRyuSQ1B9Bw4Dh2zBpPpiO0ZJe6B3hxp2nR4aZqyj2q-1CjeAuVCZTJ41UemGu1G5V0dbQ.webp"
            : "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Republic_Of_Korea_Broadcasting-TV_Rating_System%28ALL%29.svg/500px-Republic_Of_Korea_Broadcasting-TV_Rating_System%28ALL%29.svg.png"}`}
          />
        </div>
      </div>
  )
}

export default MovieCard