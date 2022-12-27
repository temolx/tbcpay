import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import { IconButton, Menu, MenuItem } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';

function Table({ data, setData, setDialogOpen, setDefaultData }) {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const settingsOpen = Boolean(anchorEl);
    const [anchorIndex, setAnchorIndex] = useState(0);

    const handleEdit = () => {
        setDefaultData(data[anchorIndex]);
        setDialogOpen(true);
        // console.log(data[anchorIndex]);
    }

    const handleDelete = () => {
        const filteredData = data.filter((el) => {
            return el[2] !== data[anchorIndex][2]; // gets deleted according to ID
        })
        setData(filteredData);
        // console.log(data[anchorIndex]);
    }

    const columns = [
        { name: "სახელი", options: { filter: true, filterType: 'textField' } },
    
        { name: "გვარი", options: { filter: true, filterType: 'textField'} },
        { name: "პირადი ნომერი", options: { filter: true, filterType: 'textField'} },
        { name: "სქესი", options: { filter: true, filterType: 'dropdown', filterOptions: {
            names: ['მამრობითი', 'მდედრობითი']
        }} },

        { name: "დაბადების თარიღი", options: { filter: false }},
        { name: "დაბადების ადგილი", options: { filter: true, filterType: 'textField'} },
        { name: "მისამართი", options: { filter: true, filterType: 'textField'} },
        {
            options: {
                filter: false,
                sort: false,
                customBodyRenderLite: (dataIndex) => {
                    return (
                        <div>
                            <IconButton 
                            size="small"
                            aria-controls={settingsOpen ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={settingsOpen ? 'true' : undefined}
                            onClick={(e) => { setAnchorEl(e.currentTarget); setAnchorIndex(dataIndex) }}
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
                                <MenuItem onClick={handleEdit}>რედაქტირება</MenuItem>
                                <MenuItem onClick={handleDelete}>წაშლა</MenuItem>
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
        selectableRows: false,
        responsive: 'standard', // vertical (default), standard, simple
        customToolbar: () => {
            return (
                <IconButton size="small" onClick={() => { setDialogOpen(true); setDefaultData([]) }}><AddIcon /></IconButton>
            )
        }
    }

  return (
    <div className="table-container">
        <MUIDataTable
            data={data}
            columns={columns}
            options={options}
        />
    </div>
  )
}

export default Table;
