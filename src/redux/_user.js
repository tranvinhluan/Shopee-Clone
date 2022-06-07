import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
        state.user = action.payload;
    },
    removeUser: (state) => {
        state.user = null;
    }
  }
})

// Action creators are generated for each case reducer function
export const { setUser, removeUser } = userSlice.actions
export default userSlice.reducer