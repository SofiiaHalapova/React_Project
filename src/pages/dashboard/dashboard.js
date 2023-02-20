import {
    AppBar, Box,
    CssBaseline,
    Toolbar
} from "@mui/material";
import SideList from "./sideList";

function Dashboard() {

    return (
        <Box>
            <CssBaseline/>
            <AppBar position="fixed">
                <Toolbar/>
            </AppBar>
            <div>
                <SideList/>
            </div>
        </Box>
    );
}

export default Dashboard;