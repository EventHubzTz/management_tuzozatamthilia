import React from "react";
import {
    Box,
    Container,
    Stack,
    Typography,
} from "@mui/material";
import { useSelection } from "../../hooks/use-selection";
import { CustomTable } from "../../components/custom-table";
import { CustomSearch } from "../../components/custom-search";
import { paymentHeadCells } from "../../seed/table-headers";
import { ConfirmationDialog } from "../../components/confirmation-dialog";
import { paymentStatus } from "../../utils/constant";
import { authPostRequest } from "../../services/api-service";
import {
    deleteAccountUrl,
} from "../../seed/url";
import { CustomAlert } from "../../components/custom-alert";
import Layout from "../../layouts/Layout";
import { DeleteOutlined } from "@ant-design/icons";
import { MaterialUICustomTabs } from "../../components/MaterialUICustomTabs";

const useContentsIds = (administrators) => {
    return React.useMemo(() => {
        return administrators.map((customer) => customer.id);
    }, [administrators]);
};

function Payments() {
    const [currentTab, setCurrentTab] = React.useState("");
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [administrators, setAdministrators] = React.useState({
        page: 1,
        total_results: 0,
        total_pages: 0,
        results: [],
    });
    const [selectedData, setSelectedData] = React.useState({});
    const [searchTerm, setSearchTerm] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(true);
    const [isDeleting, setIsDeleting] = React.useState(false);
    const administratorsIds = useContentsIds(administrators.results);
    const adminSelection = useSelection(administratorsIds);
    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
    const [openAlert, setOpenAlert] = React.useState(false);
    const [severity, setSeverity] = React.useState("");
    const [severityMessage, setSeverityMessage] = React.useState("");
    const [order, setOrder] = React.useState('desc');
    const [orderBy, setOrderBy] = React.useState('id');

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const fetcher = React.useCallback(
        (page) => {
            setIsLoading(true);
            authPostRequest(
                "",
                {
                    query: searchTerm,
                    sort: orderBy + " " + order,
                    limit: rowsPerPage,
                    page: page,
                },
                (data) => {
                    setAdministrators(data);
                    setIsLoading(false);
                },
                (error) => {
                    setAdministrators({
                        page: 1,
                        total_results: 0,
                        total_pages: 0,
                        results: [],
                    });
                    setIsLoading(false);
                }
            );
        },
        [rowsPerPage, searchTerm, orderBy, order]
    );

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    React.useEffect(() => {
        fetcher(1);
    }, [fetcher]);

    const handlePageChange = React.useCallback(
        (event, value) => {
            fetcher(value + 1);
        },
        [fetcher]
    );

    const handleRowsPerPageChange = React.useCallback((event) => {
        setRowsPerPage(event.target.value);
    }, []);

    const handleClickOpenDeleteDialog = () => {
        setOpenDeleteDialog(true);
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
    };

    const onSelect = (data, openDialog) => {
        setSelectedData(data);
    };

    const handleClickAlert = () => {
        setOpenAlert(true);
    };

    const handleCloseAlert = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpenAlert(false);
    };

    const handleDelete = async () => {
        setIsDeleting(true);
        authPostRequest(
            deleteAccountUrl,
            {
                user_id: selectedData.id,
            },
            (data) => {
                fetcher(administrators.page);
                setSeverityMessage(data.message);
                setSeverity("success");
                handleClickAlert();
                setIsDeleting(false);
                handleCloseDeleteDialog();
            },
            (error) => {
                if (error?.response?.data?.message) {
                    setSeverityMessage(error.response.data.message[0]);
                    setSeverity("error");
                    handleClickAlert();
                }
                setIsDeleting(false);
            }
        );
    };

    const contentPopoverItems = [
        {
            id: "delete",
            label: "Delete",
            icon: (
                <DeleteOutlined />
            ),
            onClick: () => {
                handleClickOpenDeleteDialog();
            },
        },
    ];

    return (
        <Layout>
            {openAlert && (
                <CustomAlert
                    openAlert={openAlert}
                    handleCloseAlert={handleCloseAlert}
                    severity={severity}
                    severityMessage={severityMessage}
                />
            )}
            {openDeleteDialog && (
                <ConfirmationDialog
                    open={openDeleteDialog}
                    handleClose={handleCloseDeleteDialog}
                    handleAction={handleDelete}
                    isPerformingAction={isDeleting}
                    dialogTitle={"Delete Alert"}
                    dialogContentText={"Are you sure you want to delete this event?"}
                />
            )}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    pt: 2,
                    pb: 8,
                }}
            >
                <Container maxWidth={false}>
                    <Stack spacing={3}>
                        <Stack direction="row" justifyContent="space-between" spacing={4}>
                            <Stack spacing={1}>
                                <Typography variant="h4">Payments</Typography>
                            </Stack>
                        </Stack>
                        <MaterialUICustomTabs
                            activeTab={currentTab}
                            setActiveTab={setCurrentTab}
                            tabsData={paymentStatus}
                        />
                        <CustomSearch handleSearch={handleSearch} />
                        <CustomTable
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            count={administrators.total_results}
                            items={administrators.results}
                            onPageChange={handlePageChange}
                            onRowsPerPageChange={handleRowsPerPageChange}
                            onSelectOne={adminSelection.handleSelectOne}
                            onSelect={onSelect}
                            page={
                                administrators.page >= 1
                                    ? administrators.page - 1
                                    : administrators.page
                            }
                            rowsPerPage={rowsPerPage}
                            selected={adminSelection.selected}
                            headCells={paymentHeadCells}
                            popoverItems={contentPopoverItems}
                            isLoading={isLoading}
                        />
                    </Stack>
                </Container>
            </Box>
        </Layout>
    );
}

export default Payments;
