import { useState, useEffect } from 'react'
import { Blog } from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import AddBlog from './components/AddBlog'
import { DisplayMessageGreen } from './components/DisplayMessageGreen'
import { DisplayRedMessage } from './components/DisplayRedMessage'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { setGreenMessage, setRedMessage } from './reducers/notificationReducer'
import { setBlogs , setUser } from './reducers/blogsReducer'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { ListOfUsers  } from './components/ListOfUsers'

import { SingleUserBlogToShow } from '../src/components/SingleUserBlogToShow'
import { SelectedBlogToShow } from './components/SelectedBlogToShow'
import BlogList from './components/BlogList'

// bootstrap
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'




const App = () => {
  const [userList, setuserList] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const redMessage = useSelector(state => state.notifications.redMessage)
  const greenMessage = useSelector(state => state.notifications.greenMessage)
  const blogs = useSelector(state => state.blogs.blogs)
  const user = useSelector(state => state.blogs.user)

  const dispatch = useDispatch()


  useEffect(() => {
    const fetchBlogs = async () => {
      if (user) {
        try {
          const fetchedBlogs = await blogService.getAll()
          dispatch(setBlogs(fetchedBlogs))
        } catch (error) {
          console.error('Error fetching blogs:', error)
        }
      }
    }
    fetchBlogs()
  }, [dispatch, user])

  useEffect(() => {
    const loggedUserJSON = window.sessionStorage.getItem('loggedBlogsAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  const handleGreenMessage = (message) => {
    dispatch(setGreenMessage(message))
    setTimeout(() => {
      dispatch(setGreenMessage(''))
    }, 2000)
  }

  const handleRedMessage = (message) => {
    dispatch(setRedMessage(message))
    setTimeout(() => {
      dispatch(setRedMessage(''))
    }, 2000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      const token = user.token
      window.sessionStorage.setItem('loggedBlogsAppToken', token)
      window.sessionStorage.setItem('loggedBlogsAppUser', JSON.stringify(user))
      dispatch(setUser(user))
      blogService.setToken(token)
    } catch (error) {
      handleRedMessage('The username or password you inserted is not valid.')
      setUsername('')
      setPassword('')
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.sessionStorage.removeItem('loggedBlogsAppToken')
    window.sessionStorage.removeItem('loggedBlogsAppUser')
    dispatch(setUser(null))
    setUsername('')
    setPassword('')
  }

  if (user === null) {
    return (
      <div>
        <h2>Log into the blog application</h2>
        <DisplayRedMessage message={redMessage} data-cy="error"/>
        <form onSubmit={handleLogin}>
          <div>
            username:
            <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
              data-cy="username"
            ></input>
          </div>
          password:
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            data-cy="password"
          ></input>
          <div>
            <button  data-cy="login" type="submit">login</button>
          </div>
        </form>
      </div>
    )
  }


  return (
    <div className='container'>
      <Router>
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand as={Link} to="/"></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/users">List of users</Nav.Link>
                <Nav.Link as={Link} to="/create">Create a new blog</Nav.Link>
              </Nav>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent:'space-between' }}>
                <strong style={{ marginRight: '10px' }}>{user.name} is logged in</strong>
                <button data-cy="logOutButton" style={{ backgroundColor: 'black', color: 'whitesmoke' }} onClick={handleLogout}>logout</button>
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <div>

        </div>
        <div>
          <Routes>
            <Route
              path='/'
              element={<BlogList blogs={blogs} setBlogs={setBlogs} handleRedMessage={handleRedMessage} redMessage={redMessage} user={user} />}
            />
            <Route path='/users' element={<ListOfUsers/>}  />
            <Route path='/users/:id' element={<SingleUserBlogToShow />}  />
            <Route path='/blogs/:id' element={<SelectedBlogToShow  />}  />
            <Route path='/create' element={<Togglable buttonLabel="Click for a New Blog Form" >
              <AddBlog
                setBlogs={setBlogs}
                handleGreenMessage={handleGreenMessage}
                handleRedMessage={handleRedMessage}
              />
            </Togglable>}  />
          </Routes>
          <div>
            <DisplayMessageGreen message={greenMessage} />
            <DisplayRedMessage message={redMessage} />
          </div>
        </div>
      </Router>
    </div>
  )
}

export default App
