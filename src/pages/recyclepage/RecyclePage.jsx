import {
    Container,
    Typography,
    Box,
    Stepper,
    Step,
    StepLabel,
    StepContent,
    Card,
    CardMedia,
    CardContent,
    Grid,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Chip,
    Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
    ExpandMore as ExpandMoreIcon,
    RecyclingOutlined as RecyclingIcon,
    ErrorOutline as ErrorIcon,
    CheckCircleOutline as CheckIcon
} from '@mui/icons-material';

const StyledCard = styled(Card)(({ theme }) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.2s',
    '&:hover': {
        transform: 'translateY(-4px)',
    }
}));

const CategoryChip = styled(Chip)(({ theme }) => ({
    margin: theme.spacing(0.5),
}));

const RecyclePage = () => {
    const categories = [
        { label: '플라스틱', color: 'primary' },
        { label: '유리', color: 'secondary' },
        { label: '종이', color: 'success' },
        { label: '금속', color: 'warning' },
        { label: '전자제품', color: 'error' }
    ];

    const basicSteps = [
        {
            label: '분리수거 전 세척하기',
            description: '재활용품은 깨끗이 씻어서 말린 후 분리수거해야 합니다. 음식물이나 이물질이 묻어있으면 재활용이 어려워질 수 있습니다.',
            image: '/images/1.png'
        },
        {
            label: '라벨 제거하기',
            description: '플라스틱 용기나 유리병의 라벨은 가능한 제거해주세요. 접착제가 묻어있는 라벨은 재활용 과정을 방해할 수 있습니다.',
            image: '/images/2.png'
        },
        {
            label: '분리해서 배출하기',
            description: '재질별로 정확하게 분류하여 배출해주세요. 혼합 배출 시 재활용 효율이 떨어집니다.',
            image: '/images/3.png'
        }
    ];

    const detailedGuides = [
        {
            category: '플라스틱',
            items: [
                {
                    title: 'PET 병',
                    instruction: '내용물을 비우고 라벨을 제거한 후 찌그러뜨려 배출',
                    cautions: ['잔여물이 남은 병은 재활용 불가', '뚜껑 별도 분리'],
                    image: '/images/4.png'
                },
                {
                    title: '플라스틱 용기',
                    instruction: '깨끗이 씻어서 말린 후 배출',
                    cautions: ['기름이 묻은 용기는 재활용 불가', '재질이 다른 부분 분리 필수'],
                    image: '/images/5.png'
                }
            ]
        },
        {
            category: '유리 / 캔',
            items: [
                {
                    title: '유리병',
                    instruction: '내용물을 비우고 라벨 제거 후 배출',
                    cautions: ['깨진 유리는 신문지에 싸서 배출', '소주병/맥주병은 분리 배출'],
                    image: '/images/6.png'
                },
                {
                    title: '캔',
                    instruction: '내용물을 비우고 찌그러뜨려 배출',
                    cautions: ['라벨/스티커 제거 필수', '캔 고리는 떼지 않음'],
                    image: '/images/7.png'
                }
            ]
        }
    ];

    return (
        <Container maxWidth="lg" sx={{ pb: 8 }}>
            {/* Header */}
            <Box sx={{ mb: 6, textAlign: 'center' }}>
                <Typography variant="h3" gutterBottom>
                    재활용 가이드
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    올바른 분리수거로 지구를 지켜요
                </Typography>
                <Box sx={{ mt: 2 }}>
                    {categories.map((category) => (
                        <CategoryChip
                            key={category.label}
                            label={category.label}
                            color={category.color}
                            variant="outlined"
                        />
                    ))}
                </Box>
            </Box>

            {/* Basic Steps */}
            <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
                기본 분리수거 단계
            </Typography>
            <Stepper orientation="vertical" sx={{ mb: 6 }}>
                {basicSteps.map((step, index) => (
                    <Step key={step.label} active={true}>
                        <StepLabel>
                            <Typography variant="h6">{step.label}</Typography>
                        </StepLabel>
                        <StepContent>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <Typography>{step.description}</Typography>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Card>
                                        <CardMedia
                                            component="img"
                                            height="200"
                                            image={step.image}
                                            alt={step.label}
                                        />
                                    </Card>
                                </Grid>
                            </Grid>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>

            {/* Detailed Guides */}
            <Typography variant="h4" gutterBottom sx={{ my: 4 }}>
                재질별 상세 가이드
            </Typography>
            {detailedGuides.map((guide) => (
                <Accordion key={guide.category}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h6">{guide.category}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={4}>
                            {guide.items.map((item) => (
                                <Grid item xs={12} md={6} key={item.title}>
                                    <StyledCard>
                                        <CardMedia
                                            component="img"
                                            height="240"
                                            image={item.image}
                                            alt={item.title}
                                        />
                                        <CardContent>
                                            <Typography variant="h6" gutterBottom>
                                                {item.title}
                                            </Typography>
                                            <Typography variant="body1" paragraph>
                                                {item.instruction}
                                            </Typography>
                                            <Divider sx={{ my: 2 }} />
                                            <Typography variant="subtitle2" color="error" gutterBottom>
                                                주의사항
                                            </Typography>
                                            {item.cautions.map((caution, idx) => (
                                                <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                                    <ErrorIcon fontSize="small" color="error" />
                                                    <Typography variant="body2">
                                                        {caution}
                                                    </Typography>
                                                </Box>
                                            ))}
                                        </CardContent>
                                    </StyledCard>
                                </Grid>
                            ))}
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            ))}
        </Container>
    );
};

export default RecyclePage;