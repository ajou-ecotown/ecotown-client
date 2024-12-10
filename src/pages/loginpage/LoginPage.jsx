// Login.js
import { useState } from 'react';
import { useNavigate } from "react-router";
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
import S from "../../components/header/Header.module.css";

const LoginPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetchPost('/login', formData);
            if (response.user_id) {
                localStorage.setItem('email', response.email);
                localStorage.setItem('user_id', response.user_id);
                localStorage.setItem('username', response.username);
                navigate('/');
            }
        } catch (err) {
            setError('로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.');
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 8 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img src={'logo.png'} className={S.logo} style={{ width: '200px', height: '200px' }} />
                </div>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <TextField
                        fullWidth
                        label="이메일"
                        name="email"
                        value={formData.user_id}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />
                    <TextField
                        fullWidth
                        label="비밀번호"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        size="large"
                    >
                        로그인
                    </Button>
                    <Box sx={{ textAlign: 'center' }}>
                        <Link href="/signup" variant="body2">
                            계정이 없으신가요? 회원가입하기
                        </Link>
                    </Box>
                </Box>
            </Paper>
            <Snackbar
                open={!!error}
                autoHideDuration={6000}
                onClose={() => setError('')}
            >
                <Alert severity="error" onClose={() => setError('')}>
                    {error}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default LoginPage;