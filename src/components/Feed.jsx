import { useState, useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";
import SideBar from "./SideBar";
import Videos from "./Videos";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { Helmet } from "react-helmet";

const Feed = () => {
    const [selectedCategory, setSelectedCategory] = useState("New");
    const [videos, setVideos] = useState(null);
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        const fetchFeedData = async () => {
            try{   
                const res = await axios.get(`${import.meta.env.VITE_RAPID_API_URL}/search?part=snippet&q=${selectedCategory}`, {
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
        fetchFeedData();
    }, [selectedCategory]);

    return (
        <div>
            <Helmet>
                <title>{`${selectedCategory} Videos - SnapTube`}</title>
            </Helmet>

            <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
                <Box 
                    sx={{ 
                        height: { sx: "auto", md: "92vh" }, 
                        borderRight: "1px solid #3d3d3d", 
                        px: { sx: 0, md: 2 } 
                    }}
                >
                    <SideBar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

                    <Typography className="copyright" variant="body2" sx={{ mt: 1.5, color: "#fff", }}>
                        Copyright © 2023 Mani Harsha
                    </Typography>
                </Box>

                <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
                    <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "white", textTransform: "uppercase" }}>
                        Hi, <span style={{ color: "#BF0000" }}>{currentUser.displayName}</span>
                    </Typography>

                    <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "white" }}>
                        <span style={{color: "#BF0000"}}>{selectedCategory}</span> Videos
                    </Typography>
                    <Videos videos={videos} />
                </Box>
            </Stack>
        </div>
    )
};

export default Feed;