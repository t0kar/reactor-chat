import React, { useContext } from 'react';
import dateFormat from 'dateformat';

import classes from './Comment.module.css';

import Card from '../../UI/Card/Card';

import { ChatContext } from '../../../contexts/ChatContext';

export default function Comment(props) {
  const { onMessageReply } = useContext(ChatContext);

  let commentCounter = 0;

  const otherComments = props.dataset.map(
    (comment) =>
      comment.parent_id === props.id &&
      ((commentCounter = commentCounter + 1),
      (
        <Comment
          key={comment.timestamp}
          id={comment.id}
          authorPicture={comment.author.picture}
          authorName={comment.author.name}
          text={comment.text}
          timestamp={comment.timestamp}
          dataset={props.dataset}
        />
      ))
  );

  return (
    <>
      <li className={classes.comment}>
        <img
          src={`./media/${props.authorPicture}`}
          alt='author'
          className={classes.author_picture}
        />
        <div>
          <Card className={`${classes.comment__container}`}>
            <div className={classes.author_name}>{props.authorName}</div>
            <div className={classes.text}>{props.text}</div>
          </Card>
          <div className={`${classes.comment__footer}`}>
            <div className={classes.timestamp}>
              {dateFormat(props.timestamp, 'h:MM TT')}
            </div>
            <span>·</span>
            <div
              className={classes.reply}
              onClick={() =>
                onMessageReply({ id: props.id, user: props.authorName })
              }
            >
              {`${commentCounter > 0 ? `Reply (${commentCounter})` : 'Reply'}`}
            </div>
          </div>
        </div>
      </li>
      <div className={classes.comment_container}>{otherComments}</div>
    </>
  );
}
