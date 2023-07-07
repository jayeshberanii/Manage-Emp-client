import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getEmpDetails } from '../../services/empDetails'

export const fetchEmpData = createAsyncThunk(
  'employee/getData',
  async () => {
    const data = await getEmpDetails()
    return data
  }
)

const empSlice = createSlice({
  name: "empSlice",
  initialState: {
    data: [],
    isLoading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchEmpData.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchEmpData.fulfilled, (state, action) => {
      state.isLoading = false
      state.data = action.payload
    })
    builder.addCase(fetchEmpData.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
  }
})

export default empSlice.reducer