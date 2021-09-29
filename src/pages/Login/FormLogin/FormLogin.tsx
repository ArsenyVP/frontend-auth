import React, { useState } from 'react';
import { Box, Button, TextField } from '@material-ui/core';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { SubmitHandler, useForm } from 'react-hook-form';
import { loginUser } from '../../../store/actions/user';
import { selectError, selectUser } from '../../../store/selectors/selectors';

interface FormLoginProps {
    classes: any
}

type Inputs = {
    username: string,
    password: string,
}

const FormLogin: React.FC<FormLoginProps> = ({ classes }: FormLoginProps) : React.ReactElement | null => {
    const history = useHistory();
    const dispatch = useDispatch()
    const error = useSelector(selectError);
    const { user } = useSelector(selectUser);

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        const { username, password } = data;
        dispatch(loginUser(username, password))

        // AuthService.login(username, password).then(
        //     res => {
        //         console.log(res.data)
        //         history.push('/');
        //     }, error => {
        //         const resMessage =
        //             (error.response &&
        //                 error.response.data &&
        //                 error.response.data.message) ||
        //             error.message ||
        //             error.toString()
        //         setResMessage(resMessage);
        //     })
    }

    if(user) {
        history.push("/");
        return null;
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={classes.formLogin}>
            <Box m={1}>
                <TextField
                    placeholder="Enter your Name"
                    type="text"
                    variant="outlined"
                    {...register("username", { required: true })}
                />
            </Box>
            {errors.username && <span className={classes.error}>Username is required</span>}
            <Box m={1}>
                <TextField
                    placeholder="Enter your Password"
                    type="password"
                    variant="outlined"
                    {...register("password", { required: true })}
                />
            </Box>
            {errors.password && <span className={classes.error}>Password is required</span>}
            <Button
                color="primary"
                variant="contained"
                type="submit"
                className={classes.button}
            >
                Login
            </Button>
            {
                error && <span className={classes.errorMain}>{error}</span>
            }
        </form>
    )
}

export default FormLogin;