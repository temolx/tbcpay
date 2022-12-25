import React, { useState } from 'react'
import { TextField, Typography, Button, MenuItem, Grid, IconButton, createTheme, ThemeProvider } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { useForm, Controller } from "react-hook-form";

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function Form() {

    const { register, handleSubmit, formState: { errors }, control }  = useForm();

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
    <form onSubmit={handleSubmit((data) => {
        console.log(data);
    })}>
        <Grid container spacing={1}>
            <Grid item xs={11}><Typography variant="h5">ველის დამატება</Typography></Grid>
            <Grid item xs={1}><IconButton style={{ float: 'right' }}><CloseIcon /></IconButton></Grid>

            <Grid item xs={12}><TextField id="outlined-basic" label="სახელი" variant="outlined" fullWidth margin="normal" {...register("firstName", { required: true } )} /></Grid>
            <Grid item xs={12}><TextField id="outlined-basic" label="გვარი" variant="outlined" fullWidth margin="normal" {...register("lastName", { required: true })} /></Grid>
            <Grid item xs={12}><TextField id="outlined-basic" label="პირადი ნომერი" variant="outlined" fullWidth margin="normal" {...register("id", { required: true, minLength: 11 })} /></Grid>

            <Grid item xs={12}>
                <TextField select value={gender} label="სქესი" name="სქესი" fullWidth {...register("gender", { required: true })} sx={{ mt: 2, mb: 2 }}>
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

            <Grid item xs={12}><TextField id="outlined-basic" label="დაბადების ადგილი" variant="outlined" fullWidth margin="normal" {...register("birthplace", { required: true })} /></Grid>
            <Grid item xs={12}><TextField id="outlined-basic" label="მისამართი" variant="outlined" fullWidth margin="normal" {...register("address", { required: true })} /></Grid>
            {/* <input type="submit" /> */}

            <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">შენახვა</Button>
            </Grid>
        </Grid>
    </form>
    </ThemeProvider>
  )
}

export default Form