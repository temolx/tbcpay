import React, { useState } from 'react'
import { TextField, Typography, Button, MenuItem, Grid, IconButton, createTheme, ThemeProvider } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { useForm, Controller } from "react-hook-form";

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function Form({ data, setData, setDialogOpen, defaultData }) {

    const { register, handleSubmit, formState: { errors }, setError, clearErrors, control, reset }  = useForm();

    let todayDate = new Date();

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
        if (defaultData.length === 0) { // user doesn't exist yet (add)
            setData([...data, [newData.firstName, newData.lastName, newData.id, newData.gender, `${newData.birthdate.$d.getMonth() + 1}/${newData.birthdate.$d.getDate()}/${newData.birthdate.$d.getFullYear()}`, newData.birthplace, newData.address]]);
        }
        else { // user doesn't yet exist (edit)
            setData(data.map((el, index) => {
                console.log(newData)
                if (el[2] === defaultData[2]) {
                    return [newData.firstName, newData.lastName, newData.id, newData.gender, !newData?.birthdate?.$d ? `${newData.birthdate.getMonth() + 1}/${newData.birthdate.getDate()}/${newData.birthdate.getFullYear()}` : `${newData?.birthdate?.$d?.getMonth() + 1}/${newData.birthdate.$d.getDate()}/${newData.birthdate.$d.getFullYear()}`, newData.birthplace, newData.address];
                } else return data[index]
            }));
        }

        reset();
        setDialogOpen(false)
    })}>
        <Grid container spacing={1}>
            <Grid item xs={11}><Typography variant="h5">ველის დამატება</Typography></Grid>
            <Grid item xs={1}><IconButton style={{ float: 'right' }} onClick={() => setDialogOpen(false)}><CloseIcon /></IconButton></Grid>

            <Grid item xs={12}><TextField defaultValue={defaultData.length !==0 ? defaultData[0] : null} id="outlined-basic" label="სახელი" variant="outlined" fullWidth margin="normal" {...register("firstName", { required: true } )} error={Boolean(errors.firstName)} helperText={errors.firstName ? "სახელი სავალდებულოა" : null} /></Grid>

            <Grid item xs={12}><TextField defaultValue={defaultData.length !==0 ? defaultData[1] : null} id="outlined-basic" label="გვარი" variant="outlined" fullWidth margin="normal" {...register("lastName", { required: true })} error={Boolean(errors.lastName)} helperText={errors.lastName ? "გვარი სავალდებულოა" : null} /></Grid>
            <Grid item xs={12}><TextField defaultValue={defaultData.length !==0 ? defaultData[2] : null} id="outlined-basic" label="პირადი ნომერი" variant="outlined" fullWidth margin="normal" {...register("id", { required: true, minLength: 11 })} error={Boolean(errors.id) || errors?.userExists} helperText={errors?.id?.type === "required" ? "პირადი ნომერი სავალდებულოა" : (errors?.id?.type === "minLength" ? "პირადი ნომერი უნდა შედგებოდეს მინიმუმ 11 ციფრისგან" : (errors?.userExists ? errors?.userExists?.message : null))} onChange={(e) => {
                if(data.some((el) => el[2] === e.target.value)) {
                    setError("userExists", { type: "focus", message: "მომხმარებელი უკვე არსებობს"});
                } else clearErrors();
            }} /></Grid>

            <Grid item xs={12}>
                <TextField defaultValue={defaultData.length !==0 ? defaultData[3] : null} select value={gender} label="სქესი" name="სქესი" fullWidth {...register("gender", { required: true })} sx={{ mt: 2, mb: 2 }} error={Boolean(errors.gender)} helperText={errors.gender ? "სქესი სავალდებულოა" : null}>
                    <MenuItem value="მამრობითი" onClick={(e) => setGender(e.target.value)}>მამრობითი</MenuItem>
                    <MenuItem value="მდედრობითი" onClick={(e) => setGender(e.target.value)}>მდედრობითი</MenuItem>
                </TextField>
            </Grid>

            <Grid item xs={12}>
                <Controller 
                name="birthdate"
                defaultValue={defaultData.length !== 0 ? new Date(defaultData[4]) : null}
                rules={{ required: true }}
                control={control} 
                render={({ field: { onChange, ...restField } }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                    label="დაბადების თარიღი"
                    id="birthdate"
                    onChange={(newValue) => {
                        console.log(newValue.$d)
                        if (newValue.$d > todayDate) { // invalid date
                            setError("invalidDate", { type: "focus", message: "დაბადების თარიღი არ უნდა აღემატებოდეს მიმდინარე თარიღს"})
                        }
                        else { // valid date
                            onChange(newValue);
                            clearErrors();
                        }
                    }}
                    inputFormat="MM.DD.YYYY"
                    renderInput={(params) => (
                        <TextField {...params} fullWidth error={errors.birthdate || errors?.invalidDate} helperText={errors?.invalidDate ? errors?.invalidDate?.message : (errors.birthdate ? "დაბადების თარიღი სავალდებულოა" : null)} />
                    )}
                    {...restField}
                    />
                    </LocalizationProvider>
                )} />
            </Grid>

            <Grid item xs={12}><TextField defaultValue={defaultData.length !==0 ? defaultData[5] : null} id="outlined-basic" label="დაბადების ადგილი" variant="outlined" fullWidth margin="normal" {...register("birthplace", { required: true })} error={Boolean(errors.birthplace)} helperText={errors.birthplace ? "დაბადების ადგილი სავალდებულოა" : null} /></Grid>
            <Grid item xs={12}><TextField defaultValue={defaultData.length !==0 ? defaultData[6] : null} id="outlined-basic" label="მისამართი" variant="outlined" fullWidth margin="normal" {...register("address", { required: true })} error={Boolean(errors.address)} helperText={errors.address ? "მისამართი სავალდებულოა" : null} /></Grid>

            <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">შენახვა</Button>
            </Grid>
        </Grid>
    </form>
    </ThemeProvider>
  )
}

export default Form