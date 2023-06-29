import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Paper, IconButton, InputBase } from "@mui/material";
import Search from '@mui/icons-material/Search';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    
    const onHandleSubmit = (e) => {
        e.preventDefault();
        if(searchTerm){
            navigate(`/search/${searchTerm}`)
            setSearchTerm("");
        }
    };
    
    return (
        <Paper
            component="form"
            sx={{
                display: "flex",
                alignItems: "center",
                borderRadius: "50px",
                border: "1px solid gray",
                pl: 2,
                boxShadow: "none",
                mr: { sm: 5 },
                width: "500px",
                height: "40px",
                background: "#18191A",
            }}
        >
            <InputBase
                className="search-bar"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <IconButton
                type="submit"
                sx={{ p: "10px", color: "gray" }}
                aria-label="search"
                onClick={onHandleSubmit}
            >
                <Search color="inherit" />
            </IconButton>
        </Paper>
    )
};

export default SearchBar;