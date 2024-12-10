import {
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    CardActions,
    Avatar,
    Typography,
    IconButton,
    Chip,
    Box,
    Rating,
    Divider,
    Paper
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
    ThumbUpOffAlt as ThumbUpOffAltIcon,
    ThumbDownOffAlt as ThumbDownOffAltIcon,
    WorkspacePremium as WorkspacePremiumIcon
} from '@mui/icons-material';
import { useState } from 'react';
import { fetchPost } from "../../../../common.js";

const StyledCard = styled(Card)(({ theme }) => ({
    width: 500,
    margin: 'auto',
    marginBottom: theme.spacing(3),
    boxShadow: theme.shadows[3],
}));

const StyledChip = styled(Chip)(({ theme }) => ({
    margin: theme.spacing(0.5),
    '& .MuiChip-label': {
        fontWeight: 500,
    },
}));

const CertificationBadge = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1, 2),
    display: 'inline-flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
    borderRadius: theme.shape.borderRadius,
    '& .MuiSvgIcon-root': {
        color: theme.palette.primary.contrastText,
    },
}));

const Post = ({ post, idx, setPost }) => {
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);

    const handleClickLike = async (review_id) => {
        if (disliked) return;

        try {
            await fetchPost('/reviews/like', { review_id: review_id, update_like: 1 });
            setPost((p) => {
                const prev = [...p];
                prev[idx] = { ...prev[idx], like: prev[idx].like + 1 };
                return prev;
            });
            setLiked(true);
        } catch (error) {
            console.error('Error updating like:', error);
        }
    };

    const handleClickDisLike = async (review_id) => {
        if (liked) return;

        try {
            await fetchPost('/reviews/like', { review_id: review_id, update_like: -1 });
            setPost((p) => {
                const prev = [...p];
                prev[idx] = { ...prev[idx], dislike: prev[idx].dislike + 1 };
                return prev;
            });
            setDisliked(true);
        } catch (error) {
            console.error('Error updating dislike:', error);
        }
    };

    return (
        <StyledCard>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                        {post.username[0]?.toUpperCase()}
                    </Avatar>
                }
                title={post.username}
                subheader={post.created_at}
            />

            {post.review_image && (
                <CardMedia
                    component="img"
                    height="300"
                    image={post.review_image}
                    alt={post.title}
                    sx={{ objectFit: 'cover' }}
                />
            )}

            <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                    {post.title}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Rating value={post.rating} precision={0.5} readOnly />
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                        {post.rating}/5
                    </Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                    {[post.product_name, post.brand_name, post.category_name].map((tag, i) => (
                        <StyledChip
                            key={i}
                            label={tag}
                            variant="outlined"
                            color="primary"
                            size="small"
                        />
                    ))}
                </Box>

                <Typography variant="body1" color="text.primary" paragraph>
                    {post.content}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <CertificationBadge elevation={0}>
                        <WorkspacePremiumIcon />
                        <Typography variant="body2">
                            {post.certification_name}
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                            {post.esg_rating}
                        </Typography>
                    </CertificationBadge>
                </Box>
            </CardContent>

            <CardActions disableSpacing>
                <IconButton
                    onClick={() => handleClickLike(post.review_id)}
                    color={liked ? "primary" : "default"}
                >
                    <ThumbUpOffAltIcon />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                        {post.like}
                    </Typography>
                </IconButton>
                <IconButton
                    onClick={() => handleClickDisLike(post.review_id)}
                    color={disliked ? "error" : "default"}
                >
                    <ThumbDownOffAltIcon />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                        {post.dislike}
                    </Typography>
                </IconButton>
            </CardActions>
        </StyledCard>
    );
};

export default Post;