import { Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { logo } from "../utils/constants";
import SearchBar from "./SearchBar";
import SignOut from "./SignOut";

const Navbar = () => {
    return (
        <Stack direction="row" alignItems="center" p={2} 
            sx={{ 
                position: "sticky", 
                top: 0, 
                backgroundColor: "#18191A", 
                justifyContent: "space-between", 
                zIndex: 10 
            }}
        >
            <Link to="/" style={{ display: "flex", alignItems: "center" }}>
                <img src={logo} alt="logo" height="45" />
            </Link>
            <SearchBar />
            <SignOut /> 
        </Stack>
    )
};

export default Navbar;