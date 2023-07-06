import React, { useState } from 'react'
import EmpDataTable from './EmpDataPageComponents/EmpDataTable'
import { AiOutlinePlus } from "react-icons/ai"
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import EmpModal from './EmpDataPageComponents/EmpModal';

const EmpDataPageLayout = () => {
  const [open, setOpen] = useState(false);
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
          <AddIcon className='plus-icon'/>
        </Button>
      </div>
      <div className='sub-menu flex items-center justify-between'>
        <h3>Employee details</h3>
        <span>icons</span>
      </div>
      <EmpDataTable />      
    </div>
    <EmpModal handleClose={handleClose} open={open}/>
    </>
  )
}

export default EmpDataPageLayout