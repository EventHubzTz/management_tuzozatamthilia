import * as React from 'react'
import { Autocomplete, Avatar, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, InputAdornment, List, ListItem, ListItemAvatar, ListItemText, MenuItem, OutlinedInput, Slide, TextField, Typography, } from '@mui/material'
import { Form, Formik } from 'formik'
import * as Yup from "yup"
import { authPostRequest } from '../services/api-service';
import { DatePicker, DateTimePicker, TimePicker } from '@mui/x-date-pickers';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { CREATE } from '../utils/constant';
import { PaperClipOutlined, XOutlined } from '@ant-design/icons';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

export const FormDialog = ({
    open,
    handleClose,
    dialogTitle,
    action,
    fields,
    values,
    url,
}) => {
    const router = useLocation();
    const { pathname } = router;
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const [value, setValue] = React.useState("");
    const [error, setError] = React.useState("");
    const formInfo = useSelector((state) => state.FormInformationReducer);
    const schema = Yup.object().shape(
        fields.reduce((obj, field) => {
            if (field.type === 'email') {
                if (field.notRequired) {
                    obj[field.name] = Yup.string().email(`${field.label} should be email`)
                        .required(`${field.label} is required`).optional()
                } else {
                    obj[field.name] = Yup.string().email(`${field.label} should be email`)
                        .required(`${field.label} is required`)
                }
            } else {
                if (field.notRequired) {
                    obj[field.name] = Yup.string().min(field.minimumCharacters, `${field.label} minimum is ${field.minimumCharacters} characters`)
                        .required(`${field.label} is required`).optional()
                } else {
                    obj[field.name] = Yup.string().min(field.minimumCharacters, `${field.label} minimum is ${field.minimumCharacters} characters`)
                        .required(`${field.label} is required`)
                }
            }
            return obj
        }, {})
    )
    const [serverError, setServerError] = React.useState("")

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            aria-describedby="form-dialog"
            fullWidth={true}
            maxWidth={"md"}
        >
            <Formik
                initialValues={{ ...values[0] }}
                validationSchema={schema}
                onSubmit={(values, helpers) => {
                    // console.log("onSubmit", JSON.stringify(values, null, 2))
                    let body = values
                    for (let i = 0; i < fields.length; i++) {
                        if (fields[i].type === "date") {
                            body = { ...body, [fields[i].name]: values[fields[i].name].format("DD/MM/YYYY") }
                        } else if (fields[i].type === "dateTime") {
                            body = { ...body, [fields[i].name]: values[fields[i].name].format('YYYY-MM-DD HH:mm:ss.SSS') }
                        } else if (fields[i].type === "number") {
                            body = { ...body, [fields[i].name]: parseInt(values[fields[i].name]) }
                        } else if (fields[i].name === "region" || fields[i].name === "district" || fields[i].name === "ward") {
                            const newValue = fields[i].items.find((item) => item.value === values[fields[i].name]);
                            if (newValue !== undefined) {
                                body = { ...body, [fields[i].name]: newValue.label }
                            }
                        }
                    }
                    body = pathname === "/orders/confirming" && action === CREATE ? { data: [body] } : body
                    authPostRequest(
                        url,
                        body,
                        (data) => {
                            helpers.resetForm()
                            helpers.setSubmitting(false)
                            handleClose()
                        },
                        (error) => {
                            if (error?.response?.data?.message) {
                                setServerError(error.response.data.message[0])
                            } else if (error?.response?.data) {
                                helpers.setErrors(error?.response?.data)
                            }
                            helpers.setSubmitting(false)
                        },
                        fields.some(item => item.type === "file") ? true : false
                    )
                }}
            >
                {({ isSubmitting, values, touched, errors, handleChange, handleBlur, setFieldValue, setValues }) => (
                    <Form
                        noValidate
                        autoComplete="off"
                    >
                        <DialogActions>
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="close"
                                disabled={isSubmitting}
                                onClick={() => {
                                    handleClose()
                                }}
                            >
                                <XOutlined />
                            </IconButton>
                        </DialogActions>
                        <DialogTitle variant='h4'>{`${action} ${dialogTitle}`}</DialogTitle>
                        <DialogContent>
                            {fields.map((field, index) => {
                                if (field.label === "Receiver Ward" && values?.["region"] !== 2) {
                                    return null;
                                }
                                if (field.label === "Receiver Street" && values?.["region"] !== 2) {
                                    return null;
                                }

                                return (
                                    <React.Fragment key={index}>
                                        {field.type === "select" ?
                                            <TextField
                                                id={field.name}
                                                name={field.name}
                                                select
                                                margin='normal'
                                                label={field.label}
                                                value={values[field.name]}
                                                error={Boolean(errors[field.name] && touched[field.name])}
                                                helperText={touched[field.name] && errors[field.name]}
                                                onBlur={handleBlur}
                                                onChange={(event) => {
                                                    setFieldValue(field.name, event.target.value)
                                                    dispatch({
                                                        type: "FORM_INFO",
                                                        payload: {
                                                            ...formInfo,
                                                            [field.name]: event.target.value
                                                        },
                                                    })
                                                }}
                                                fullWidth
                                            >
                                                {field.items.map((item, index) => (
                                                    <MenuItem
                                                        key={index}
                                                        value={item.value}
                                                    >
                                                        {item?.label ? item?.label : item.value}
                                                    </MenuItem>
                                                ))}
                                            </TextField> :
                                            field.type === "file" ?
                                                <OutlinedInput
                                                    id={field.name}
                                                    placeholder={(values[field.name]?.name) || (values[field.name] !== null) ? "" : field.label}
                                                    readOnly
                                                    required={field?.notRequired === false}
                                                    type="text"
                                                    margin="none"
                                                    fullWidth
                                                    error={Boolean(errors[field.name] && touched[field.name])}
                                                    startAdornment={(
                                                        <InputAdornment position="start">
                                                            {(values[field.name]?.name || values[field.name] !== null) &&
                                                                <Chip
                                                                    label={values[field.name]?.name ? values[field.name]?.name : "Image"}
                                                                    onDelete={() => {
                                                                        setValues({ ...values, [field.name]: null })
                                                                    }}
                                                                />
                                                            }
                                                        </InputAdornment>
                                                    )}
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            {(values[field.name]?.name) || (values[field.name] !== null) ?
                                                                <Avatar
                                                                    variant='rounded'
                                                                    alt={values[field.name]?.name}
                                                                    src={values[field.name]?.name ? URL.createObjectURL(values[field.name]) : values[field.name]}
                                                                /> :
                                                                <IconButton
                                                                    aria-label="upload picture"
                                                                    component="label"
                                                                >
                                                                    <input
                                                                        hidden
                                                                        accept="image/*"
                                                                        type="file"
                                                                        onChange={(e) => {
                                                                            e.preventDefault();
                                                                            if (e.target.files) {
                                                                                setValues({ ...values, [field.name]: e.target.files[0] })
                                                                            }
                                                                        }}
                                                                    />
                                                                    <PaperClipOutlined />
                                                                </IconButton>
                                                            }
                                                        </InputAdornment>
                                                    }
                                                    sx={{ mt: 2 }}
                                                /> :
                                                field.type === "date" ?
                                                    <DatePicker
                                                        label={field.label}
                                                        value={values[field.name]}
                                                        onChange={(newValue) => {
                                                            setFieldValue(field.name, newValue)
                                                        }}
                                                        slotProps={{
                                                            textField: {
                                                                margin: "normal",
                                                                error: Boolean(errors[field.name] && touched[field.name]),
                                                                helperText: touched[field.name] && errors[field.name],
                                                                onBlur: handleBlur,
                                                                fullWidth: true
                                                            }
                                                        }}
                                                    /> :
                                                    field.type === "time" ?
                                                        <TimePicker
                                                            label={field.label}
                                                            value={values[field.name]}
                                                            onChange={(newValue) => {
                                                                setFieldValue(field.name, newValue)
                                                            }}
                                                            slotProps={{
                                                                textField: {
                                                                    margin: "normal",
                                                                    error: Boolean(errors[field.name] && touched[field.name]),
                                                                    helperText: touched[field.name] && errors[field.name],
                                                                    onBlur: handleBlur,
                                                                    fullWidth: true
                                                                }
                                                            }}
                                                        /> :
                                                        field.type === "dateTime" ?
                                                            <DateTimePicker
                                                                disablePast
                                                                label={field.label}
                                                                value={values[field.name]}
                                                                onChange={(newValue) => {
                                                                    setFieldValue(field.name, newValue)
                                                                }}
                                                                slotProps={{
                                                                    textField: {
                                                                        margin: "normal",
                                                                        error: Boolean(errors[field.name] && touched[field.name]),
                                                                        helperText: touched[field.name] && errors[field.name],
                                                                        onBlur: handleBlur,
                                                                        fullWidth: true
                                                                    }
                                                                }}
                                                            /> :
                                                            field.type === "search" ?
                                                                <Autocomplete
                                                                    options={options}
                                                                    getOptionLabel={(option) =>
                                                                        `${option[field.searchLabel].toString()}`
                                                                    }
                                                                    filterOptions={(x) => x}
                                                                    noOptionsText={isLoading ? "Loading..." : "No items"}
                                                                    includeInputInList
                                                                    filterSelectedOptions
                                                                    onChange={(event, value) => {
                                                                        if (value) {
                                                                            setFieldValue(field.name, value.id)
                                                                        }
                                                                    }}
                                                                    renderOption={(props, option) => {

                                                                        return (
                                                                            <li {...props}>
                                                                                <List sx={{ width: "100%" }}>
                                                                                    <ListItem>
                                                                                        {field.searchImage &&
                                                                                            <ListItemAvatar>
                                                                                                <Avatar src={option[field.searchImage]} />
                                                                                            </ListItemAvatar>
                                                                                        }
                                                                                        <ListItemText
                                                                                            primary={`${option[field.searchLabel]}`}
                                                                                        />
                                                                                    </ListItem>
                                                                                </List>
                                                                            </li>
                                                                        )
                                                                    }}
                                                                    onInputChange={() => setOptions([])}
                                                                    renderInput={(params) => (
                                                                        <TextField
                                                                            {...params}
                                                                            label={field.label}
                                                                            color='secondary'
                                                                            fullWidth
                                                                            margin='normal'
                                                                            value={value}
                                                                            onChange={(event) => {
                                                                                setIsLoading(true)
                                                                                setValue(event.target.value)
                                                                                authPostRequest(
                                                                                    field.searchUrl,
                                                                                    { ...field.searchBody, query: event.target.value },
                                                                                    (data) => {
                                                                                        setOptions(data.results)
                                                                                        setIsLoading(false)
                                                                                    },
                                                                                    (error) => {
                                                                                        error?.response?.data?.message && setError(error.response.data.message[0])
                                                                                        setIsLoading(false)
                                                                                    }
                                                                                )
                                                                            }}
                                                                            onFocus={(event) => {
                                                                                setIsLoading(true)
                                                                                setValue(event.target.value)
                                                                                authPostRequest(
                                                                                    field.searchUrl,
                                                                                    { ...field.searchBody, query: event.target.value },
                                                                                    (data) => {
                                                                                        setOptions(data.results)
                                                                                        setIsLoading(false)
                                                                                    },
                                                                                    (error) => {
                                                                                        error?.response?.data?.message && setError(error.response.data.message[0])
                                                                                        setIsLoading(false)
                                                                                    }
                                                                                )
                                                                            }}
                                                                        />
                                                                    )}
                                                                /> :
                                                                <TextField
                                                                    id={field.name}
                                                                    multiline
                                                                    required={field?.notRequired === false}
                                                                    name={field.name}
                                                                    type={field.type}
                                                                    label={field.label}
                                                                    margin="normal"
                                                                    fullWidth
                                                                    value={values[field.name]}
                                                                    error={Boolean(errors[field.name] && touched[field.name])}
                                                                    helperText={touched[field.name] && errors[field.name]}
                                                                    onBlur={handleBlur}
                                                                    onChange={handleChange}
                                                                />
                                        }
                                    </React.Fragment>
                                )
                            })}
                            <Typography
                                color="error"
                                sx={{
                                    mt: 2,
                                }}
                            >
                                {serverError}
                                {error}
                            </Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                onClick={handleClose}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ?
                                    "Loading..." :
                                    `${action}`
                                }
                            </Button>
                        </DialogActions>
                    </Form>
                )}
            </Formik>
        </Dialog>
    )
}