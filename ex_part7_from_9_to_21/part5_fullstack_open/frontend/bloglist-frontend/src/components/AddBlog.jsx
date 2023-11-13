import { useState } from 'react'
import blogService from '../services/blogs'
import { useSelector, useDispatch } from 'react-redux'
import { addBlog, setBlogs } from '../reducers/blogsReducer'
import { Table, Form, Button } from 'react-bootstrap'


const AddBlog = ({ handleGreenMessage }) => {


  const [newBlogHold, setNewBlogHold] = useState({ title: '', author: '', url: '' })

  const dispatch = useDispatch()

  const handleBlogChange = (event) => {
    event.preventDefault()
    setNewBlogHold({ ...newBlogHold, [event.target.name]: event.target.value })
  }

  const handleCreatedBlog = async (event) => {
    event.preventDefault()
    try {
      const createdBlog = await blogService.create(newBlogHold)
      const updatedBlogs = await blogService.getAll()
      dispatch(addBlog(createdBlog))
      dispatch(setBlogs(updatedBlogs))
      const message = `A new blog ${createdBlog.title} by ${createdBlog.author} has been added to the list.`
      handleGreenMessage(message)
      setNewBlogHold({ title: '', author: '', url: '' })
    } catch (error) {
      console.log('Error creating the blog:', error)
    }
  }


  return (
    <>
      <h1>Create a new blog to share with other users</h1>
      <form onSubmit={handleCreatedBlog}  data-testid="add-blog-form">
        <Form.Group>
          <Button data-cy="create" type="submit">create</Button>
          <div>
            <Form.Control
              type="text"
              name="title"
              id="title"
              value={newBlogHold.title}
              onChange={handleBlogChange}
              data-cy="write title"
              placeholder='Title'
            ></Form.Control>
          </div>
          <div>
            <Form.Control
              type="text"
              id="author"
              name="author"
              value={newBlogHold.author}
              onChange={handleBlogChange}
              data-cy="write author"
              placeholder='Author'
            ></Form.Control>
          </div>
          <div>
            <Form.Control
              type="text"
              name="url"
              id="url"
              value={newBlogHold.url}
              onChange={handleBlogChange}
              data-cy="write url"
              placeholder='Url'
            ></Form.Control>
          </div>

        </Form.Group>
      </form>
    </>
  )
}

export default AddBlog
