import { auth, provider } from "../Config/Firebase";
import { signInWithPopup } from "firebase/auth";
import { Box, Button } from "@mui/material"
import GoogleIcon from '@mui/icons-material/Google';
import { useNavigate } from "react-router-dom";
import { logo } from "../utils/constants";

const SignIn = () => {
    const navigate = useNavigate();

    const handleSignIn = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                navigate("/");
            })
            .catch((error) => {
                console.error(err);
            });
    };

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: "2rem",
                backgroundColor: "#18191A",
                height: "100vh",
            }}
            >
                <img src={logo} alt="logo" width="30%" height="12%" />    
                
                <Button
                    variant="outlined"
                    color="error"
                    sx={{
                        color: "#f7f7f7",
                        backgroundColor: "#18191A",
                        height: "8%",
                        width: "15%",
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        borderRadius: "10px",
                        padding: "1rem",
                    }}
                    onClick={handleSignIn}
                    endIcon={<GoogleIcon />}
                >
                    Sign In
                </Button>
        </Box>
    );
};

export default SignIn;