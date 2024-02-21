import React from 'react'
import AuthWrapper from './AuthWrapper'
import { Grid } from '@mui/material'
import AuthLogin from './AuthLogin'

function Login() {

    return (
        <AuthWrapper>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <AuthLogin />
                </Grid>
            </Grid>
        </AuthWrapper>
    )
}

export default Login