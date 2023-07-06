import { Box, Button } from "@mui/material";
import { auth } from "../Config/Firebase";
import { signOut } from "firebase/auth";
import LogoutIcon from '@mui/icons-material/Logout';
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';

const SignOut = () => {
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSignOut = () => {
        const confirmed = window.confirm(`${currentUser.displayName}, Are you sure you want to sign out?`);

        if (confirmed) {
        signOut(auth)
            .then(() => {
            window.alert("Signed Out Successfully");
            localStorage.removeItem('login');
            navigate('/signin');
            })
            .catch((err) => {
            console.log(err);
            });
        }
    };

    return (
        <Box>
            <Accordion
                sx={{
                    background: "transparent",
                    boxShadow: "none",
                    "&::before": {
                        display: "none",
                    },
                }}
            >
                <AccordionSummary
                    sx={{
                        minHeight: 0,
                        height: "auto",
                        "&.Mui-expanded": {
                        minHeight: 0,
                        },
                    }}
                >
                    <Box
                        display="flex"
                        alignItems="center"
                        width="45px"
                        height="45px"
                        style={{ borderRadius: "50%" }}
                    >
                        <img src={currentUser.photoURL} alt="user" width="100%" height="100%" style={{ objectFit: "cover", borderRadius: "50%" }} />
                    </Box>
                </AccordionSummary>

                <AccordionDetails
                    sx={{
                        justifyContent: "center",
                        padding: 0,
                    }}
                >
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={handleSignOut}
                        endIcon={<LogoutIcon />}
                    >
                        Sign Out
                    </Button>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
};

export default SignOut;
