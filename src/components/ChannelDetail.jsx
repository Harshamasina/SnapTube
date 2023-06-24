import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material"; 
import axios from "axios";
import ChannelCard from "./ChannelCard";
import Videos from "./Videos";

const ChannelDetail = () => {
    const { id } = useParams();
    const [channelDetail, setChannelDetail] = useState(null);
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchChannelData = async () => {
            try{   
                const res = await axios.get(`${import.meta.env.VITE_RAPID_API_URL}/channels?part=snippet&id=${id}`, {
                    headers: {
                        'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
                        'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
                    },
                });
                setChannelDetail(res.data?.items[0]);
            } catch (err) {
                console.error(err);
            }
        };
        fetchChannelData();
    }, [id]);

    useEffect(() => {
        const fetchChannelVideoData = async () => {
            try{   
                const res = await axios.get(`${import.meta.env.VITE_RAPID_API_URL}/search?channelId=${id}&part=snippet%2Cid&order=date`, {
                    headers: {
                        'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
                        'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
                    },
                    params: {
                        type: 'video',
                        maxResults: '50'
                    }
                });
                setVideos(res.data?.items);
            } catch (err) {
                console.error(err);
            }
        };
        fetchChannelVideoData();
    }, [id]);

    return (
        <Box minHeight="95vh">
            <Box>
                <ChannelCard channelDetail={channelDetail} />
            </Box>
            <Box display="flex" p={2}>
                <Box sx={{ mr: { sm: '100px' } }} />
                <Videos videos={videos} />
            </Box>
        </Box>
    )
};

export default ChannelDetail;