import React from 'react'
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Fab, IconButton, ImageList, ImageListItem, ImageListItemBar, Slide, Typography } from '@mui/material'
import { authPostRequest } from '../../services/api-service'
import { addEventImageUrl, deleteEventImageUrl, getEventUrl } from '../../seed/url'
import { DeleteOutlined, PlusOutlined, XOutlined } from '@ant-design/icons'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

function ViewEventMedia({
    open,
    handleClose,
    selected
}) {
    const [productImages, setProductImages] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true)
    const [isSubmitting, setSubmitting] = React.useState(false)
    const [error, setError] = React.useState("")

    const readUploadFile = (e) => {
        e.preventDefault();
        if (e.target.files) {
            uploadProductImage(e)
        }
    }

    const fetchProductImages = React.useCallback((e) => {
        authPostRequest(
            getEventUrl,
            { id: selected.id, },
            (data) => {
                setError("")
                setProductImages(data.event_files)
                setIsLoading(false)
            },
            (error) => {
                setProductImages([])
                error?.response?.data?.message && setError(error.response.data.message[0])
                setIsLoading(false)
            }
        )
    }, [selected])

    const uploadProductImage = (e) => {
        setIsLoading(true)
        authPostRequest(
            addEventImageUrl,
            {
                event_id: selected.id,
                image: e.target.files[0]
            },
            (data) => {
                fetchProductImages()
                setSubmitting(false)
            },
            (error) => {
                error?.response?.data?.message && setError(error.response.data.message[0])
                setSubmitting(false)
            },
            true,
        )
    }

    const deleteProductImage = (id) => {
        authPostRequest(
            deleteEventImageUrl,
            { id: id, },
            (data) => {
                fetchProductImages()
                setSubmitting(false)
            },
            (error) => {
                error?.response?.data?.message && setError(error.response.data.message[0])
                setSubmitting(false)
            },
        )
    }

    React.useEffect(() => {
        fetchProductImages()
    }, [fetchProductImages])

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            aria-describedby="form-dialog"
            fullWidth={true}
            maxWidth={"xl"}
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
            <DialogTitle variant='h4'>Event Media</DialogTitle>
            <DialogContent>
                {isLoading &&
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: "center",
                        height: "100%"
                    }}>
                        <CircularProgress
                            sx={{
                                mx: 'auto',
                            }}
                        />
                    </Box>
                }
                {productImages && !isLoading &&
                    <>
                        <ImageList sx={{ width: "100%", height: "100%" }} cols={3} gap={8}>
                            {productImages.map((item, index) => (
                                <ImageListItem key={index}>
                                    {item.file_type === "VIDEO" ?
                                        <video
                                            width="100%"
                                            controls
                                            src={`${item.video_url}`}
                                        /> :
                                        item.file_type === "YOUTUBE" ?
                                            <iframe
                                                width="100%"
                                                height="100%"
                                                src={`${item.video_url}`}
                                                title={selected.event_name}
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowfullscreen
                                                style={{
                                                    borderRadius: "8px",
                                                    overflow: "hidden",
                                                }}
                                            /> :
                                            <img
                                                src={`${item.image_url}?w=161&fit=crop&auto=format`}
                                                alt={selected.event_name}
                                                loading="lazy"
                                            />
                                    }
                                    <ImageListItemBar
                                        title={selected.event_name}
                                        actionIcon={
                                            <IconButton
                                                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                                aria-label={`info about ${selected.event_name}`}
                                                onClick={() => { deleteProductImage(item.id) }}
                                                disabled={isSubmitting}
                                            >
                                                <DeleteOutlined />
                                            </IconButton>
                                        }
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>
                        {productImages.length < 2 &&
                            <Box display="flex" justifyContent="flex-end">
                                <Fab color="primary" aria-label="add" component="label">
                                    <input
                                        hidden
                                        type="file"
                                        onChange={readUploadFile}
                                    />
                                    <PlusOutlined />
                                </Fab>
                            </Box>
                        }
                    </>
                }
                <Typography
                    color="error"
                    sx={{
                        mt: 2,
                    }}
                >
                    {error}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleClose}
                >
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ViewEventMedia