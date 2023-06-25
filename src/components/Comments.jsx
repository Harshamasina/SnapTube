import { Box, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import PublishedAt from "./PublishedAt";

const Comments = ({ id }) => {
    const [comments, setComments] = useState([]);
    
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
                    <Stack key={index} direction="column" textAlign="left" p={2}>
                        <Stack direction="row" gap="10px" sx={{ display: "flex", alignItems: "center" }}>
                            <Typography color="#f7f7f7" variant="subtitle1">
                                {comment.snippet.topLevelComment.snippet.authorDisplayName}
                            </Typography>

                            <Typography color="gray" variant="subtitle2">
                                <PublishedAt publishedAt={comment.snippet.topLevelComment.snippet.publishedAt} />
                            </Typography>
                        </Stack>

                        <Typography color="#f7f7f7" variant="subtitle2">
                            <p>{comment.snippet.topLevelComment.snippet.textDisplay}</p>
                        </Typography>
                    </Stack>
                ))
            }
        </Box>
    );
};

export default Comments;