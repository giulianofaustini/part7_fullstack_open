import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import Card from 'react-bootstrap/Card'


export const SelectedBlogToShow = () => {

  const [selectedBlogs, setSelectedBlogs] = useState([])
  const [newComment, setNewComment] = useState('')

  const id = useParams().id
  //   console.log('id from params in single blog', id)
  const navigate = useNavigate()


  useEffect(() => {
    axios.get('http://localhost:3003/api/blogs')
      .then((response) => {
        const containsAllBlogs = response.data
        console.log('this is the contains all blogs line 20', containsAllBlogs)
        setSelectedBlogs(containsAllBlogs)
        // console.log('from selectedBlogs that show containsAllBlogs', containsAllBlogs)
      })
  }, [id])

  if(!setSelectedBlogs) {
    return <div>Loading...</div>
  }

  const oneBlog = selectedBlogs && selectedBlogs.find((blog) => blog.id === id)

  console.log('the only one blog selected is', oneBlog)

  const handleCommentSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post(`http://localhost:3003/api/blogs/${id}/comments`, { comment: newComment })
      const updatedResponse = response.data
      //   console.log('This is the updated response', updatedResponse )
      setSelectedBlogs([updatedResponse])
      setNewComment('')

      const updatedResponseServer = await axios.get(`http://localhost:3003/api/blogs/${id}`)
      setSelectedBlogs([updatedResponseServer.data])

    } catch (error) {
      console.error('Error adding comment:', error)
    }
  }


  return (
    <>

      { oneBlog && (

        <div>
          <button onClick={() => navigate('/users')}>back</button>
          <Card border="warning" style={{ width: '60rem' }} >
            <Card.Body  className='bg-secondary  text-white'>
              <Card.Title>{oneBlog.title} </Card.Title>
              <Card.Subtitle >{oneBlog.url}</Card.Subtitle>
              <br />
              <Card.Subtitle >Likes: {oneBlog.likes}</Card.Subtitle>
              <Card.Text>
              Added by {oneBlog.user.name}
              </Card.Text>

            </Card.Body>
          </Card>
          <h4>Add you comment</h4>
          <form onSubmit={handleCommentSubmit}>
            <input value={newComment} type="text" onChange={(e) => setNewComment(e.target.value) }/>
            <button type='submit'>add here</button>
          </form>
          <h3>Comments</h3>
          <div>
            {oneBlog.comments.map((comment) => (
              <div key={comment._id}>{comment.comment}</div>
            ))}
          </div>

        </div>
      )}

    </>
  )
}
