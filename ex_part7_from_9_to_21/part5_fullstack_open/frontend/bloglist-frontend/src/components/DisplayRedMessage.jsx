import React from 'react'
import '../index.css'
import { useSelector } from 'react-redux'



export const DisplayRedMessage = () => {
  const redMessage = useSelector(state => state.notifications.redMessage)

  if (!redMessage) {
    return null
  }

  return (
    <div className='redMessage'>{redMessage}</div>
  )
}



