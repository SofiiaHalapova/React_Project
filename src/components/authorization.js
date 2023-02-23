import React, {useState} from "react";
import {Box, Button, Checkbox, FormControlLabel, Grid, TextField} from "@mui/material";
import {Field, Form, Formik} from "formik";
import * as Yup from 'yup';
import {useNavigate} from "react-router-dom";

function Authorization() {
    const [checked, setChecked] = useState(false);

    const handleCheckboxChange = (e) => {
        setChecked(e.target.checked);
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Please enter email').email('Invalid email address'),
        password: Yup.string().required('Please enter your password')
            .min(6, 'Password is too short - should be 6 chars minimum.')
            .max(255, 'Password is too long - should be 255 chars maximum.')
            .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                'Password must contain at least one Latin letter and one number.')
    });

    const initialValues = {
        email: '',
        password: '',
    }

    const onSubmit = (values) => {
        console.log(values);
    }


    const navigate = useNavigate();
    const navigateToContent = () => {
        navigate('/dashboard');
    };


    return (
        <div className="authenticationForm" style={{padding: 30}}>
            <div className='signForm'>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    padding="20px"
                >
                    Welcome! Sign Up to our platform
                </Box>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {({errors, isValid, touched, dirty}) => (

                        <Form>
                            <Grid container spacing={3} direction={'column'} justify={'center'}
                                  alignItems={'center'}>
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
                                    <Button type='submit' variant='contained' color='primary' size='large'
                                            disabled={!dirty || !isValid}> Sign Up </Button>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button type='submit' variant='text' size='small' onClick={navigateToContent}
                                            sx={{color: 'gray'}}>Skip Authorization </Button>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default Authorization;