import React, { useState, useContext } from 'react';

import classes from './MessageInput.module.css';

// importing icons
import { FiSend } from 'react-icons/fi';
import { AiOutlinePlus } from 'react-icons/ai';

import Card from '../../UI/Card/Card';
import Button from '../../UI/Button/Button';

import { ChatContext } from '../../../contexts/ChatContext';

export default function MessageInput(props) {
  const [enteredMessage, setEnteredMessage] = useState('');
  const [formIsValid, setFormIsValid] = useState(false);
  const { onSendMessage, replyData } = useContext(ChatContext);

  const messageChangeHandler = (event) => {
    if (event.target.value.trim().length > 0) {
      setFormIsValid(true);
    } else setFormIsValid(false);
    setEnteredMessage(event.target.value);
  };

  const sendMessageHandler = (event) => {
    event.preventDefault();
    if (enteredMessage.trim().length === 0) {
      return;
    }
    onSendMessage(enteredMessage);
    setFormIsValid(false);
    setEnteredMessage('');
  };

  return (
    <Card className={classes.message_input}>
      <Card className={classes.icon}>
        <AiOutlinePlus />
      </Card>
      <form
        className={classes.message_input__form}
        onSubmit={sendMessageHandler}
      >
        <input
          value={enteredMessage || ''}
          onChange={messageChangeHandler}
          placeholder={`
            ${
              replyData.user !== undefined
                ? 'You are replying to ' + replyData.user
                : ''
            }`}
        />
        <Card className={classes.button_card}>
          <Button
            className={classes.button}
            type='submit'
            disabled={!formIsValid}
          >
            <FiSend />
            Send message
          </Button>
        </Card>
      </form>
    </Card>
  );
}
