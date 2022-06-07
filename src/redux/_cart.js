import { createSlice } from '@reduxjs/toolkit' //import

export const cartSlice = createSlice({ //config
  name: 'cart',
  initialState: {
    cart: null, // Gia tri mac dinh ban dau cua cart
    //Muốn thêm trường j để lưu vào redux thì khai báo ở đây ví dụ
    // token:"",
    totalQuantity: 0,
  },
  reducers: {
    setCart: (state, action) => { //state cũ, action chứa các giá trị mà người ta truyền vào
        state.cart = action.payload;
    },
    removeCart: (state) => {
        state.cart = null;
    }
  }
})

// Action creators are generated for each case reducer function
export const { setCart, removeCart } = cartSlice.actions //export
export default cartSlice.reducer