import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import { TextField, IconButton, Menu, MenuItem } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function Table({ data, setData, setDialogOpen, setDefaultData }) {

    const[value, setValue] = useState();
    
    const [anchorEl, setAnchorEl] = React.useState(null);
    const settingsOpen = Boolean(anchorEl);

    const handleEdit = (formData) => {
        setDefaultData(formData);
        setDialogOpen(true);

        console.log(formData);
    }

    const handleDelete = (formData) => {
        const filteredData = data.filter((el) => {
            return el[2] !== formData[2]; // gets deleted according to ID
        })
        
        setData(filteredData);
        console.log(formData);
    }

    const columns = [
        { name: "სახელი", options: { filter: true, filterType: 'textField' } },
    
        { name: "გვარი", options: { filter: true, filterType: 'textField'} },
        { name: "პირადი ნომერი", options: { filter: true, filterType: 'textField'} },
        { name: "სქესი", options: { filter: true, filterType: 'dropdown', filterOptions: {
            names: ['მამრობითი', 'მდედრობითი']
        }} },
        { name: "დაბადების თარიღი", options: { filter: true, filterType: 'custom', 
        customFilterListOptions: {
            render: (v) => {
                console.log(v)
            }
        },
        
        filterOptions: {
            logic: (date, filters) => {
                if (filters.includes(date)) {
                    return true
                } else return false
            },
            display: (filterList, onChange, index, column) => { return (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                    label="დაბადების თარიღი"
                    value={filterList[index]}
                    onChange={(newValue) => {
                        setValue(newValue);
                        filterList[index] = newValue;
                        onChange(filterList[index], index, column);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            ) }
        }} }, 
        { name: "დაბადების ადგილი", options: { filter: true, filterType: 'textField'} },
        { name: "მისამართი", options: { filter: true, filterType: 'textField'} },
        {
            options: {
                filter: false,
                sort: false,
                customBodyRenderLite: (dataIndex, rowIndex) => {
                    return (
                        <div>
                            <IconButton 
                            size="small"
                            aria-controls={settingsOpen ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={settingsOpen ? 'true' : undefined}
                            onClick={(e) => setAnchorEl(e.currentTarget)}
                            ><MoreVertIcon /></IconButton>

                            <Menu
                            MenuListProps={{
                            'aria-labelledby': 'basic-button',
                            }}
                            id="basic-menu"
                            open={settingsOpen}
                            anchorEl={anchorEl}
                            onClose={() => setAnchorEl(null)}
                            >
                                <MenuItem onClick={() => handleEdit(data[dataIndex])}>რედაქტირება</MenuItem>
                                <MenuItem onClick={() => handleDelete(data[dataIndex])}>წაშლა</MenuItem>
                            </Menu>
                        </div>
                    )
                }
            }
            }
        ]
    
    const options = {
        filterType: 'checkbox',
        textLabels: {
            pagination: {
                rowsPerPage: 'მწკრივების რაოდენობა გვერდზე'
            },
            filter: {
                all: 'ყველა',
                title: 'გაფილტვრა',
                reset: 'გადატვირთვა'
            }
        },
        searchPlaceholder: 'ძიება',
        draggableColumns: {
            enabled: true
        },
        responsive: 'standard', // vertical (default), standard, simple
        customToolbar: () => {
            return (
                <IconButton size="small" onClick={() => { setDialogOpen(true); setDefaultData([]) }}><AddIcon /></IconButton>
            )
        }
    }

  return (
    <div>
        <MUIDataTable
            data={data}
            columns={columns}
            options={options}
        />

    </div>
  )
}

export default Table;
