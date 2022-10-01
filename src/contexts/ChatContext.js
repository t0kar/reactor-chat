import React, { useState, createContext } from 'react';

export const ChatContext = createContext({});

export const ChatProvider = (props) => {
  const [enteredMessage, setEnteredMessage] = useState('');
  const [formIsValid, setFormIsValid] = useState(false);

  return (
    <ChatContext.Provider
      value={{ enteredMessage, setEnteredMessage, formIsValid, setFormIsValid }}
    >
      {props.children}
    </ChatContext.Provider>
  );
};

export default ChatContext;
