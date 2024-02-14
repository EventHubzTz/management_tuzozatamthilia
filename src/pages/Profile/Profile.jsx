import React from 'react'
import { Avatar, Box, Container, IconButton, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material'
import { useAuth } from '../../hooks/use-auth'
import ChangePassword from '../../components/ChangePassword'
import Layout from '../../layouts/Layout'
import { EditOutlined } from '@ant-design/icons'
import { removeUnderscore } from '../../utils/constant'

function Profile() {
    const auth = useAuth()
    const [changePassword, setChangePassword] = React.useState(false);

    const handleChangePassword = () => {
        setChangePassword(!changePassword);
    }

    return (
        <Layout>
            <Container>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        my: 3
                    }}
                >
                    <Avatar
                        sx={{
                            width: 80,
                            height: 80
                        }}
                    />
                    <Typography
                        variant='h1'
                        sx={{ ml: 3 }}
                    >
                        {auth.user.first_name} {auth.user.last_name}
                    </Typography>
                </Box>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <Typography variant='h3'>
                                        Name
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant='body1'>
                                        {auth.user.first_name} {auth.user.last_name}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <IconButton>
                                        <EditOutlined />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Typography variant='h3'>
                                        Email
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant='body1'>
                                        {auth.user.email}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <IconButton>
                                        <EditOutlined />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Typography variant='h3'>
                                        Phone Number
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant='body1'>
                                        {auth.user.phone_no}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <IconButton>
                                        <EditOutlined />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Typography variant='h3'>
                                        Role
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant='body1'>
                                        {removeUnderscore(auth.user.role)}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <IconButton>
                                        <EditOutlined />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                            {!changePassword &&
                                <TableRow>
                                    <TableCell>
                                        <Typography variant='h3'>
                                            Password
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant='body1'>
                                            ••••••••
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton
                                            onClick={() => handleChangePassword(true)}
                                        >
                                            <EditOutlined />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            }
                            {changePassword &&
                                <TableRow>
                                    <TableCell>
                                        <Typography variant='h3'>
                                            Change Password
                                        </Typography>
                                        <ChangePassword handleChangePassword={handleChangePassword} />
                                    </TableCell>
                                </TableRow>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </Layout>
    )
}

export default Profile