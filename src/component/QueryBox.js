import { Avatar, Input } from '@material-ui/core';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import '../css/QueryBox.css';
import { selectUser } from '../features/userSlice';
import db from '../firebase';
import Modal from 'react-modal';
import { ExpandMore } from '@material-ui/icons';
import firebase from 'firebase';
import LinkIcon from '@material-ui/icons/Link';
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";

function QueryBox() {
    const user = useSelector(selectUser);
    const [openModal, setOpenModal] = useState(false);
    const [input, setInput] = useState("");
    const [inputUrl, setInputUrl] = useState("");

    const handleQuery = (e) => {
        e.preventDefault()

        setOpenModal(false)

        db.collection('queries').add({
        query: input,
        imageUrl: inputUrl,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        user: user,
        })

        setInput("");
        setInputUrl("");
    }
    return (
        <div
            className="queryBox"
        >
            <div className="queryBox__info">
                <Avatar 
                    src={user.photo}
                />
                <h5>{user.display}</h5>
            </div>
            <div
                className = "queryBox__query"
                onClick={() => setOpenModal(true)}
            >
                <p>What is your query or link?</p>
            </div>
            <Modal
            isOpen={openModal}
            onRequestClose={() => setOpenModal(false)}
            shouldCloseOnOverlayClick = {false}
            style= {{
              overlay: {
                width: 700,
                height: 600,
                backgroundColor: "rgba(0,0,0,0.8)",
                zIndex: "1000",
                top: "50%",
                left: "50%",
                marginTop: "-300px",
                marginLeft: "-350px",
              }
            }}
          >
            <div className="modal__title">
              <h5>Add Query</h5>
              <h5>Share Link</h5>
            </div>
            <div className="modal__info">
                <Avatar
                  className="avatar"
                  src={user.photo}
                />
                <p>{user.display ? user.displayName: user.email} asked </p>
                <div className="modal__scope">
                  <PeopleAltOutlinedIcon />
                  <p>Public</p>
                  <ExpandMore />
                </div>
              </div>
              <div className="modal__field">
                <Input
                  required
                  value = {input}
                  onChange={(e) => setInput(e.target.value)}
                  type="text"
                  placeholder="Start your query with 'What', 'How', 'Why' etc."
                 />
                <div className="modal__fieldLink">
                  <LinkIcon />
                  <input
                    value = {inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                    type="text"
                    placeholder="Optional: include an image link that gives context"
                  ></input>
                </div>
              </div>
              <div className="modal__buttons">
                <button className="close" onClick={() => setOpenModal(false)}>Close</button>
                <button onClick={handleQuery} type = "submit" className="add">Add Query</button>
              </div>
          </Modal>
        
        </div>
    )
}

export default QueryBox;
