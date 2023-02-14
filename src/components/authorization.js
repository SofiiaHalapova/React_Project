import React from "react";
import {Button, Checkbox, FormControlLabel, Grid, Paper, TextField} from "@mui/material";

function Authorization() {
    const [checked, setChecked] = React.useState(false);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    }
    return (
        <div style={{padding: 30}}>
            <Paper elevation={4}>
                <Grid container spacing={3} direction={'column'} justify={'center'} alignItems={'center'}>
                    <Grid item xs={12}>
                        <TextField label="Email"></TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Password" type={'password'}></TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={<Checkbox checked={checked} onChange={handleChange}/>}
                            label={"Remember me"}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Button> Login </Button>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}

export default Authorization;