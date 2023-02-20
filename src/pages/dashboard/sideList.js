import {Box, Drawer, List, ListItem, ListItemButton, ListItemText} from "@mui/material";
import {useMemo} from "react";
import Users from "./users/users";
import {Route, Routes, useNavigate} from "react-router-dom";


function SideList() {
    const drawWidth = '220px';

    const navigate = useNavigate();

    const list = useMemo(() => [
        {
            title: 'Users',
            link: 'users',
            component: <Users/>
        },
    ], [])


    return (
        <Box>
            <Box component='nav' sx={{width: {sm: drawWidth}, flexShrink: {sm: 0}}}>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: {xs: 'none', sm: 'block'},
                        '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawWidth},
                    }}
                >
                    <List>
                        {list.map((item) => (
                            <ListItem key={item.title}>
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: 'center',
                                        px: 2.5,
                                    }}
                                    onClick={() => navigate(item.link)}
                                >
                                    <ListItemText primary={item.title}/>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{
                    p: 3,
                    marginLeft: drawWidth,
                }}
            >
                <Routes>
                    {list.map(item => (
                        <Route key={item.title} path={item.link} element={item.component}/>
                    ))}
                </Routes>
            </Box>
        </Box>
    );
}

export default SideList;