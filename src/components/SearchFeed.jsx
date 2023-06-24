import { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import { useParams } from "react-router-dom";
import Videos from "./Videos";
import axios from "axios";

const SearchFeed = () => {
    const [videos, setVideos] = useState(null);
    const { searchTerm } = useParams();

    useEffect(() => {
        const fetchSearchVideos = async () => {
            try{   
                const res = await axios.get(`${import.meta.env.VITE_RAPID_API_URL}/search?part=snippet&q=${searchTerm}`, {
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
        fetchSearchVideos();
    }, [searchTerm]);

    return (
        <Box p={2} minHeight="95vh">
            <Typography variant="h4" fontWeight={900}  color="white" mb={3} ml={{ sm: "100px"}}>
                Search Results for <span style={{ color: "#FC1503" }}>{searchTerm}</span> videos
            </Typography>
            <Box display="flex">
                <Box sx={{ mr: { sm: '100px' } }}/>
                <Videos videos={videos} />
            </Box>
        </Box>
    )
};

export default SearchFeed;