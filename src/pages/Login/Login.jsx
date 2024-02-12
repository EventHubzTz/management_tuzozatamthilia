import React from 'react'
import AuthWrapper from './AuthWrapper'
import { Grid, Stack } from '@mui/material'
import Typography from '../../themes/overrides/Typography'
import { Link } from 'react-router-dom'
import AuthLogin from './AuthLogin'

function Login() {
    return (
        <AuthWrapper>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
                        <Typography variant="h3">Login</Typography>
                        <Typography component={Link} to="/register" variant="body1" sx={{ textDecoration: 'none' }} color="primary">
                            Don&apos;t have an account?
                        </Typography>
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <AuthLogin />
                </Grid>
            </Grid>
        </AuthWrapper>
    )
}

export default Login