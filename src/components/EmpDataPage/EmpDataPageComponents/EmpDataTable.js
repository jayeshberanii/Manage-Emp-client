import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridActionsCellItem, GridToolbar, GridRowModesModel, GridRowModes } from '@mui/x-data-grid';
import { Button, Modal, Stack, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { deleteEmpDetails, updateEmpDetails } from '../../../services/empDetails';
import {useDispatch} from 'react-redux';
import { fetchEmpData } from '../../../Redux/Slices/EmpDataSlice';

export default function EmpDataTable({ data, loading,handleDeleteClick }) {
    const [nbRows, setNbRows] = React.useState(3);
    const [rows, setRows] = React.useState([])
    const [rowModesModel, setRowModesModel] = React.useState({})
    const dispatch=useDispatch()
    React.useEffect(() => {
        if (data.length > 0) {
            const ROW_ITEMS = data.map(({ EmployeeID: id, ...rest }) => {
                return { id, ...rest }
            })
            setRows(ROW_ITEMS)
        }
    }, [data])
    const handleEditClick = ({id}) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };
    

    const columns = [
        { field: 'id', headerName: 'ID', width: 50 },
        {
            field: 'EmployeeName',
            headerName: 'Name',
            width: 110,
            type: "string",
            editable: true,
        },
        {
            field: 'Designation',
            headerName: 'Designation',
            width: 110,
            type: "string",
            editable: true,
        },
        {
            field: 'SalaryDetails',
            headerName: 'Salary',
            type: 'number',
            width: 110,
            editable: true,
        },
        {
            field: 'Address',
            headerName: 'Location',
            width: 110,
            type: 'string',
            editable: true,
        },
        {
            field: 'EmployeeStatus',
            headerName: 'Status',
            width: 110,
            type: 'string',
            editable: true,
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: (id ) => {
                return [<GridActionsCellItem
                    icon={<EditIcon />}
                    label="Edit"
                    className="textPrimary"
                    onClick={handleEditClick(id)}
                    color="inherit"
                />,
                <GridActionsCellItem
                    icon={<DeleteIcon />}
                    label="Delete"
                    onClick={handleDeleteClick(id)}
                    color="inherit"
                />]
            }
        }

    ];
    // const COL_ITEMS=Object.keys(data[0])
    // const columns=COL_ITEMS.map((item)=>({
    //     field: item,
    //     headerName: item,
    //     width: 110,
    //     editable: true,
    // }))
    const handleClick = () => {
        const id = Math.floor(Math.random() * 1000)
        setRows((oldRows) => [{ id, EmployeeName: '', Designation: '', SalaryDetails: '', EmployeeStatus: '', isNew: true }, ...oldRows,]);
    };
    return (
        <div className='data-grid'>
            <Box sx={{ height: 400, width: '100%' }}>
                <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                    <Button size="small" onClick={handleClick}>
                        Add New Employee
                    </Button>
                </Stack>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    pageSizeOptions={[5]}
                    editMode="row"
                    checkboxSelection
                    GridRowModesModel={rowModesModel}
                    loading={loading}
                    disableRowSelectionOnClick
                    onRowEditStop={(params, event) => {
                        console.log(params);
                        updateEmpDetails(params.row._id,params.row)
                    }}
                    slots={{
                        toolbar: GridToolbar,
                    }}
                />
            </Box>
        </div>
    );
}