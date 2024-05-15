import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: '',
    email: '',
    isLoading: false, //optional
    isLogin: null,
  },
  reducers: {
    loginUser: (state, action) => {
      state.name = action.payload.name
      state.email = action.payload.email
      state.isLogin = true
    },
    clearUser: (state) => {
      state.name = ''
      state.email = ''
      state.isLogin = false
    },
  },
})

export const { loginUser, clearUser } = userSlice.actions
export default userSlice.reducer
