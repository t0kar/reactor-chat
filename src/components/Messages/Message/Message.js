import React from 'react';
import dateFormat from 'dateformat';

import classes from './Message.module.css';

import Card from '../../UI/Card/Card';

export default function Message(props) {
  const messageComment = props.id === '2';

  return (
    <>
      {!messageComment && (
        <li className={classes.message_date}>
          {dateFormat(props.timestamp, 'dddd, dd.mm.yyyy.')}
        </li>
      )}
      <li
        className={`${classes.message} ${
          messageComment && classes.message_comment
        }`}
      >
        {messageComment && (
          <img
            src={`./media/img/comment.png`}
            alt='comment'
            className={classes.comment_sign}
          />
        )}

        <img
          src={`./media/${props.authorPicture}`}
          alt='author'
          className={classes.author_picture}
        />
        <div>
          <Card className={`${classes.message__container}`}>
            <div className={classes.author_name}>{props.authorName}</div>
            <div className={classes.text}>{props.text}</div>
          </Card>
          <div className={`${classes.message__footer}`}>
            <div className={classes.timestamp}>
              {dateFormat(props.timestamp, 'h:MM TT')}
            </div>
            <span>·</span>
            <div className={classes.reply}>Reply (2)</div>
          </div>
        </div>
      </li>
    </>
  );
}
