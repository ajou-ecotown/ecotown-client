import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import {
    Box,
    Card,
    CardMedia,
    CardContent,
    Typography,
    IconButton,
    Paper,
    Container
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
    NavigateBefore as NavigateBeforeIcon,
    NavigateNext as NavigateNextIcon
} from '@mui/icons-material';

const SliderWrapper = styled(Container)(({ theme }) => ({
    position: 'relative',
    padding: theme.spacing(4),
}));

const SliderContainer = styled(Box)(({ theme }) => ({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
}));

const SliderTrack = styled(Box)({
    display: 'flex',
    width: '100%',
    overflow: 'hidden',
});

const SlideContent = styled(Box)(({ translate }) => ({
    display: 'flex',
    transform: `translateX(-${translate}%)`,
    transition: 'transform 0.3s ease-out',
    gap: '24px',
}));

const ProductCard = styled(Card)(({ theme }) => ({
    flex: '0 0 calc(25% - 18px)',
    minWidth: 0,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[2],
    transition: 'transform 0.2s',
    '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: theme.shadows[4],
    },
}));

const NavButton = styled(IconButton)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[2],
    '&:hover': {
        backgroundColor: theme.palette.background.paper,
    },
    '&.Mui-disabled': {
        backgroundColor: theme.palette.action.disabledBackground,
    },
}));

const PaginationContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    gap: theme.spacing(1),
    marginTop: theme.spacing(2),
}));

const PaginationDot = styled('button')(({ theme, active }) => ({
    width: 8,
    height: 8,
    padding: 0,
    borderRadius: '50%',
    border: 'none',
    backgroundColor: active ? theme.palette.primary.main : theme.palette.grey[300],
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    '&:hover': {
        backgroundColor: active ? theme.palette.primary.dark : theme.palette.grey[400],
    },
}));

const Promotion = ({ promotionAry }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerView = 4;
    const maxIndex = Math.max(0, promotionAry.length - itemsPerView);

    const handlers = useSwipeable({
        onSwipedLeft: () => {
            setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
        },
        onSwipedRight: () => {
            setCurrentIndex(prev => Math.max(prev - 1, 0));
        },
        trackMouse: true,
        preventScrollOnSwipe: true,
    });

    const handlePrevClick = () => {
        setCurrentIndex(prev => Math.max(prev - 1, 0));
    };

    const handleNextClick = () => {
        setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
    };

    return (
        <SliderWrapper>
            <SliderContainer>
                <NavButton
                    onClick={handlePrevClick}
                    disabled={currentIndex === 0}
                    size="large"
                >
                    <NavigateBeforeIcon />
                </NavButton>

                <SliderTrack {...handlers}>
                    <SlideContent translate={currentIndex * (100 / itemsPerView)}>
                        {promotionAry.map((item, index) => (
                            <ProductCard key={index}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={item.product_image}
                                    alt={item.product_name}
                                    sx={{ objectFit: 'cover' }}
                                />
                                <CardContent>
                                    <Typography variant="h6" gutterBottom noWrap>
                                        {item.product_name}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        noWrap
                                    >
                                        {item.category_name}
                                    </Typography>
                                </CardContent>
                            </ProductCard>
                        ))}
                    </SlideContent>
                </SliderTrack>

                <NavButton
                    onClick={handleNextClick}
                    disabled={currentIndex === maxIndex}
                    size="large"
                >
                    <NavigateNextIcon />
                </NavButton>
            </SliderContainer>

            <PaginationContainer>
                {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                    <PaginationDot
                        key={index}
                        active={currentIndex === index}
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </PaginationContainer>
        </SliderWrapper>
    );
};

export default Promotion;