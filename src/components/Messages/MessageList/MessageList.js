import React, { useContext, useEffect, useRef } from 'react';
import dateFormat from 'dateformat';

// uncomment to fetch data from mock server

/* import { useQuery } from 'react-query';
import { getMessages } from '../../../api/chatApi'; */

// uncomment to apply InfiniteScroll

/* import InfiniteScroll from 'react-infinite-scroller'; */

import classes from './MessageList.module.css';

import Message from '../Message/Message';

import { ChatContext } from '../../../contexts/ChatContext';

export default function MessageList() {
  const { chatData } = useContext(ChatContext);

  // scroll automatically to last

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatData]);

  // uncomment to fetch data from mock server

  /*   const {
    isLoading,
    isError,
    data: chatData,
  } = useQuery('chatData', getMessages); */

  // uncomment to apply InfiniteScroll

  /*   const [itemsPerPage, setItemsPerPage] = useState(4);
  const [hasMore, setHasMore] = useState(true);
  const [records, setRecords] = useState(itemsPerPage);

  const loadMore = () => {
    if (records === chatData.length) {
      setHasMore(false);
    } else if (records + itemsPerPage > chatData.length) {
      setItemsPerPage(chatData.length - records);
    } else {
      setTimeout(() => {
        setRecords(records + itemsPerPage);
      }, 1000);
    }
  };

  const showMessages = (messages) => {
    let items = [];
    for (let i = 0; i < records; i++) {
      if (messages[i].parent_id === undefined) {
        items.push(
          <Message
            key={messages[i].timestamp}
            id={messages[i].id}
            authorPicture={messages[i].author.picture}
            authorName={messages[i].author.name}
            text={messages[i].text}
            timestamp={messages[i].timestamp}
            dataset={chatData}
          />
        );
      }
    }
    return items;
  }; */

  // don't render if date already exist

  const dates = new Set();

  const renderDate = (message, dateNum) => {
    const timestampDate = dateFormat(message.timestamp, 'dddd, dd.mm.yyyy.');

    dates.add(dateNum);

    return <li className={classes.date}>{timestampDate}</li>;
  };

  return (
    <ul className={classes.message_list}>
      {/*  
      
      // uncomment to fetch data from mock server
      
      {isError && <li>Something went wrong.</li>}
      {isLoading ? (
        <li>Loading...</li>
      ) : (
      
      // uncomment to apply InfiniteScroll

      <InfiniteScroll
        pageStart={0}
        loadMore={loadMore}
        hasMore={hasMore}
        loader={<li key='loading'>Loading...</li>}
        useWindow={false}
      >
        {showMessages(chatData)}
      </InfiniteScroll>
      )} */}

      {chatData.map((message) => {
        const dateNum = dateFormat(message.timestamp, 'dddd, dd.mm.yyyy.');

        return (
          message.parent_id === undefined && (
            <div key={message.timestamp / 0.5}>
              {dates.has(dateNum) ? null : renderDate(message, dateNum)}
              <Message
                key={message.timestamp}
                id={message.id}
                authorPicture={message.author.picture}
                authorName={message.author.name}
                text={message.text}
                timestamp={message.timestamp}
                dataset={chatData}
              />
            </div>
          )
        );
      })}
      <li ref={messagesEndRef} />
    </ul>
  );
}
