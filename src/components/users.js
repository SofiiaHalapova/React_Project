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
    AppBar,
    Toolbar,
    Drawer,
    MenuItem,
    Button,
    Dialog,
    DialogActions,
    DialogContentText,
    TextField,
    Grid,
    DialogContent, DialogTitle
} from "@mui/material";
import React, {useState} from "react";
import {Field, Form, Formik} from "formik";
import * as Yup from "yup";

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

    const [open, setOpen] = useState(false);

    const handleDialogOpen = () => {
        setOpen(true);
    }

    const handleDialogClose = () => {
        setOpen(false);
    }

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('Please enter your name'),
        lastName: Yup.string().required('Please enter your surname'),
        email: Yup.string().required('Please enter email').email('Invalid email address')
    });

    const initialValues = {
        firstName: '',
        lastName: '',
        email: '',
    }

    const addNewValue = (name, lastname, email) => {
        let active = true;
        const data = createData(name, lastname, email, active);
        rows.push(data);
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
                    <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <span>
                            <h3>Users</h3>
                        </span>
                        <Button
                            onClick={handleDialogOpen}
                            variant="outlined"
                            style={{
                                height: '50%',
                                display: "flex",
                                alignSelf: 'center'
                            }}
                        >
                            Add User
                        </Button>
                        <Dialog open={open}
                                onClose={handleDialogClose}
                                PaperProps={{onClick: e => e.stopPropagation()}}
                        >
                            <DialogTitle>Add User</DialogTitle>
                            <DialogContent>
                                <DialogContentText sx={{p: 3}}>
                                    To add user fill in required information.
                                </DialogContentText>
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    onSubmit={values => {
                                        addNewValue(values.firstName, values.lastName, values.email);
                                        handleDialogClose();
                                    }}
                                >
                                    {({errors, touched, isValid}) => (

                                        <Form>
                                            <Grid container spacing={3} direction={'column'} justify={'center'}
                                                  alignItems={'center'}>
                                                <Grid item xs={12}>
                                                    <Field
                                                        name='firstName'
                                                        type='text'
                                                        as={TextField}
                                                        variant='outlined'
                                                        color='primary'
                                                        label='Name'
                                                        error={Boolean(errors.firstName) && Boolean(touched.firstName)}
                                                        helperText={Boolean(touched.firstName) && errors.firstName}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Field
                                                        name='lastName'
                                                        type='text'
                                                        as={TextField}
                                                        variant='outlined'
                                                        color='primary'
                                                        label="Surname"
                                                        error={Boolean(errors.lastName) && Boolean(touched.lastName)}
                                                        helperText={Boolean(touched.lastName) && errors.lastName}
                                                    />

                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Field
                                                        name='email'
                                                        type='email'
                                                        as={TextField}
                                                        variant='outlined'
                                                        color='primary'
                                                        label='Email'
                                                        error={Boolean(errors.email) && Boolean(touched.email)}
                                                        helperText={Boolean(touched.email) && errors.email}
                                                    />
                                                </Grid>
                                            </Grid>
                                            <DialogActions>
                                                <Button onClick={handleDialogClose}>Cancel</Button>
                                                <Button type='submit' disabled={!isValid}>Add Users</Button>
                                            </DialogActions>
                                        </Form>
                                    )}
                                </Formik>
                            </DialogContent>
                        </Dialog>
                    </Box>
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
                                {rows.map((row, index) => (
                                    <TableRow key={index}>
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