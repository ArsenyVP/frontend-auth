import React from 'react'
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/selectors/selectors';

const useStyles = makeStyles({
    center: {
        textAlign: "center"
    }
})

export const HomePage: React.FC = () => {
    const classes = useStyles()
    const { user } = useSelector(selectUser);

    return (
        <div>
            {
                localStorage.length > 0 ? <Box m={5}>
                    <Typography variant="h4">
                        Hello <strong>{user?.username}</strong>
                    </Typography>
                    <Typography variant="h5">Welcome to Website</Typography>
                </Box> :
                    <Box m={5}>
                        <Typography className={classes.center} variant="h3">
                            Welcome to Auth Website
                        </Typography>
                    </Box>
            }
        </div>
    )
}
