import React, { useEffect, useState } from 'react'
import EmpDataTable from './EmpDataPageComponents/EmpDataTable'
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import EmpModal from './EmpDataPageComponents/EmpModal';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmpData } from '../../Redux/Slices/EmpDataSlice';
import { deleteEmpDetails } from '../../services/empDetails';

const EmpDataPageLayout = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([])
  const empData = useSelector((state) => state.empData.data)
  const isLoading = useSelector((state) => state.empData.isLoading)
  const error = useSelector((state) => state.empData.error)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchEmpData())
  }, [])
  useEffect(() => {
    setData(empData)
  }, [empData])
  if (isLoading) {
    console.log("is loading:::");
  }
  if (error) {
    console.log("error::");
  }
  if (data) {
    console.log("data", data);
  }
  const handleDeleteClick = (data) => () => {
    deleteEmpDetails(data.row._id)
      .then(res => {
        console.log("Deleted Success::::")
        dispatch(fetchEmpData())
      })
      .catch(err => console.log(err.message))
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  return (
    <>
      <div className='container'>
        <div className='flex justify-between'>
          <h2 className='title'>Employee Details</h2>
          <Button onClick={handleClickOpen} variant='outlined' className='add-button'>
            <AddIcon className='plus-icon' />
          </Button>
        </div>
        <div className='sub-menu flex items-center justify-between'>
          <h3>Employee details</h3>
          <span>icons</span>
        </div>
        <EmpDataTable data={data} loading={isLoading} handleDeleteClick={handleDeleteClick} />
      </div>
      <EmpModal handleClose={handleClose} open={open} />
    </>
  )
}

export default EmpDataPageLayout