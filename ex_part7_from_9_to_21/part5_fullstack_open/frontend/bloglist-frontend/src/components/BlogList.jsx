
import React from 'react'
import { Blog } from './Blog'
import { Table } from 'react-bootstrap'

const BlogList = ({ blogs, setBlogs, handleRedMessage, redMessage, user }) => {
  return (
    <div>
      <h2>The blogs in the list</h2>
      <Table striped>
        <tbody>
          <ul  style={{ listStyleType: 'none' }}>
            {blogs &&
          [...blogs]
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <li data-cy="blogs" key={blog.id}>
                <Blog
                  blog={blog}
                  blogs={blogs}
                  setBlogs={setBlogs}
                  handleRedMessage={handleRedMessage}
                  redMessage={redMessage}
                  user={user}
                />
              </li>
            ))}
          </ul>
        </tbody>
      </Table>
    </div>
  )
}

export default BlogList
