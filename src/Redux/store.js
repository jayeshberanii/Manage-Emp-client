import {configureStore} from '@reduxjs/toolkit'
import EmpDataSlice from './Slices/EmpDataSlice'

const store=configureStore({
    reducer:{
        empData:EmpDataSlice
    }
})

export default store