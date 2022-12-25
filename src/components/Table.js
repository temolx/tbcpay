import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import { TextField, IconButton } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import EditIcon from '@mui/icons-material/Edit';

function Table() {

    const[value, setValue] = useState();

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
        { name: "რედაქტირება", options: { filter: false} }
        ]
    
    const data = [
        ["Nina", "Willams", "01024085560", "მდედრობითი", "11/23/1999", "ირლანდია", "ირ. ქუჩა 40", (<IconButton size="small"><EditIcon /></IconButton>)],
        ["Anna", "Willams", "01024085560", "მდედრობითი", "05/04/1998", "ირლანდია", "ირ. ქუჩა 40", (<IconButton size="small"><EditIcon /></IconButton>)],
        ["David", "Lynch", "01024085560", "მამრობითი", "12/02/1995", "USA", "Mulholland Drive", (<IconButton size="small"><EditIcon /></IconButton>)],
    ]
    
    const options = {
        filterType: 'checkbox',
        textLabels: {
            pagination: {
                rowsPerPage: 'მწკრივების რაოდენობა გვერდზე'
            }
        },
        searchPlaceholder: 'ძიება',
        draggableColumns: {
            enabled: true
        },
        responsive: 'standard', // vertical (default), standard, simple
    }

  return (
    <div>
        <MUIDataTable
            data={data}
            columns={columns}
            options={options}
            labelRowsPerPage={'my text'}
        />

    </div>
  )
}

export default Table;
