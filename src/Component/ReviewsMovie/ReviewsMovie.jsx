import { useReviewsMovie } from '../../hooks/useReviewsMovie'
import { useParams } from 'react-router-dom'
import './ReviewsMovie.style.css'
import { useState } from 'react'

const ReviewsMovie = () => {
    const [sentence, setSentence] = useState([])
    const { movieId } = useParams()
    const {data, isLoading, isError, error} = useReviewsMovie({movie_id: movieId})

    const reviewSentence = (index) => {
        setSentence((prev) => {
             const newSentence = [...prev];
             newSentence[index] = !newSentence[index];
             return newSentence
        })
        console.log(sentence)
    }
    if(isLoading){
        return <div>Loading...</div>
    }
    if(isError){
        return <div>Error:{error.message}</div>
    }
    if(!data?.results || data.results.length === 0){
        return <div>No data available</div>
    }
  return (
    <div>
        <div className="titleText">Reviews</div>
        {data.results.map((item, index) => (
            <div className="review" key={index}>
                <p>{item.author}</p>
                <p>{item.content.length > 200
                    ? !sentence[index] ? item.content.substring(0, 200) : item.content
                    : item.content
                }</p>
                {item.content.length > 200
                ? <button style={{
                    background:"none",
                    color:"white",
                    border:"none",
                }}
                onClick={() => reviewSentence(index)}>
                    <u>{!sentence[index] ? "더보기" : "접기"}</u>
                </button>
                : ""
                }
            </div>
        ))} 
    </div>
  )
}

export default ReviewsMovie
