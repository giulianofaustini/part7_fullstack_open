import React from 'react'
import '../index.css'
import { useSelector } from 'react-redux'



export const DisplayMessageGreen = () => {
  const greenMessage = useSelector(state => state.notifications.greenMessage)

  if(!greenMessage){
    return null
  }

  return (
    <div className='greenMessage'>{greenMessage}</div>
  )
}

