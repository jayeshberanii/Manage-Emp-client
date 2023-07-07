import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Input } from '@mui/material';
import * as XlSX from 'xlsx'
import { addEmpDetails } from '../../../services/empDetails';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export default function EmpModal({ handleClose, open }) {

    const[file,setFile]=React.useState()
    const[error,setError]=React.useState()
    const[excelData,setExcelData]=React.useState()

    const handleOnchange=(e)=>{
        let selectedFile=e.target.files[0]
        console.log(selectedFile.name);
        let fileTypes=['application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
        if(selectedFile){
            if(fileTypes.includes(selectedFile.type)){
                setError(null)
                document.getElementById('file-name').innerHTML=selectedFile.name
                let reader=new FileReader()
                reader.readAsArrayBuffer(selectedFile)
                reader.onload=(e)=>{
                    setFile(e.target.result)
                }
            }else{
                setError("Please Upload .xlsx file!!")
                setFile(null)
            }
        }else{
            console.log("please select file!!");
        }
    }

    const submitHandler=()=>{
        if(file!==null){
            const workbook=XlSX.read(file,{type:"buffer"})
            const sheetName=workbook.SheetNames[0]
            const sheet=workbook.Sheets[sheetName]
            const data=XlSX.utils.sheet_to_json(sheet)
            console.log("excelData:::",data);
            addEmpDetails(data)
            setExcelData(data)
        }
    }

    return (
        <div>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <div>
                    <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                        <b>Import Items</b>
                    </BootstrapDialogTitle>
                    <DialogContent dividers>
                        <div>
                            <div className='error-message'>
                                {
                                    error
                                }
                            </div>
                            <div className='upload-section flex items-center justify-center'>
                                <Button variant='outlined'>
                                    <Input id='raised-button-file' onChange={handleOnchange}  style={{ display: "none" }} type='file' hidden={true} />
                                    <label htmlFor="raised-button-file">
                                        Select files
                                    </label>                                    
                                </Button>
                                <div id="file-name"></div>
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions className='justify-between'>
                    <Button variant="outlined" color="error" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant='contained' autoFocus onClick={submitHandler}>
                            Import
                        </Button>
                    </DialogActions>
                </div>
            </BootstrapDialog>
        </div>
    );
}