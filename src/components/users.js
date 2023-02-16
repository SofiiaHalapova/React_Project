import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    CssBaseline,
    AppBar, Toolbar, Drawer, MenuItem
} from "@mui/material";

function createData(
    firstName: string,
    lastName: string,
    email: string,
    isActive: boolean,
) {
    return {firstName, lastName, email, isActive};
}

const rows = [
    createData('Daria', "DariaSurname", "daria@gmail.com", true),
    createData('Sofiia', "SofiiaSurname", "sofiia@gmail.com", false),
    createData('Jane', "JaneSurname", "jane@gmail.com", false),
    createData('Carl', "CarlSurname", "carl@gmail.com", true),
    createData('James', "JamesSurname", "james@gmail.com", false),
    createData('Maria', "MariaSurname", "maria@gmail.com", true),
    createData('Lisa', "LisaSurname", "lisa@gmail.com", false),
    createData('Cassie', "CassieSurname", "Cassie@gmail.com", false),
    createData('Melissa', "MelissaSurname", "melissa@gmail.com", true),
    createData('Ryan', "RyanSurname", "ryan@gmail.com", false),

];

function getStatus(isActive) {
    if (isActive) {
        return "active";
    } else {
        return "not active";
    }
}

function Users() {

    const drawWidth = 220;

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
                        <MenuItem>Users</MenuItem>
                    </Drawer>
                </Box>

                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 3,
                        width: {sm: `calc(100% - ${drawWidth}px)`},
                    }}
                >
                    <Toolbar/>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>First name</TableCell>
                                    <TableCell align="right">Last Name</TableCell>
                                    <TableCell align="right">Email</TableCell>
                                    <TableCell align="right">Activity</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow>
                                        <TableCell>{row.firstName}</TableCell>
                                        <TableCell align="right">{row.lastName}</TableCell>
                                        <TableCell align="right">{row.email}</TableCell>
                                        <TableCell align="right">{getStatus(row.isActive)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </div>
    );
}

export default Users;