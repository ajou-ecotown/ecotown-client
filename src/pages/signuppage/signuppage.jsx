// Signup.js
import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
    Container,
    Paper,
    TextField,
    Button,
    Typography,
    Box,
    Link,
    Alert,
    Snackbar
} from '@mui/material';
import { fetchPost } from '../../common';

const SignupPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        passwordConfirm: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const signupData = {
                username: formData.username,
                email: formData.email,
                password: formData.password
            };

            await fetchPost('/signup', signupData);
            alert('회원가입에 성공하였습니다 김 아주 님');
            navigate('/login');
        } catch (err) {
            setError('회원가입에 실패했습니다. 다시 시도해주세요.');
        } finally {
            navigate('/login');
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 8 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    회원가입
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <TextField
                        fullWidth
                        label="이름"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="이메일"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="비밀번호"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        margin="normal"
                        helperText="6자 이상 입력해주세요"
                    />
                    <TextField
                        fullWidth
                        label="비밀번호 확인"
                        name="passwordConfirm"
                        type="password"
                        value={formData.passwordConfirm}
                        onChange={handleChange}
                        margin="normal"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        size="large"
                    >
                        회원가입
                    </Button>
                    <Box sx={{ textAlign: 'center' }}>
                        <Link href="/login" variant="body2">
                            이미 계정이 있으신가요? 로그인
                        </Link>
                    </Box>
                </Box>
            </Paper>
            <Snackbar
                open={!!error}
                autoHideDuration={6000}
                onClose={() => setError('')}
            >
                <Alert severity="success" onClose={() => setError('')}>
                    {error}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default SignupPage;