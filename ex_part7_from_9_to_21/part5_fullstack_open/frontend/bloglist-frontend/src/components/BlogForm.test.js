import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddBlog from './AddBlog'




test('calls the event handler with the right details on blog creation', () => {
  const mockCreateBlog = jest.fn()
  render(<AddBlog createBlog={mockCreateBlog} />)

  const titleInput = screen.getByPlaceholderText('write title')
  const authorInput = screen.getByPlaceholderText('write author')
  const urlInput = screen.getByPlaceholderText('write url')
  const createButton = screen.getByText('create')

  userEvent.type(titleInput, 'Testing Blog Title')
  userEvent.type(authorInput, 'Test Author')
  userEvent.type(urlInput, 'http://example.com')
  userEvent.click(createButton)

  waitFor(() => {
    console.log('Title Input After:', titleInput.value)
    console.log('Author Input After:', authorInput.value)
    console.log('URL Input After:', urlInput.value)

    expect(mockCreateBlog).toHaveBeenCalledTimes(1)
    expect(mockCreateBlog).toHaveBeenCalledWith({
      title: 'Testing Blog Title',
      author: 'Test Author',
      url: 'http://example.com',
    })
  })
})

