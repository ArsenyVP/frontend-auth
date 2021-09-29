import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, Typography, TextField, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { w3cwebsocket } from 'websocket';
import { selectUser } from '../../store/selectors/selectors';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
    block: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    containerChat: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        border: "1px solid #000",
        borderRadius: 6,
        padding: 40,
        fontSize: 18,
        height: 400,
        width: 600,
        overflowY: "scroll",
        background: "#fff"
    },
    message: {
        background: "#168aad",
        borderRadius: 10,
        color: "#fff",
        padding: 10,
        display: "inline",
        marginBottom: 15,
    },
    inputMessage: {
        fontSize: 18,
        width: "100%",
        background: "#E8F6EF"
    },
    boxSend: {
        display: "flex",
        alignItems: "center",
        "& button": {
            padding: "15px 40px",
        },
        width: 680
    }
})

export const ChatPage: React.FC = (): React.ReactElement | null => {
    const classes = useStyles();
    const PORT_WS = "ws://localhost:8000";
    const history = useHistory();
    const { user } = useSelector(selectUser);
    const ws = new w3cwebsocket(PORT_WS, user?.accessToken);

    const [message, setMessage] = useState<string>('');
    const [messageBox, setMessageBox] = useState<any>([]);

    const onChangeMessage = (e: ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    }

    const sendMessage = () => {
        if (message === "") {
            alert('Message is required')
        } else {
            ws.send(JSON.stringify(message));
            setMessage('');
        }
    }

    useEffect(() => {
        ws.onopen = () => {
            console.log("Websocket connected")
        }

        ws.onmessage = ({ data }) => {
            console.log(data)
            setMessageBox((prev: any) => [...prev, data]);
        }

        return ws.onclose = () => {
            console.log("User's just disconnnected")
        }
    }, [])

    if (localStorage.length === 0) {
        history.push("/signin");
        return null
    }

    return (
        <div className={classes.block}>
            <Typography component="h3" variant="h3" >Chat</Typography>
            <Box className={classes.containerChat}>
                {
                    messageBox && messageBox.map((m: string, index: number) => <div className={classes.message} key={index}>{m}</div>)
                }
            </Box>
            <Box className={classes.boxSend}>
                <TextField className={classes.inputMessage} variant="outlined" value={message} onChange={onChangeMessage} placeholder="Your message" type="text" />
                <Button variant="contained" color="primary" onClick={sendMessage} >Send</Button>
            </Box>
        </div>
    )
}
