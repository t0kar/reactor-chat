import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { getMessages } from '../../../api/chatApi';

import InfiniteScroll from 'react-infinite-scroller';

import classes from './MessageList.module.css';

import Message from '../Message/Message';

export default function MessageList() {
  const {
    isLoading,
    isError,
    data: chatData,
  } = useQuery('chatData', getMessages);

  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [hasMore, setHasMore] = useState(true);
  const [records, setRecords] = useState(itemsPerPage);

  const loadMore = () => {
    if (records === chatData.data.comments.length) {
      setHasMore(false);
    } else if (records + itemsPerPage > chatData.data.comments.length) {
      setItemsPerPage(chatData.data.comments.length - records);
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
          />
        );
      } else {
        items.push(
          <Message
            key={messages[i].timestamp}
            id={messages[i].id}
            authorPicture={messages[i].author.picture}
            authorName={messages[i].author.name}
            text={messages[i].text}
            timestamp={messages[i].timestamp}
          />
        );
      }
    }

    return items;
  };

  return (
    <ul className={classes.message_list}>
      {isError && <li>Something went wrong.</li>}
      {isLoading ? (
        <li>Loading...</li>
      ) : (
        <InfiniteScroll
          pageStart={0}
          loadMore={loadMore}
          hasMore={hasMore}
          loader={<li key='loading'>Loading...</li>}
          useWindow={false}
        >
          {showMessages(chatData.data.comments)}
        </InfiniteScroll>
      )}
    </ul>
  );
}
