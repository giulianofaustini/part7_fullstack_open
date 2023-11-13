import { useEffect, useState } from 'react'
import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

export const SingleUserBlogToShow = () => {

  const [getSingleUser, setGetSingleUser] = useState([])



  const id  = useParams().id
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('http://localhost:3003/api/users')
      .then((response) => {
        const data = response.data
        setGetSingleUser(data)
        console.log('this is the DATA userlist in SingleUserBlogToShow', data)
      })
  }, [id])

  if (!getSingleUser) {
    return <div>Loading...</div>
  }


  const singleUserId = getSingleUser && getSingleUser.find(user => user.id === id)

  console.log('ID for single user:', singleUserId)
  console.log('ID from params:', id)
  // console.log('name:', singleUser ? singleUser.name : 'Loading...')

  if(!singleUserId) {
    return  <div>not found</div>
  }

  return (
    <>
      {singleUserId && (
        <div>
          <h2>{singleUserId.name}</h2>
          <button onClick={() => navigate('/users')}>back</button>
          {singleUserId.blogs.map((blog) => (
            <div key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>
                <p>Title: {blog.title}</p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

