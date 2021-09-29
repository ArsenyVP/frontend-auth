import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@material-ui/core';
import { AuthService } from '../../common/auth/auth-service';
import { SubmitHandler, useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/styles';
import { useHistory } from 'react-router';

const useStyles = makeStyles({
    containerRegister: {
        "& input": {
            color: "#fff",
            borderColor: "#fff"
        }
    },
    error: {
        color: "red",
        padding: "10px 0"
    },
    errorMain: {
        color: "red",
        margin: "15px 0",
        fontSize: 20
    }
})

type Inputs = {
    username: string,
    email: string,
    password: string
}

export const Register: React.FC = (): React.ReactElement => {
    const classes = useStyles();
    const [resMessage, setResMessage] = useState<any>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const history = useHistory();

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        const { username, password, email } = data;

        AuthService.register(username, email, password).then((res) => {
            setResMessage(res.data.message);
            alert(res.data.message)
            history.push('/signin')
        }, error => {
            const resErrorMessage =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            setErrorMessage(resErrorMessage);
            console.log(resMessage)
        })
    };

    return (
        <div className={classes.containerRegister}>
            <Box m={2}>
                <Typography align="center" variant="h3" component="h2">
                    Sign Up
                </Typography>
            </Box>
            <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Box m={1}>
                    <TextField
                        placeholder="Enter your Name"
                        type="text"
                        variant="outlined"
                        {...register('username', { required: true, minLength: 2 })}
                    />
                </Box>
                {errors.username?.type === "required" && <span className={classes.error}>Username is required</span>}
                {errors.username?.type === "minLength" && <span className={classes.error}>Your name required to be more than 2 symbols</span> }
                <Box m={1}>
                    <TextField
                        placeholder="Enter your Email"
                        type="email"
                        variant="outlined"
                        {...register("email", { required: true })}
                    />
                </Box>
                {errors.email?.type === "required" && <span className={classes.error}>Email is required</span>}
                <Box m={1}>
                    <TextField
                        placeholder="Enter your Password"
                        type="password"
                        variant="outlined"
                        {...register("password", { required: true, minLength: 6, maxLength: 50 })}
                    />
                </Box>
                {errors.password?.type === "required" && <span className={classes.error}>Password is required</span>}
                {errors.password?.type === "minLength" && <span className={classes.error}>Password should be more 5 symbols</span> }
                {errors.password?.type === "maxLength" && <span className={classes.error}>Password should be less than 50 symbols</span> }
                <Button type="submit" color="primary" variant="contained">Register</Button>
                {
                    errorMessage && <span className={classes.errorMain}>{errorMessage}</span>
                }
            </form>
        </div >
    )
}
