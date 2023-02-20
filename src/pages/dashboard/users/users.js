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
        <Box >
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
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>First name</TableCell>
                            <TableCell align="right">Surname</TableCell>
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
    );
}

export default Users;