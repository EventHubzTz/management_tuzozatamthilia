import React from 'react'
import Layout from '../../layouts/Layout';
import { Grid, Typography } from '@mui/material';
import { useAuth } from '../../hooks/use-auth';
import AdminOverview from './AdminOverview';
import EventPlannerOverview from './EventPlannerOverview';

function Dashboard() {
  const auth = useAuth();

  return (
    <Layout>
      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
        <Grid item xs={12} sx={{ mb: -2.25 }}>
          <Typography variant="h4">Dashboard</Typography>
        </Grid>
        {auth?.user?.role === "SUPER_ADMIN" && <AdminOverview />}
        {auth?.user?.role === "EVENT_PLANNER" && <EventPlannerOverview />}
      </Grid>
    </Layout>
  )
}

export default Dashboard