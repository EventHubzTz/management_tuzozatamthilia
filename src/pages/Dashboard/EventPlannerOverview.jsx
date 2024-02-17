import React from 'react'
import { Grid } from '@mui/material'
import AnalyticEcommerce from '../../components/cards/statistics/AnalyticEcommerce';

function EventPlannerOverview() {

    return (
        <>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total Events" count="18" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total Sales" count="TZS 535,078" />
            </Grid>
        </>
    )
}

export default EventPlannerOverview