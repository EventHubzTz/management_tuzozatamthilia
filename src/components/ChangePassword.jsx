import React from 'react'

// material-ui
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    useTheme,
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// assets
import { authPostRequest } from '../services/api-service';
import { changePasswordUrl } from '../seed/url';
import { useAuth } from '../hooks/use-auth';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';

function ChangePassword({ handleChangePassword }) {
    const auth = useAuth()
    const theme = useTheme();
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <>
            <Formik
                initialValues={{
                    oldPassword: '',
                    newPassword: '',
                    confirmNewPassword: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    oldPassword: Yup.string().min(6, "Old Password Should 6 Characters Long").max(255).required('Old Password is required'),
                    newPassword: Yup.string().min(6, "New Password Should 6 Characters Long").max(255).required('New Password is required'),
                    confirmNewPassword: Yup.string().min(6, "Confirm New Password Should 6 Characters Long").max(255).required('Confirm New Password is required')
                })}
                onSubmit={(values, helpers) => {
                    if (values.newPassword !== values.confirmNewPassword) {
                        helpers.setErrors({ submit: "Password does not matcch" });
                        helpers.setSucess(false);
                        helpers.setSubmitting(false);
                        return;
                    }
                    authPostRequest(
                        changePasswordUrl,
                        {
                            user_id: auth.user.id,
                            old_password: values.oldPassword,
                            new_password: values.newPassword,
                            confirm_new_password: values.confirmNewPassword
                        },
                        (data) => {
                            helpers.setStatus({ sucess: true })
                            helpers.setSubmitting(false)
                            handleChangePassword()
                        },
                        (error) => {
                            if (error?.response?.data?.message) {
                                helpers.setErrors({ submit: error.response.data.message[0] })
                            } else if (error?.response?.data) {
                                helpers.setErrors(error?.response?.data)
                            }
                            helpers.setStatus({ sucess: false })
                            helpers.setSubmitting(false)
                        },
                    )
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <FormControl fullWidth error={Boolean(touched.oldPassword && errors.oldPassword)} sx={{ ...theme.typography.customInput, my: 1 }}>
                            <InputLabel htmlFor="outlined-adornment-oldPassword-login">Old Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-oldPassword-login"
                                type={showPassword ? 'text' : 'password'}
                                value={values.oldPassword}
                                name="oldPassword"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle oldPassword visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            size="large"
                                        >
                                            {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Old Password"
                                inputProps={{}}
                            />
                            {touched.oldPassword && errors.oldPassword && (
                                <FormHelperText error id="standard-weight-helper-text-oldPassword-login">
                                    {errors.oldPassword}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl fullWidth error={Boolean(touched.newPassword && errors.newPassword)} sx={{ ...theme.typography.customInput, my: 1 }}>
                            <InputLabel htmlFor="outlined-adornment-newPassword-login">New Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-newPassword-login"
                                type={showPassword ? 'text' : 'password'}
                                value={values.newPassword}
                                name="newPassword"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle newPassword visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            size="large"
                                        >
                                            {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="New Password"
                                inputProps={{}}
                            />
                            {touched.newPassword && errors.newPassword && (
                                <FormHelperText error id="standard-weight-helper-text-newPassword-login">
                                    {errors.newPassword}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl fullWidth error={Boolean(touched.confirmNewPassword && errors.confirmNewPassword)} sx={{ ...theme.typography.customInput, my: 1 }}>
                            <InputLabel htmlFor="outlined-adornment-confirmNewPassword-login">Confirm New Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-confirmNewPassword-login"
                                type={showPassword ? 'text' : 'password'}
                                value={values.confirmNewPassword}
                                name="confirmNewPassword"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle confirmNewPassword visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            size="large"
                                        >
                                            {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Confirm New Password"
                                inputProps={{}}
                            />
                            {touched.confirmNewPassword && errors.confirmNewPassword && (
                                <FormHelperText error id="standard-weight-helper-text-confirmNewPassword-login">
                                    {errors.confirmNewPassword}
                                </FormHelperText>
                            )}
                        </FormControl>

                        {errors.submit && (
                            <Box sx={{ mt: 3 }}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )}

                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                mt: 2
                            }}
                        >
                            <Button disableElevation disabled={isSubmitting} size="large" type="submit" variant="contained" color="primary" sx={{ mr: 2 }}>
                                {isSubmitting ? "Loading..." : "Change Password"}
                            </Button>
                            <Button disableElevation disabled={isSubmitting} size="large" variant="contained" color="inherit" onClick={handleChangePassword}>
                                {isSubmitting ? "Loading..." : "Cancel"}
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    )
}

export default ChangePassword