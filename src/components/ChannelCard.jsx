import { Box, CardContent, CardMedia, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { demoProfilePicture } from '../utils/constants';

const ChannelCard = ({ channelDetail }) => {
    console.log(channelDetail);
    return (
        <Box
            sx={{
                boxShadow: 'none',
                borderRadius: '20px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100vw',
                height: 'auto',
                margin: 'auto',
            }}
            >
            <CardContent
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    textAlign: 'center',
                    color: '#fff',
                    width: '100%',
                    height: '100%',
                }}
            >
                <CardMedia
                    component="img"
                    src={channelDetail?.brandingSettings?.image?.bannerExternalUrl || demoProfilePicture}
                    alt={channelDetail?.snippet?.title}
                    sx={{ width: '100%', height: '300px' }}
                />

                <CardMedia
                    image={channelDetail?.snippet?.thumbnails?.high?.url || demoProfilePicture}
                    alt={channelDetail?.snippet?.title}
                    sx={{
                        borderRadius: '50%',
                        height: '180px',
                        width: '180px',
                        border: '1px solid #e3e3e3',
                        margin: 'auto',
                        marginTop: '20px',
                    }}
                />

                <Typography variant="h5" mt="1">
                    {channelDetail?.snippet?.title}{' '}
                    <CheckCircleIcon sx={{ fontSize: '14px', color: 'gray', ml: '5px' }} />
                </Typography>

                <Typography variant="h6">
                    {channelDetail?.snippet?.customUrl}
                </Typography>

                {
                    channelDetail?.statistics?.subscriberCount && (
                        <Typography sx={{ fontSize: '20px', fontWeight: 500, color: 'gray' }}>
                            {parseInt(channelDetail?.statistics?.subscriberCount).toLocaleString('en-US')} Subscribers
                        </Typography>
                    )
                }

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        color: '#f7f7f7',
                        py: 1,
                        px: 2,
                    }}
                >
                    <Typography variant="p" sx={{ flex: 1, textAlign: 'left' }}>
                        {channelDetail?.snippet?.description}
                    </Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }} >
                        <Typography variant="span" sx={{ fontSize: '15px', fontWeight: 500, color: 'gray' }}>
                        Joined{' '}
                        {
                            new Date(channelDetail?.snippet?.publishedAt).toLocaleDateString(undefined, {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })
                        }
                        </Typography>

                        <Typography variant="span" sx={{ fontSize: '15px', fontWeight: 500, color: 'gray' }}>
                            {parseInt(channelDetail?.statistics?.videoCount).toLocaleString('en-US')} Videos
                        </Typography>

                        <Typography variant="span" sx={{ fontSize: '15px', fontWeight: 500, color: 'gray' }}>
                            {parseInt(channelDetail?.statistics?.viewCount).toLocaleString('en-US')} Views
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
        </Box>

    );
};

export default ChannelCard;