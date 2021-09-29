import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, CircularProgress, Typography } from '@material-ui/core';
import FormLogin from './FormLogin/FormLogin';
import { useSelector } from 'react-redux';
import { selectLoading } from '../../store/selectors/selectors';

// interface LoginProps {
//     setData: (obj: any) => void
// }

const useStyles = makeStyles({
    containerLogin: {
        "& input": {
            color: "#fff",
            borderColor: "#fff"
        }
    },
    formLogin: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },

    button: {
        marginTop: 15
    },
    error: {
        color: "red",
        margin: "10px 0"
    },
    errorMain: {
        color: "red",
        margin: "15px 0",
        fontSize: 20
    }
})

export const Login: React.FC = () => {
    const classes = useStyles();
    // const loading = useSelector(selectLoading);

    return (
        <div className={classes.containerLogin}>
            <Box m={2}>
                <Typography align="center" variant="h3" component="h2">
                    Sign In
                </Typography>
            </Box>
            <FormLogin classes={classes}/>
        </div >
    )
}
