import {
    AppBar,
    Box, CssBaseline,
    Drawer, MenuItem,
    Toolbar
} from "@mui/material";
import {useNavigate} from "react-router-dom";

function Content() {
    const drawWidth = 220;

    const navigate = useNavigate();
    const navigateToUsers = () => {
        navigate("/users");
    }

    return (
        <div>
            <Box sx={{display: "flex"}}>
                <CssBaseline/>
                <AppBar position="fixed">
                    <Toolbar/>
                </AppBar>
                <Box component='nav' sx={{width: {sm: drawWidth}, flexShrink: {sm: 0}}}>
                    <Drawer variant="permanent" sx={{
                        display: {xs: "none", sm: "block"},
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawWidth,
                        },
                    }}>
                        <MenuItem onClick={navigateToUsers}>Users</MenuItem>
                    </Drawer>
                </Box>
                <Box component="main" sx={{flexGrow: 1, p: 3, width: {sm: `calc(100% - ${drawWidth}px)`}}}>
                    <Toolbar/>
                </Box>
            </Box>
        </div>
    );
}

export default Content;