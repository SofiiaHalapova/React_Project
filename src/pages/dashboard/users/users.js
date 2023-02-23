import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    Toolbar,
    Button,
    Dialog,
    DialogActions,
    DialogContentText,
    TextField,
    Grid,
    DialogContent, DialogTitle, IconButton
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {Delete, Edit} from "@mui/icons-material";

function createData(
    firstName: string,
    lastName: string,
    email: string,
    isActive: boolean,
) {
    return {firstName, lastName, email, isActive};
}


function getStatus(isActive) {
    if (isActive) {
        return "active";
    } else {
        return "not active";
    }
}

function getUserForm(errors, touched) {
    return (
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
    );
}

function Users() {

    const [getUsers, setUsers] = useState([]);
    const [getIndex, setIndex] = useState(-1);


    useEffect(() => {
        fetch('http://localhost:5000/users')
            .then(res => res.json())
            .then(data => {
                setUsers(data);
            })
            .catch(error => console.log(error));
    }, []);


    const handleDeleteRow = (id) => {
        fetch('http://localhost:5000/users/' + id, {method: 'DELETE'})
            .then(res => {
                if (res.ok) {
                    setUsers(getUsers.filter((user, index) => index !== id));
                } else {
                    throw new Error('Error deleting user');
                }
            })
            .catch(error => console.log(error));
        deleteUserDialogClose();
    };


    const handleChangeValue = async (id, firstName, lastName, email) => {
          await fetch(`http://localhost:5000/users/` + id, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({firstName, lastName, email})
        })
            .then(res =>
                res.json())
            .then(data => {
                let users = getUsers;
                users[id] = createData(data.user.firstName, data.user.lastName, data.user.email, true);
                setUsers(users);
            })
            .catch(err => console.error(err));
    };


    const [openAddUserDialog, setOpenAddUserDialog] = useState(false);

    const addUserDialogOpen = () => {
        setOpenAddUserDialog(true);
    }

    const handleAddUserDialogClose = () => {
        setOpenAddUserDialog(false);
    }

    const [openDeleteUserDialog, setOpenDeleteUserDialog] = useState(false);


    const deleteUserDialogOpen = (index) => {
        setIndex(index);
        setOpenDeleteUserDialog(true);
    }

    const deleteUserDialogClose = () => {
        setIndex(-1);
        setOpenDeleteUserDialog(false);
    }

    const [openEditDialog, setOpenEditDialog] = useState(false);

    const [getRow, setRow] = useState('');

    const editDialogOpen = (row, index) => {
        setIndex(index);
        setRow(row);
        setOpenEditDialog(true);
    }

    const editDialogClose = () => {
        setIndex(-1);
        setRow('');
        setOpenEditDialog(false);
    }


    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('Please enter your name'),
        lastName: Yup.string().required('Please enter your surname'),
        email: Yup.string().required('Please enter email').email('Invalid email address')
    });

    const addNewValue = (name, lastname, email) => {
        const data = createData(name, lastname, email, true);
        getUsers.push(data);
    }


    return (
        <Box>
            <Toolbar/>
            <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <span>
                    <h3>Users</h3>
                </span>
                <Button
                    onClick={addUserDialogOpen}
                    variant="outlined"
                    style={{
                        height: '50%',
                        display: "flex",
                        alignSelf: 'center'
                    }}
                >
                    Add User
                </Button>
                <Dialog open={openAddUserDialog}
                        onClose={handleAddUserDialogClose}
                        PaperProps={{onClick: e => e.stopPropagation()}}
                >
                    <DialogTitle>Add User</DialogTitle>
                    <DialogContent>
                        <DialogContentText sx={{p: 3}}>
                            To add user fill in required information.
                        </DialogContentText>
                        <Formik
                            initialValues={{
                                firstName: '',
                                lastName: '',
                                email: '',
                            }}
                            validationSchema={validationSchema}
                            onSubmit={values => {
                                addNewValue(values.firstName, values.lastName, values.email);
                                handleAddUserDialogClose();
                            }}
                        >
                            {({errors, touched, isValid}) => (
                                <Form>
                                    {getUserForm(errors, touched)}
                                    <DialogActions>
                                        <Button onClick={handleAddUserDialogClose}>Cancel</Button>
                                        <Button type='submit' disabled={!isValid}>Add Users</Button>
                                    </DialogActions>
                                </Form>
                            )}
                        </Formik>
                    </DialogContent>
                </Dialog>
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>First name</TableCell>
                            <TableCell align="center">Surname</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">Activity</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {getUsers.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{row.firstName}</TableCell>
                                <TableCell align="center">{row.lastName}</TableCell>
                                <TableCell align="center">{row.email}</TableCell>
                                <TableCell align="center">{getStatus(row.isActive)}</TableCell>
                                <TableCell align="center">
                                    <IconButton
                                        onClick={() => deleteUserDialogOpen(index)}
                                    >
                                        <Delete/>
                                    </IconButton>
                                    <IconButton
                                        onClick={() => editDialogOpen(row, index)}
                                    >
                                        <Edit/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <Dialog open={openDeleteUserDialog}
                            onClose={deleteUserDialogClose}
                            PaperProps={{onClick: e => e.stopPropagation()}}
                    >
                        <DialogTitle align='center'>
                            Confirm Delete
                        </DialogTitle>
                        <DialogContent>
                            <DialogActions>
                                <Button onClick={deleteUserDialogClose}>Cancel</Button>
                                <Button onClick={() => handleDeleteRow(getIndex)}>Delete</Button>
                            </DialogActions>
                        </DialogContent>

                    </Dialog>
                    <Dialog open={openEditDialog}
                            onClose={editDialogClose}
                            PaperProps={{onClick: e => e.stopPropagation()}}
                    >
                        <DialogTitle align='center'>Edit User Information</DialogTitle>
                        <DialogContent>
                            <DialogContentText sx={{p: 3}}>
                                To edit user information fill in the form.
                            </DialogContentText>
                            <Formik
                                initialValues={{
                                    firstName: getRow.firstName,
                                    lastName: getRow.lastName,
                                    email: getRow.email,
                                }}
                                validationSchema={validationSchema}
                                onSubmit={ async (values) =>  {
                                    await handleChangeValue(getIndex, values.firstName, values.lastName, values.email);
                                    editDialogClose();
                                }}
                            >
                                {({errors, touched, isValid}) => (

                                    <Form>
                                        {getUserForm(errors, touched)}
                                        <DialogActions>
                                            <Button onClick={editDialogClose}>Cancel</Button>
                                            <Button type='submit' disabled={!isValid}>Edit</Button>
                                        </DialogActions>
                                    </Form>
                                )}
                            </Formik>
                        </DialogContent>
                    </Dialog>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default Users;