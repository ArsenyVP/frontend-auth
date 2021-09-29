import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { selectUser } from '../../store/selectors/selectors';
import { useSelector } from 'react-redux';

interface MenuProps {
    clearData: () => void,
}

const useStyles = makeStyles({
    menu: {
        display: "flex",
        padding: 20,
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#acacac",
        color: "#fff",

        "& ul": {
            listStyle: "none",
            display: "flex",
            "& li": {
                marginRight: 20
            }
        }
    },
    active: {
        color: "#000"
    }
})


export const Menu: React.FC<MenuProps> = ({ clearData }) => {
    const classes = useStyles();
    const history = useHistory();
    const { user } = useSelector(selectUser);

    const LogOut = () => {
        clearData();
        history.push('/signin')
    }

    return (
        <Box className={classes.menu}>
            <Typography variant="h4">
                <NavLink to="/">Logo</NavLink>
            </Typography>
            {
                user ? <ul>
                    <li>
                        <NavLink activeClassName={classes.active} to="/chat">Communication</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName={classes.active} to="/profile">Profile</NavLink>
                    </li>
                    <li onClick={LogOut}>
                        Log out
                    </li>
                </ul>
                    : <ul>
                        <li>
                            <NavLink activeClassName={classes.active} to="/signup">Registration</NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName={classes.active} to="/signin">Login</NavLink>
                        </li>
                    </ul>
            }
        </Box>
    )
}
