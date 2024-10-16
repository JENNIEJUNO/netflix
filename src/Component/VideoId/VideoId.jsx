import React, { useState } from 'react'
import { useVideosMovie } from '../../hooks/useVideosMovie'
import { Modal } from 'react-bootstrap'
import YouTube from 'react-youtube'
import { ClipLoader } from 'react-spinners'

const VideoId = ({movieId, setShowModal, showModal}) => {
    const {data, isLoading, isError, error} = useVideosMovie({movie_id: movieId})
    console.log('movieId', data)
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
    const closeVideoDisplay = () => {
        setShowModal(false)
    }
  return (
    <div
      className="modal show"
      style={{ 
        display:'block', position:'fixed', width:"65%", left:"50%", transform:"translate(-50%, 0)",
        transition:"1.2s", top:`${showModal ? '0' : '-100vh'}`
    }}
    >
      <Modal.Dialog style={{maxWidth:"none"}}>
        <Modal.Header closeButton data-bs-theme="dark" onClick={closeVideoDisplay} style={{backgroundColor:"#000000"}}/>
        <Modal.Body style={{backgroundColor:"#000000"}}>
          <YouTube videoId={`${showModal ? `${data?.results[0].key}` : ''}`} opts={{
            width:"100%",
            playerVars: {
              autoplay:1,
              
            },
          }}/>
        </Modal.Body>

      </Modal.Dialog>
    </div>
  )
}

export default VideoId
