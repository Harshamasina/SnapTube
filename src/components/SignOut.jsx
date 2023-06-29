import { Box, Button } from "@mui/material";
import { auth } from "../Config/Firebase";
import { signOut } from "firebase/auth";
import LogoutIcon from '@mui/icons-material/Logout';
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const SignOut = () => {
    const { currentUser } = useContext(AuthContext);

    const handleSignOut = () => {
        signOut(auth).then(() => {
            window.alert("Signed Out Successfully");
            localStorage.removeItem('user');
            navigate('/signin');
        }).catch((err) => {
            console.log(err);
        });
    };

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "15px",
            }}
        >
            <img src={currentUser.photoURL} alt="user" width="45px" height="45px" style={{ borderRadius: "50%" }}/>
            
            <Button
                variant="outlined" 
                color="error"
                onClick={handleSignOut}
                endIcon={<LogoutIcon />}
                >
                    Sign Out
            </Button>
        </Box>
    );
};

export default SignOut;