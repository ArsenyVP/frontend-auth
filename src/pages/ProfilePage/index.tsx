import { Box, Button, Container, Input, makeStyles, Typography, TextField, CircularProgress } from '@material-ui/core';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import { AuthService } from '../../common/auth/auth-service';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { SubmitHandler, useForm } from 'react-hook-form';
import { selectUser } from '../../store/selectors/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../store/actions/user';

type Inputs = {
    oldPassword: string,
    newPassword: string,
    confNewPassword: string
}

const useStyles = makeStyles({
    container: {
        marginTop: 20
    },
    center: {
        textAlign: "center"
    },
    nameContainer: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        "& button": {
            marginLeft: 30
        }
    },
    editBtn: {
        background: "green",
        color: "white"
    },
    closeBtn: {
        background: "#FF4500",
        color: "white"
    },
    boxName: {
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        "& input": {
            fontSize: 20
        }
    },
    boxEmail: {
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        "& input": {
            fontSize: 20
        },
        fontSize: 18
    },
    boxPassword: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        "& button:first-child": {
            marginLeft: 0
        }
    },
    blockConfirm: {
        marginTop: 20
    },
    boxInput: {
        margin: 10
    },
    boxButtons: {
        marginTop: 20,
        "& button:last-child": {
            marginLeft: 20
        }
    },
    success: {
        color: "#70e000"
    },
    error: {
        color: "red",
        margin: "10px 0"
    },
})

export const ProfilePage: React.FC = (): React.ReactElement | null => {
    const classes = useStyles()
    const history = useHistory();
    const { user } = useSelector(selectUser);
    const dispatch = useDispatch();

    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<Inputs>();

    const [editName, setEditName] = useState<boolean>(false);
    const [nameValue, setNameValue] = useState<string | undefined>(undefined);

    const [editPass, setEditPass] = useState<boolean>(false);
    const [confirmedPass, setConfirmedPass] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [messageError, setMessageError] = useState<string>("");

    const handleEditName = () => {
        setEditName((prev) => !prev);
    }

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        let body = {
            current_password: data.oldPassword,
            new_password: data.newPassword
        }

        AuthService.resetPassword(user?.accessToken, body).then(res => {
            console.log(res)
            if (res.data.username) {
                handleConfirmPass()
                setSuccess(true);
            }

            if (res.data.message) {
                setMessageError(res.data.message)
            }
        }).catch(e => {
            setMessageError(e.data.message)
        })
    };

    const handleEditPass = () => {
        setEditPass((prev) => !prev);
        reset({
            oldPassword: '',
            newPassword: '',
            confNewPassword: ''
        })
    }

    const handleConfirmPass = () => {
        setConfirmedPass((prev) => !prev)
    }

    const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        setNameValue(e.target.value);
    }

    const updateName = useCallback(() => {
        let body = {
            username: nameValue
        }

        dispatch(updateUser(user?.id, user?.accessToken, body))
        handleEditName()
    }, [nameValue, user?.id, user?.accessToken, dispatch])

    useEffect(() => {
        setNameValue(user?.username);
    }, [user?.username])

    if (localStorage.length === 0) {
        history.push('/signin');
        return null;
    }

    return (
        <Container className={classes.container} maxWidth="sm">
            <Typography className={classes.center} component="h3" variant="h2">Account</Typography>
            {
                user && <Box>
                    <Box m={5} className={classes.nameContainer}>
                        
                        {
                            editName ? <Box className={classes.boxName}>
                                <Input onChange={onChangeName} value={nameValue} placeholder="Your Name" type="text" />
                                <Button className={classes.editBtn} onClick={updateName}>Edit</Button>
                                <Button onClick={handleEditName} color="secondary" variant="contained">
                                    <CancelIcon />
                                </Button>
                            </Box> :
                                <Box className={classes.boxName}>
                                    <Typography variant="h4">{nameValue}</Typography>
                                    <Button onClick={handleEditName} color="primary" variant="contained">Edit</Button>
                                </Box>
                        }
                    </Box>
                    <Box className={classes.boxEmail} m={5}>
                        <div>
                            <strong>Email:</strong>{" "}
                            {user?.email}
                        </div>
                    </Box>
                    {
                        confirmedPass ? <Box className={classes.boxPassword}>
                            {
                                success && <Typography className={classes.success} variant="h5">Passoword was changed successfully</Typography>
                            }
                        </Box> : (editPass ? <form onSubmit={handleSubmit(onSubmit)} className={classes.boxPassword}>
                            <Box className={classes.boxInput}>
                                <TextField {...register("oldPassword", { required: true })} variant="outlined" placeholder="Confirm prev password" />
                            </Box>
                            <Box className={classes.boxInput}>
                                <TextField {...register("newPassword", { required: true })} variant="outlined" placeholder="New Password" />
                            </Box>
                            <Box className={classes.boxInput}>
                                <TextField {...register("confNewPassword", { required: true, validate: value => value === watch("newPassword") })} variant="outlined" placeholder="New Password" />
                            </Box>
                            {errors.confNewPassword && <span className={classes.error}>Password must be equel to new</span>}
                            <Box className={classes.boxButtons}>
                                <Button type="submit" color="primary" variant="contained">
                                    <CheckCircleIcon />
                                </Button>
                                <Button onClick={handleEditPass} className={classes.closeBtn} variant="contained">
                                    <CancelIcon />
                                </Button>
                            </Box>
                            {
                                messageError && <Typography className={classes.error} variant="h5">{messageError}</Typography>
                            }
                        </form>
                            : <Box className={classes.boxPassword} m={5}>
                                <Typography variant="h6">
                                    Do you wanna change your password?
                                </Typography>
                                <Button className={classes.blockConfirm} onClick={handleEditPass} variant="contained">Yes</Button>
                                {
                                    success && <Typography className={classes.success} variant="h3" component="h3">Passoword was changed successfully</Typography>
                                }
                            </Box>)
                    }
                </Box>
            }
        </Container >
    );
}
