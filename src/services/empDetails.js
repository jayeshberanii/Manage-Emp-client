import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3001/api'
});

export const addEmpDetails=async(payload)=>{
    await instance.post('/empdata',payload)
}
export const getEmpDetails=async()=>{
    const response=await instance.get('/empdata')
    return response.data;
}