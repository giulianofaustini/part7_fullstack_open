import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'



export const ListOfUsers = () => {

  const [userList, setuserList] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    axios.get('http://localhost:3003/api/users')
      .then((response) => {
        const data = response.data
        setuserList(data)
        console.log('this is the userlist in listOfUser',data)
      })
  }, [])


  return (
    <div>
      <h1>users</h1>
      {userList && (
        userList.map((user) => (
          <div key={user.id}>
            <Link to={`/users/${user.id}`}> {user.name} has {user.blogs.length} blogs</Link>
          </div>

        ))
      )}

      <button onClick={() => navigate('/')}>back</button>
    </div>
  )
}

