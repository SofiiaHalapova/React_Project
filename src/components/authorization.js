import React from "react";
import {Button, Checkbox, FormControlLabel, Grid, Paper, TextField} from "@mui/material";
import {Field, Form, Formik} from "formik";
import * as Yup from 'yup';

function Authorization() {
    const [checked, setChecked] = React.useState(false);

    const handleCheckboxChange = (e) => {
        setChecked(e.target.checked);
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Please enter email').email('Invalid email address'),
        password: Yup.string().required('Please enter your password').
        min(6, 'Password is too short - should be 6 chars minimum.').
        max(255, 'Password is too long - should be 255 chars maximum.').
        matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            'Password must contain at least one Latin letter and one number.')
    });

    const initialValues = {
        email: '',
        password: '',
    }

    const onSubmit = (values) => {
        console.log(values);
    }

    return (
        <div style={{padding: 30}}>
            <Paper style={{padding: 30}} elevation={4}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {({errors, isValid, touched, dirty}) => (
                        <Form>
                            <Grid container spacing={3} direction={'column'} justify={'center'} alignItems={'center'}>
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
                                <Grid item xs={12}>
                                    <Field
                                        name='password'
                                        type='password'
                                        as={TextField}
                                        variant='outlined'
                                        color='primary'
                                        label='Password'
                                        error={Boolean(errors.password) && Boolean(touched.password)}
                                        helperText={Boolean(touched.password) && errors.password}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={<Checkbox checked={checked} onChange={handleCheckboxChange}/>}
                                        label={"Remember me"}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button type='submit' variant='contained' color='primary' size='large' disabled={!dirty || !isValid}> Sign Up </Button>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </Paper>
        </div>
    );
}

export default Authorization;