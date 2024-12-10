import { useState, useEffect } from "react";
import { fetchGet } from "../../common.js";
import {
    Container,
    Grid,
    Paper,
    TextField,
    Typography,
    Avatar,
    Box,
    Divider,
    IconButton,
    Tooltip,
    Card,
    CardContent,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
    AccountBox as AccountBoxIcon,
    VpnLock as VpnLockIcon,
    Edit as EditIcon,
} from '@mui/icons-material';

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    margin: theme.spacing(2, 0),
    boxShadow: theme.shadows[3],
}));

const LargeAvatar = styled(Avatar)(({ theme }) => ({
    width: 200,
    height: 200,
    backgroundColor: theme.palette.primary.main,
    marginBottom: theme.spacing(2),
}));

const PointsCard = styled(Card)(({ theme }) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
}));

const MyPage = () => {
    const [account, setAccount] = useState({
        username: 'username',
        created_at: '2024-11-11',
        email: 'email@email.com',
        password: '*******',
        points: 80,
        activity: 'activity',
        points_created_at: '2024-11-11'
    });

    useEffect(() => {
        (async () => {
            await fetchGet(`/users/${localStorage.getItem('user_id')}`, setAccount);
        })();
    }, []);

    useEffect(() => {
        console.log(account);
    }, [account]);

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={4}>
                {/* Profile Section */}
                <Grid item xs={12}>
                    <StyledPaper>
                        <Grid container spacing={4} alignItems="center">
                            <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
                                <AccountBoxIcon sx={{ fontSize: 240 }} />
                                <Typography variant="h5" gutterBottom>
                                    {account.username}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    가입일: {account.created_at}
                                </Typography>
                            </Grid>

                            <Grid item xs={12} md={8}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                    <TextField
                                        fullWidth
                                        label="닉네임"
                                        value={account.username}
                                        variant="outlined"
                                        InputProps={{
                                            endAdornment: (
                                                <Tooltip title="수정">
                                                    <IconButton size="small">
                                                        <EditIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            ),
                                        }}
                                    />
                                    <TextField
                                        fullWidth
                                        label="이메일"
                                        value={account.email}
                                        variant="outlined"
                                    />
                                    <TextField
                                        fullWidth
                                        label="비밀번호"
                                        value={account.password}
                                        variant="outlined"
                                        type="password"
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                    </StyledPaper>
                </Grid>

                {/* Points Section */}
                <Grid item xs={12}>
                    <StyledPaper>
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={8}>
                                <Typography variant="h6" gutterBottom>
                                    포인트 정보
                                </Typography>
                                <Divider sx={{ mb: 3 }} />
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={4}>
                                        <PointsCard>
                                            <CardContent>
                                                <Typography variant="h6" gutterBottom>
                                                    현재 포인트
                                                </Typography>
                                                <Typography variant="h3">
                                                    {account.points}
                                                </Typography>
                                            </CardContent>
                                        </PointsCard>
                                    </Grid>
                                    <Grid item xs={12} md={8}>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                            <TextField
                                                fullWidth
                                                label="최근 포인트 활동"
                                                value={account.activity}
                                                variant="outlined"
                                                disabled
                                            />
                                            <TextField
                                                fullWidth
                                                label="최근 포인트 지급일"
                                                value={account.points_created_at}
                                                variant="outlined"
                                                disabled
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <VpnLockIcon color="primary" sx={{ fontSize: 180 }} />
                            </Grid>
                        </Grid>
                    </StyledPaper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default MyPage;