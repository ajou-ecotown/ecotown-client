import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Box,
    Link,
    Chip,
    Paper,
    Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
    WorkspacePremium as WorkspacePremiumIcon,
    Language as LanguageIcon,
    Business as BusinessIcon
} from '@mui/icons-material';

const StyledCard = styled(Card)(({ theme }) => ({
    width: 400,
    margin: 12,
    boxShadow: theme.shadows[3],
    overflow: 'visible'
}));

const CertificationBox = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    marginTop: theme.spacing(3),
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.divider}`
}));

const EsgRatingChip = styled(Chip)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontWeight: 'bold',
    fontSize: '1rem',
    height: '32px',
    marginRight: theme.spacing(1)
}));

const Brand = ({ brand }) => {
    return (
        <StyledCard>
            <CardMedia
                component="img"
                height="200"
                image={brand.brand_image}
                alt={brand.brand_name}
                sx={{
                    objectFit: 'cover',
                    borderBottom: '1px solid',
                    borderColor: 'divider'
                }}
            />

            <CardContent>
                <Typography variant="h5" component="h5" gutterBottom>
                    {brand.brand_name}
                </Typography>

                <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 1 }}>
                    {brand.brand_description}
                </Typography>

                <CertificationBox elevation={0}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <WorkspacePremiumIcon color="primary" />
                        <Typography variant="h6" component="h2">
                            {brand.certification_name}
                        </Typography>
                    </Box>

                    <Typography variant="body1" paragraph>
                        {brand.cert_description}
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: 2
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <EsgRatingChip
                                label={`ESG Rating: ${brand.esg_rating}`}
                            />
                        </Box>

                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1
                        }}>
                            <BusinessIcon color="action" />
                            <Typography variant="body2" color="text.secondary">
                                {brand.authority}
                            </Typography>
                        </Box>
                    </Box>
                </CertificationBox>

                <Box sx={{
                    mt: 3,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                }}>
                    <LanguageIcon color="action" />
                    <Link
                        href={brand.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        underline="hover"
                        color="primary"
                        sx={{
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            wordBreak: 'break-all'
                        }}
                    >
                        {brand.website}
                    </Link>
                </Box>
            </CardContent>
        </StyledCard>
    );
};

export default Brand;