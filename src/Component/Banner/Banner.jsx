import React, { useState } from 'react'
import { usePopularMovie } from '../../hooks/usePopularMovie'
import './Banner.style.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import VideoId from '../VideoId/VideoId';

const Banner = () => {
    const {data, isLoading, isError, error} = usePopularMovie()
    const movieId = data?.results[0].id
    const [showModal, setShowModal] = useState(false)
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
    const onVideoDisplay = () => {
        setShowModal(true)
    }
  return (
    <div style={{
        background: `linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, 0) 80%, rgba(0, 0, 0, 0.7)), 
                  url(https://media.themoviedb.org/t/p/w600_and_h900_bestv2${data.results[0].poster_path})`,
        backgroundSize: 'cover',
        backgroundPosition: '50% 20%',
        backgroundRepeat: 'no-repeat'
    }}
    className="banner"
    >
        <div className="information">
            <h1>{data.results[0].original_title}</h1>
            <p>{data.results[0].overview}</p>
            <button onClick={onVideoDisplay}><FontAwesomeIcon icon={faPlay}/> 재생</button>
        </div>
        <VideoId movieId={movieId} setShowModal={setShowModal} showModal={showModal}/>
    </div>
  )
}

export default Banner
