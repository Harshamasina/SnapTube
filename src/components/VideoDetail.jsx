import React, { useState, useEffect } from "react";
import { Link, useParams  } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack } from "@mui/material";
import { CheckCircleOutline } from "@mui/icons-material";
import Videos from "./Videos";
import axios from "axios";
import PublishedAt from "./PublishedAt";
import VisibilityIcon from '@mui/icons-material/Visibility';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import Comments from "./Comments";

const VideoDetail = () => {
    const { id } = useParams();
    const [videoDetail, setVideoDetail] = useState(null);
    const [videos, setVideos] = useState(null);
    
    useEffect(() => {
        const fetchVideo = async () => {
            try{   
                const res = await axios.get(`${import.meta.env.VITE_RAPID_API_URL}/videos?part=snippet,statistics&id=${id}`, {
                    headers: {
                        'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
                        'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
                    },
                    params: {
                        type: 'video',
                        maxResults: '50'
                    }
                });
                setVideoDetail(res.data.items[0]);
            } catch (err) {
                console.error(err);
            }
        };
        fetchVideo();
    }, [id]);

    useEffect(() => {
        const fetchRelatedVideo = async () => {
            try{   
                const res = await axios.get(`${import.meta.env.VITE_RAPID_API_URL}/search?part=snippet&relatedToVideoId=${id}`, {
                    headers: {
                        'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
                        'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
                    },
                    params: {
                        type: 'video',
                        maxResults: '50'
                    }
                });
                setVideos(res.data.items);
            } catch (err) {
                console.error(err);
            }
        };
        fetchRelatedVideo();
    }, [id]);

    return (
        <Box minHeight="95vh">
            <Stack direction={{ xs: "column", md: "row" }}>
                <Box flex={1}>
                    <Box sx={{ width: "100%", top: "86px" }}>
                        <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} className="react-player" controls />

                        <Typography color="#f7f7f7" variant="h5" fontWeight="bold" p={2}>
                            {videoDetail?.snippet?.title}
                        </Typography>

                        <Typography ml={2}>
                            <PublishedAt publishedAt={videoDetail?.snippet?.publishedAt} />
                        </Typography>

                        <Stack direction="row" justifyContent="space-between" sx={{ color: "#f7f7f7" }} py={1} px={2} >
                            <Link to={`/channel/${videoDetail?.snippet?.channelId}`}>
                                <Typography variant="p" fontWeight="bold" color="#f7f7f7" >
                                    {videoDetail?.snippet?.channelTitle}
                                    <CheckCircleOutline sx={{ fontSize: "12px", color: "gray", ml: "5px" }} />
                                </Typography>
                            </Link>

                            <Stack direction="row" gap="20px">
                                <Typography variant="body1" sx={{ display: "flex", alignItems: "center", opacity: 0.7 }}>
                                    <VisibilityIcon sx={{ marginRight: "5px" }} /> {parseInt(videoDetail?.statistics?.viewCount).toLocaleString()} views
                                </Typography>

                                <Typography variant="body1" sx={{ display: "flex", alignItems: "center", opacity: 0.7 }}>
                                    <ThumbUpOffAltIcon sx={{ marginRight: "5px" }} /> {parseInt(videoDetail?.statistics?.likeCount).toLocaleString()} likes
                                </Typography>
                            </Stack>
                        </Stack>

                        <Box p={2}>
                            <Typography color="#f7f7f7" variant="subtitle2">
                                {
                                    videoDetail?.snippet?.description.split('\n').map((paragraph, index) => (
                                        <React.Fragment key={index}>
                                        {paragraph}
                                        <br />
                                        </React.Fragment>
                                    ))
                                }
                            </Typography>

                            <Typography P={2} mt={2} color="#f7f7f7" variant="subtitle2" fontWeight={500}>
                            {
                                new Date(videoDetail?.snippet?.publishedAt).toLocaleDateString(undefined, {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })
                            }
                            </Typography>
                        </Box>

                        <Typography variant="body1" sx={{ opacity: 0.7 }} p={2} color="#f7f7f7" fontWeight={550}>
                            {parseInt(videoDetail?.statistics?.commentCount).toLocaleString()} comments
                        </Typography>

                        <Comments id={id} />
                    </Box>
                </Box>
                
                <Box px={2} py={{ md: 1, xs: 5 }} justifyContent="center" alignItems="center" >
                    <Videos videos={videos} direction="column" />
                </Box> 
            </Stack>
        </Box>
    )
};

export default VideoDetail;