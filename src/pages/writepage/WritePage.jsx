import { useState, useRef } from "react";
import { fetchPost } from "../../common.js";
import {
    TextField,
    Button,
    Container,
    Box,
    Typography,
    Rating,
    Paper,
    Snackbar,
    Alert,
    IconButton,
    ImageList,
    ImageListItem
} from "@mui/material";
import { styled } from '@mui/material/styles';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router";

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    paddingTop: 0
    // marginTop: theme.spacing(4),f
    // marginBottom: theme.spacing(4),
}));

const StyledImageUploadBox = styled(Box)(({ theme }) => ({
    border: `2px dashed ${theme.palette.grey[300]}`,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
    textAlign: 'center',
    cursor: 'pointer',
    '&:hover': {
        borderColor: theme.palette.primary.main,
    },
}));

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_IMAGES = 1;

const WritePage = () => {
    const fileInputRef = useRef(null);
    const [writeContent, setWriteContent] = useState({
        user_id: 1,
        email: '',
        rating: 5,
        title: '',
        content: '',
        product_name: '',
        brand_name: '',
        category_name: '',
        images: null,
    });

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setWriteContent(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleRatingChange = (event, newValue) => {
        setWriteContent(prev => ({
            ...prev,
            rating: newValue
        }));
    };

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleImageChange = async (event) => {
        const files = Array.from(event.target.files);

        if (files.length > MAX_IMAGES) {
            setSnackbar({
                open: true,
                message: `최대 ${MAX_IMAGES}개의 이미지만 업로드할 수 있습니다.`,
                severity: 'error'
            });
            return;
        }

        for (const file of files) {
            if (file.size > MAX_IMAGE_SIZE) {
                setSnackbar({
                    open: true,
                    message: '파일 크기는 5MB를 초과할 수 없습니다.',
                    severity: 'error'
                });
                return;
            }
        }

        setWriteContent(prev => ({
            ...prev,
            images: files[0]  // 첫 번째 파일만 저장
        }));

        // Reset file input
        event.target.value = '';
    };

    const readFileAsDataURL = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    const handleRemoveImage = (index) => {
        setWriteContent(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
    };

    const handleCreateReview = async () => {
        try {
            const formData = new FormData();

            const reviewData = {
                ...writeContent,
                user_id: localStorage.getItem('user_id'),
                email: localStorage.getItem('email')
            };
            delete reviewData.images;

            const reviewBlob = new Blob([JSON.stringify(reviewData)], {
                type: 'application/json'
            });
            formData.append('review', reviewBlob);

            if (writeContent.images) {
                formData.append('review_image', writeContent.images);
            }

            const response = await fetch('http://localhost:8080/reviews/write', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Server response:', errorText);
                throw new Error(`HTTP error! status: ${response.status}`);
            }


            setWriteContent({
                user_id: 1,
                rating: 5,
                title: '',
                content: '',
                product_name: '',
                brand_name: '',
                category_name: '',
                images: null,
            });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar(prev => ({
            ...prev,
            open: false
        }));
    };

    return (
        <Container maxWidth="md">
            <StyledPaper elevation={3}>
                <Typography variant="h4" gutterBottom align="center">
                    리뷰 작성
                </Typography>

                <Box component="form" noValidate autoComplete="off" sx={{ mt: 3 }}>
                    <Box sx={{ mb: 3 }} style={{ textAlign: 'center' }}>
                        <Typography component="legend">평점</Typography>
                        <Rating
                            name="rating"
                            value={writeContent.rating}
                            onChange={handleRatingChange}
                            size="large"
                        />
                    </Box>

                    <TextField
                        fullWidth
                        label="제목"
                        name="title"
                        value={writeContent.title}
                        onChange={handleChange}
                        variant="outlined"
                        margin="normal"
                        required
                    />

                    <TextField
                        fullWidth
                        label="제품명"
                        name="product_name"
                        value={writeContent.product_name}
                        onChange={handleChange}
                        variant="outlined"
                        margin="normal"
                        required
                    />

                    <TextField
                        fullWidth
                        label="브랜드명"
                        name="brand_name"
                        value={writeContent.brand_name}
                        onChange={handleChange}
                        variant="outlined"
                        margin="normal"
                        required
                    />

                    <TextField
                        fullWidth
                        label="카테고리"
                        name="category_name"
                        value={writeContent.category_name}
                        onChange={handleChange}
                        variant="outlined"
                        margin="normal"
                        required
                    />

                    <TextField
                        fullWidth
                        label="내용"
                        name="content"
                        value={writeContent.content}
                        onChange={handleChange}
                        variant="outlined"
                        margin="normal"
                        required
                        multiline
                        rows={2}
                    />

                    <Box sx={{ mt: 3 }}>
                        <Typography variant="subtitle1" gutterBottom>
                            사진 첨부
                        </Typography>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            accept="image/*"
                            multiple
                            style={{ display: 'none' }}
                        />
                        <StyledImageUploadBox onClick={handleImageClick}>
                            <AddPhotoAlternateIcon sx={{ fontSize: 40, color: 'grey.500' }} />
                            <Typography variant="body1" sx={{ mt: 1 }} style={{ overflow: 'hidden' }}>
                                {writeContent.images ? writeContent.images.name : '클릭하여 이미지 업로드'}
                            </Typography>
                        </StyledImageUploadBox>
                    </Box>

                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 2 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleCreateReview}
                            size="large"
                        >
                            등록하기
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            size="large"
                        >
                            취소
                        </Button>
                    </Box>
                </Box>
            </StyledPaper>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default WritePage;