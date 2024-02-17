import React from 'react'
import { Grid } from '@mui/material'
import AnalyticEcommerce from '../../components/cards/statistics/AnalyticEcommerce';

function AdminOverview() {

    return (
        <>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total Users" count="78,250" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total Events" count="188" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total Sales" count="TZS 35,035,078" />
            </Grid>
        </>
    )
}

export default AdminOverview