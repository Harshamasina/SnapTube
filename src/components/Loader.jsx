import { Box, Stack } from "@mui/material";
import { TailSpin } from "react-loader-spinner";

const Loader = () => {
    <Box minHeight="95vh">
        <Stack direction="row" justifyContent="center" alignItems="center" height="80vh">
            <TailSpin
                height="80"
                width="80"
                color="#ff0000"
                ariaLabel="tail-spin-loading"
                radius="3"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </Stack>
    </Box>
};

export default Loader;