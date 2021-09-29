import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Switch, Route } from 'react-router-dom';
import { ChatPage } from '../../pages/ChatPage';
import { HomePage } from '../../pages/HomePage';
import { Login } from '../../pages/Login';
import { ProfilePage } from '../../pages/ProfilePage';
import { Register } from '../../pages/Register';
import { getUser, logoutUser } from '../../store/actions/user';
import { Menu } from '../Menu';

const MainSide: React.FC = () => {
    const dispatch = useDispatch();

    const clearData = useCallback(() => {
        dispatch(logoutUser())
        localStorage.clear();
    }, [dispatch]);

    useEffect(() => {
        dispatch(getUser());
    }, [])

    return (
        <div>
            <Menu clearData={clearData} />
            <Switch>
                <Route path="/" exact>
                    <HomePage />
                </Route>
                <Route path="/signup" exact>
                    <Register />
                </Route>
                <Route path="/signin" exact>
                    <Login />
                </Route>
                <Route path="/profile" exact >
                    <ProfilePage />
                </Route>
                <Route path="/chat" exact>
                    <ChatPage />
                </Route>
            </Switch>
        </div>
    )
}

export default MainSide
