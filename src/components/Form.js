import React, { useState } from 'react'
import { TextField, Typography, Button, MenuItem, Grid, IconButton, createTheme, ThemeProvider } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { useForm, Controller } from "react-hook-form";

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function Form({ data, setData, setDialogOpen, defaultData }) {

    const { register, handleSubmit, formState: { errors }, control, reset }  = useForm();

    const[dateValue, setDateValue] = useState(new Date());
    const[gender, setGender] = useState();

    const theme = createTheme({
        palette: {
            primary: {
                main: '#00A5E6',
                contrastText: '#FFF'
            }
        }
    })

  return (
    <ThemeProvider theme={theme}>
    <form onSubmit={handleSubmit((newData) => {
        if (!data.some((el) => el[2] === newData.id) && defaultData.length === 0) { // user doesn't exist yet (add)
            setData([...data, [newData.firstName, newData.lastName, newData.id, newData.gender, `${newData.birthdate.$M + 1}/${newData.birthdate.$D}/${newData.birthdate.$y}`, newData.birthplace, newData.address]]);
        }
        else { // user already exists (edit)
            setData(data.map((el) => {
                if (el[2] === defaultData[2]) {
                    return [newData.firstName, newData.lastName, newData.id, newData.gender, `${newData.birthdate.$M + 1}/${newData.birthdate.$D}/${newData.birthdate.$y}`, newData.birthplace, newData.address];
                } else return data
            }));
        }

        reset();
        setDialogOpen(false)
    })}>
        <Grid container spacing={1}>
            <Grid item xs={11}><Typography variant="h5">ველის დამატება</Typography></Grid>
            <Grid item xs={1}><IconButton style={{ float: 'right' }} onClick={() => setDialogOpen(false)}><CloseIcon /></IconButton></Grid>

            <Grid item xs={12}><TextField defaultValue={defaultData.length !==0 ? defaultData[0] : null} id="outlined-basic" label="სახელი" variant="outlined" fullWidth margin="normal" {...register("firstName", { required: true } )} /></Grid>
            <Grid item xs={12}><TextField defaultValue={defaultData.length !==0 ? defaultData[1] : null} id="outlined-basic" label="გვარი" variant="outlined" fullWidth margin="normal" {...register("lastName", { required: true })} /></Grid>
            <Grid item xs={12}><TextField defaultValue={defaultData.length !==0 ? defaultData[2] : null} id="outlined-basic" label="პირადი ნომერი" variant="outlined" fullWidth margin="normal" {...register("id", { required: true, minLength: 11 })} /></Grid>

            <Grid item xs={12}>
                <TextField defaultValue={defaultData.length !==0 ? defaultData[3] : null} select value={gender} label="სქესი" name="სქესი" fullWidth {...register("gender", { required: true })} sx={{ mt: 2, mb: 2 }}>
                    <MenuItem value="მამრობითი" onClick={(e) => setGender(e.target.value)}>მამრობითი</MenuItem>
                    <MenuItem value="მდედრობითი" onClick={(e) => setGender(e.target.value)}>მდედრობითი</MenuItem>
                </TextField>
            </Grid>

            <Grid item xs={12}>
                <Controller 
                name="birthdate" 
                defaultValue={dateValue}
                rules={{ required: true }}
                control={control} 
                render={({ field: { onChange, ...restField } }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                    label="დაბადების თარიღი"
                    onChange={(newValue) => {
                        onChange(newValue);
                        setDateValue(newValue);
                    }}
                    inputFormat="MM.DD.YYYY"
                    renderInput={(params) => (
                        <TextField {...params} fullWidth />
                    )}
                    {...restField}
                    />
                    </LocalizationProvider>
                )} />
            </Grid>

            <Grid item xs={12}><TextField defaultValue={defaultData.length !==0 ? defaultData[5] : null} id="outlined-basic" label="დაბადების ადგილი" variant="outlined" fullWidth margin="normal" {...register("birthplace", { required: true })} /></Grid>
            <Grid item xs={12}><TextField defaultValue={defaultData.length !==0 ? defaultData[6] : null} id="outlined-basic" label="მისამართი" variant="outlined" fullWidth margin="normal" {...register("address", { required: true })} /></Grid>

            <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">შენახვა</Button>
            </Grid>
        </Grid>
    </form>
    </ThemeProvider>
  )
}

export default Form