import React, { useEffect, useState } from 'react'
import "./Chat.css"
import { Avatar, IconButton } from "@material-ui/core"
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import MoreVert from '@material-ui/icons/MoreVert';
import AttachFile from '@material-ui/icons/AttachFile';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import SelectInput from '@material-ui/core/Select/SelectInput';
import { useParams } from 'react-router-dom';
import db from './firebase';
import { useStateValue } from './StateProvider';
import firebase from 'firebase';
import NewFile from './NewFile';
import FileCard from './FileCard';
import FileItem from './FileItem';

function Chat() {
    const [input, setInput] = useState();
    const {roomId} =useParams(); 
    const [seed, setSeed] = useState('');
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{user}, dispatch] = useStateValue();

    const [files, setFiles] = useState([])

useEffect(() => {
    db.collection('myFiles').onSnapshot(snapshot => {
        setFiles(snapshot.docs.map(doc => ({
            id: doc.id,
            item: doc.data()
        })))
    })
}, [])

    useEffect(() => {
        if(roomId){
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => (
                setRoomName(snapshot.data().name)
            ))

            db.collection('rooms').doc(roomId).collection("messages").orderBy('timestamp','asc').onSnapshot(snapshot =>(
                setMessages(snapshot.docs.map((doc) =>doc.data()))
            ))
        }
    }, [roomId])

    useEffect(() => {
        setSeed(Math.floor(Math.random()* 5000));
    }, []);


    const sendMessage = (e) =>{
        e.preventDefault();
        console.log(input);

        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })

        setInput("");
    }



    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="chat__headerInfo">
                    <div>
                        <h3>{roomName}</h3>
                        <p>last seen {" "}
                            {new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()}
                        </p>
                    </div>
                    <div>
                    <img className="video" src="https://img.icons8.com/external-dreamstale-lineal-dreamstale/32/000000/external-video-call-phone-dreamstale-lineal-dreamstale.png"/>
                    <img className="call" src="https://img.icons8.com/ios-glyphs/30/000000/phone--v1.png"/>
                    </div>
                </div>
                {/* <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined/>
                    </IconButton>
                    <IconButton>
                        <AttachFile/>
                    </IconButton>
                    <IconButton>
                        <MoreVert/>
                    </IconButton>
                </div> */}
            </div>
            <div className="chat__body">
            {messages.map(message =>(
                <p className={`chat__message ${message.name ===user.displayName && 'chat__receiver'}`}><span className="chat__name">{message.name}</span>{message.message}
                <span className="chat__timestamp">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
                </p>

            ))}

            {/* {
                    files.slice(0, 5).map(({ id, item }) => (
                        <FileCard name={item.caption} />
                    ))

                } */}

                {
                files.map(({ id, item }) => (
                    <FileItem id={id} caption={item.caption} timestamp={item.timestamp} fileUrl={item.fileUrl} size={item.size} />
                ))
            }

            </div>
            <div className="chat__footer">
                <InsertEmoticonIcon/>
                <form>
                    <input value={input} onChange={e => setInput(e.target.value)} type="text" />
                    <button onClick={sendMessage} type="submit">Send a Message</button>
                </form>
                {/* <AttachFile/> */}
                <NewFile/>
                <MicIcon/>
            </div>
        </div>
    )
}

export default Chat
