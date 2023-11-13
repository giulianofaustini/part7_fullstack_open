import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  greenMessage: '',
  redMessage: '',
}


const notificationSlice = createSlice({
  name: 'notifications',
  initialState,

  reducers: {
    setGreenMessage: (state, action) => {
      state.greenMessage = action.payload
    },
    setRedMessage: (state, action) => {
      state.redMessage = action.payload
    }
  }

})

export const { setGreenMessage, setRedMessage } = notificationSlice.actions

export default notificationSlice.reducer