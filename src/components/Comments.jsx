import { Box, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import PublishedAt from "./PublishedAt";
import { Link } from "react-router-dom";

const Comments = ({ id }) => {
    const [comments, setComments] = useState([]);
    const profileAlt = "https://cellix-bio-mis.s3.ap-south-1.amazonaws.com/Chatterbox/snaptube-website-favicon-color.png";
    
    useEffect(() => {
        const fetchComments = async () => {
            try{   
                const res = await axios.get(`${import.meta.env.VITE_RAPID_API_URL}/commentThreads`, {
                    headers: {
                        'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
                        'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
                    },
                    params: {
                        part: 'snippet',
                        videoId: id,
                        maxResults: '100'
                    }
                });
                setComments(res.data.items);
            } catch (err) {
                console.error(err);
            }
        };
        fetchComments();
    }, [id]);
    
    return (
        <Box>
            {
                comments.map((comment, index) => (
                    <Stack key={index} direction="column" textAlign="left" ml={4} mb={2}>
                        <Stack direction="row" gap="10px" sx={{ display: "flex", alignItems: "center" }}>
                            <img 
                                src={
                                    comment.snippet.topLevelComment.snippet.authorProfileImageUrl || profileAlt
                                } 
                                alt="pic" 
                                style={{ width: "40px", height: "40px", borderRadius: "50%" }} 
                            />
                            
                            <Link to={`/channel/${comment.snippet.topLevelComment.snippet.authorChannelId.value}`} style={{ textDecoration: "none" }}>
                                <Typography color="#f7f7f7" variant="subtitle1">
                                    {comment.snippet.topLevelComment.snippet.authorDisplayName}
                                </Typography>
                            </Link>

                            <Typography color="gray" variant="subtitle2">
                                <PublishedAt publishedAt={comment.snippet.topLevelComment.snippet.publishedAt} />
                            </Typography>
                        </Stack>

                        <Typography color="#f7f7f7" variant="subtitle2" ml={6}>
                            <p>{comment.snippet.topLevelComment.snippet.textDisplay}</p>
                        </Typography>
                    </Stack>
                ))
            }
        </Box>
    );
};

export default Comments;