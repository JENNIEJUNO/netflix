import React, { useState } from 'react'
import { Form, Container, Nav, Navbar, Button } from 'react-bootstrap'
import { Outlet, useNavigate } from 'react-router-dom'

const AppLayout = () => {
    const navigate = useNavigate()

    const goToHomepage = () => {
        navigate("/")
    }

    const goToMoviePage = () => {
        navigate("/Movie")
    }

    const [keyword, setKeyword] = useState('')

    const searchByKeyword = (event) => {
        event.preventDefault()
        navigate(`/Movie?q=${keyword}`)
        setKeyword("")
    }

  return (
    <div>
    <Navbar expand="lg" style={{boxShadow:'inset 0 0 0 20px black'}} className="bg-body-tertiary">
      <Container fluid >
        <Navbar.Brand href="/">
            <img src="https://images.ctfassets.net/4cd45et68cgf/4nBnsuPq03diC5eHXnQYx/d48a4664cdc48b6065b0be2d0c7bc388/Netflix-Logo.jpg" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" data-bs-theme="dark" className="navbar-toggler collapsed"
          style={{width:"50px"}}
        />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px'}}
            navbarScroll
          >
            <Nav.Link onClick={goToHomepage} style={{color:'white', fontSize:"16px"}}>Home</Nav.Link>
            <Nav.Link onClick={goToMoviePage} style={{color:'white', fontSize:"16px"}}>Movies</Nav.Link>
          </Nav>
          <Form className="d-flex" onSubmit={(event) => searchByKeyword(event)}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
            />
            <Button variant="outline-danger" onClick={searchByKeyword}>Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Outlet/>
    </div>
  )
}

export default AppLayout
