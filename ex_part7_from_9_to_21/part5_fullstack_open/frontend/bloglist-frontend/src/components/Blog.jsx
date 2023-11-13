import { useState } from 'react'
import React  from 'react'
import blogService from '../services/blogs'
import { DisplayRedMessage } from './DisplayRedMessage'
import { useDispatch, useSelector } from 'react-redux'
import { updateBlogLikes , deleteBlog, setBlogs } from '../reducers/blogsReducer'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'


const Blog = ({ blog, blogs, handleRedMessage, user  }) => {


  const redMessage = useSelector(state => state.notifications.redMessage)

  const dispatch = useDispatch()

  const [see, setSee] = useState(false)

  const hideBlogInfo = { display: see ? 'none' : '' }
  const showBlogInfo = { display: see ? '' : 'none' }


  const uniqueId = `blog-item-${blog.id}`

  const handleLike = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('loggedBlogsAppUser'))
      const userToken = await user.token
      const updatedBlog = { ...blog, likes: blog.likes + 1 }
      await updatedBlog
      await blogService.update(blog.id, updatedBlog, userToken)
      console.log('The user in the handle like function ', userToken)
      const updatedBlogs = await blogService.getAll(updatedBlog)
      dispatch(updateBlogLikes({ id: blog.id, likes: updatedBlog.likes }))
      dispatch(setBlogs(updatedBlogs))
    } catch (error) {
      console.error('Error updating likes:', error)
    }
  }


  const handleDelete = async () => {
    if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`)) {
      try {
        await blogService.deleteBlog(blog.id)
        const updatedBlogs = blogs.filter((b) => b.id !== blog.id)
        const message = `Blog "${blog.title}" by ${blog.author} has been deleted.`
        console.log(message)
        handleRedMessage(message)
        dispatch(deleteBlog())
        dispatch(setBlogs(updatedBlogs))

      } catch (error) {
        console.error('Error deleting blog:', error)
      }
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    borderRadius: 3,
  }

  const deleteButtonToShow = user && blog && user.name === blog.user.name ? (
    <button
      data-cy="deleteBlog"
      onClick={handleDelete}
      style={{ backgroundColor: 'blue', color: 'whitesmoke' }}
    >
      delete
    </button>
  ) : null

  console.log(user)
  console.log(user.name)
  console.log(blog)



  return (
    <div  style={blogStyle} className='blog' >
      <ListGroup variant="flush" >
        <div style={hideBlogInfo} className="blog-info-hidden">
          {blog.title}.
          <div className="d-grid gap-2">
            <Button
              onClick={() => setSee(true)}
              className='viewInfoButton'
              data-cy="view info"
              size="sm"
            >
          view info
            </Button>
          </div>
        </div>
        <div style={showBlogInfo} className="blog-info-visible">
          <ListGroup.Item className='bg-primary text-white'>
          Blog title: {blog.title}.
          </ListGroup.Item>
          <ListGroup.Item className='bg-info text-white'>
          Author: {blog.author}
          </ListGroup.Item>
          <ListGroup.Item className="d-flex justify-content-start bg-primary text-white" data-cy="likesCount">
            <span className="me-3">Likes: {blog.likes}</span>
            <Button data-cy="likeButton" variant="warning" className='likesButton' size="sm" onClick={handleLike}>like</Button>

          </ListGroup.Item>


          <ListGroup.Item className='bg-info text-white'>
            <strong>Added by:</strong>
            {blog.user ? blog.user.name : 'Unknown User'}
          </ListGroup.Item>

          {/*  */}
          <button
            onClick={() => setSee(false)}
            style={{ backgroundColor: 'red', color: 'whitesmoke' }}
          >
          hide info
          </button> {}

          {deleteButtonToShow}


          <DisplayRedMessage message={redMessage} />
        </div>
      </ListGroup>
    </div>
  )
}

export { Blog }
