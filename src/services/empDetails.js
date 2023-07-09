import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3001/api'
});

export const addEmpDetails=async(data)=>{
    await instance.post('/empdata',data)
}
export const getEmpDetails=async()=>{
    const response=await instance.get('/empdata')
    return response.data;
}
export const updateEmpDetails=async(id,data)=>{
    if(id === undefined) return addEmpDetails(data)
    const response=await instance.put(`/empdata/${id}`,data)
    return response.data;
}
export const deleteEmpDetails=async(id)=>{
    const response=await instance.delete(`/empdata/${id}`)
    return response.data;
}