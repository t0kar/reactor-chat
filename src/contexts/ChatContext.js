import React, { useState, createContext } from 'react';

import DUMMY_DATA from '../data/chat.json';

export const ChatContext = createContext({});

export const ChatProvider = (props) => {
  const [chatData, setChatData] = useState(DUMMY_DATA.data.comments);
  const [replyData, setReplyData] = useState('');

  // Sender dummy data
  const username = 'Lucija Toć';
  const picture = 'img/ivana.png';
  let id = chatData.length + 1;

  const onMessageReply = (data) => {
    setReplyData(data);
    console.log('You are replying to the message.');
  };

  const onSendMessage = (message) => {
    replyData.id !== ''
      ? setChatData((prevData) => [
          ...prevData,
          {
            id: id,
            parent_id: replyData.id,
            author: {
              name: username,
              picture: picture,
            },
            text: message,
            timestamp: Date.now(),
          },
        ])
      : setChatData((prevData) => [
          ...prevData,
          {
            id: id,
            author: {
              name: username,
              picture: picture,
            },
            text: message,
            timestamp: Date.now(),
          },
        ]);
    setReplyData('');
    console.log('Message sent!');
  };

  return (
    <ChatContext.Provider
      value={{
        chatData,
        setChatData,
        onSendMessage,
        onMessageReply,
        replyData,
      }}
    >
      {props.children}
    </ChatContext.Provider>
  );
};

export default ChatContext;
