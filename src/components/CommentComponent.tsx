import React, {useState, useEffect, useRef} from 'react';
import { useFetching } from '../hooks/useFetching';
import IssueService from '../api/IssueService';
// import image from "../assets/user.svg";

const CommentComponent = ({comment}) => {
  const date = new Date(comment["date"]);
  const [fetchCommentApprove, isCommentApproveLoading, commentApproveError] = useFetching(async () => {
    // console.log('commentsResponse');
    const commentsResponse = await IssueService.approveComment(comment["id"]);
    console.log(commentsResponse);
  });
  const [fetchCommentDelete, isCommentDeleteLoading, commentApproveLoadingError] = useFetching(async () => {
    // console.log('commentsResponse');
    const commentsResponse = await IssueService.deleteComment(comment["id"]);
    console.log(commentsResponse);
  });


  return (
    <div className="article__comment">
      <div className="comment__image">
        {/* <img src={image} alt="" /> */}
      </div>
      <div className="comment__description">
        <p className="comment__text">{comment["content"]["Ru"]}</p>
        <p className="comment__date">21.12.24</p>
      </div>
      {comment["isApproved"] ? <></> : <button className="comment__button" onClick={() => fetchCommentApprove()}>одобрить</button>}
      <button className="comment__button" onClick={() => fetchCommentApprove()}>Удалить</button>
    </div>
  );
};

export default CommentComponent;