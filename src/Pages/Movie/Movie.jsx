import React, { useEffect, useState } from 'react'
import './Movie.style.css'
import { useSearchMovie } from '../../hooks/useSearchMovie'
import { useSearchParams } from 'react-router-dom'
import { Container, Row, Col, ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap'
import MovieCard from '../../Component/MovieCard/MovieCard'
import { useMovieGenre } from '../../hooks/useMovieGenre'
import ReactPaginate from 'react-paginate'

const Movie = () => {
    const [query, setQuery] = useSearchParams()
    const {data:genreData} = useMovieGenre()
    const [page, setPage] = useState(1)
    const [sortedMovies, setSortedMovies] = useState([])
    const [popularyityOrder, setPopularyityOrder] = useState('인기 순')
    const [genreOrder, setGenreOrder] = useState('장르별 검색')
    const keyword = query.get("q")
    const {data, isLoading, isError, error} = useSearchMovie({keyword, page})
    const movieOrder = ['인기 순', '비인기 순']
    const moiveGenre = ['Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Family', 'Fantasy', 'History',
        'Horror', 'Music', 'Mystery', 'Romance', 'Science Fiction', 'TV Movie', 'Thriller', 'War', 'Western'
    ]
    console.log('dddd', data)
    useEffect(() => {
        if (data?.results) {
            setSortedMovies(data.results)
        }
    }, [data])
    if(isLoading){
        return <div>Loading...</div>
    }
    if(isError){
        return <div>Error:{error.message}</div>
    }
    if(!data?.results || data.results.length === 0){
        return <div>No data available</div>
    }
    const updateMovies = (newGenreOrder, newPopularityOrder) => {
        const genreFilteredMovies = newGenreOrder === '장르별 검색'
        ? data.results
        : data.results.filter(movie => 
            movie.genre_ids.some(id => {
                const genreObj = genreData?.find(genre => genre.id === id)
                return genreObj && genreObj.name === newGenreOrder;
            })
        )

        const sortedMovies = [...genreFilteredMovies].sort((a, b) => {
            if(newPopularityOrder === '인기 순' || !newPopularityOrder){{
                return b.popularity - a.popularity;
            }}else if(newPopularityOrder === '비인기 순'){
                return a.popularity - b.popularity;
            }
            return 0;
        })
        setSortedMovies(sortedMovies);
    }
    const orderPopularity = (event) => {
        const checkOrder = event.target.innerText;
        setPopularyityOrder(checkOrder)
        updateMovies(genreOrder, checkOrder)
    }

    const orderGenre = (event) => {
        const checkOrder = event.target.innerText;
        setGenreOrder(checkOrder)
        updateMovies(checkOrder, popularyityOrder)
    }

    const handlePageClick = ({selected}) => {
        setPage(selected + 1)
    }
  return (
    <Container>
            {['Danger'].map(
                (variant) => (
                <DropdownButton
                    style={{marginRight:'1rem'}}
                    as={ButtonGroup}
                    key={variant}
                    id={`dropdown-variants-${variant}`}
                    variant={variant.toLowerCase()}
                    title={popularyityOrder}
                >
                    {movieOrder.map((item, index) => (
                        <Dropdown.Item eventKey={index} className="orderItem" onClick={(event) => orderPopularity(event)}>{item}</Dropdown.Item>
                    ))}
                </DropdownButton>
                ),
            )}
            {['Danger'].map(
                (variant) => (
                <DropdownButton
                    as={ButtonGroup}
                    key={variant}
                    id={`dropdown-variants-${variant}`}
                    variant={variant.toLowerCase()}
                    title={genreOrder}
                >
                    {moiveGenre.map((item, index) => (
                        <Dropdown.Item eventKey={index} className="orderItem" onClick={(event) => orderGenre(event)}>{item}</Dropdown.Item>
                    ))}
                </DropdownButton>
                ),
            )}
        <Row>
            {sortedMovies.map((movie) => (
                <Col lg={3} xs={6} style={{margin:"3vh 0"}}>
                    <MovieCard movie={movie} genreData={genreData}/>
                </Col>
            ))}
        </Row>
        <Col style={{width:"100%", display:"flex", justifyContent:"center"}}>
        <ReactPaginate
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={12}
        previousLabel="<"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
        forcePage={page - 1}
      />
      </Col>
    </Container>
  )
}

export default Movie
