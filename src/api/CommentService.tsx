import axios from "axios";


export default class CommentService {
  static async getAllComments() {
    const response =  await axios.get(`https://journa-token.onrender.com/comments/get/all?onlyApproved=false`); 
    return response["data"]["data"];
  }


  static async getCommentsByArticleId(id: string) {
    const response =  await axios.get(`https://journa-token.onrender.com/comments/get/all?onlyApproved=false`); 
    return response["data"]["data"].filter(item => item["articleId"] == id);
  }


  static async getApprovedCommentsByArticleId(id: string) {
    const response =  await axios.get(`https://journa-token.onrender.com/comments/get/all?onlyApproved=false`); 
    return response["data"]["data"].filter(item => item["articleId"] == id && item["isApproved"]);
  }


  static async getNotApprovedCommentsByArticleId(id: string) {
    const response =  await axios.get(`https://journa-token.onrender.com/comments/get/all?onlyApproved=false`); 
    return response["data"]["data"].filter(item => item["articleId"] == id && !item["isApproved"]);
  }


  static async getCommentById(id: string) {
    const response =  await axios.get(`https://journa-token.onrender.com/comments/get/all?onlyApproved=false`); 
    return response["data"]["data"].filter(item => item["id"] == id);
  }


  static async createComment(articleId: string, content: string) {
    const response = await fetch('https://journa-token.onrender.com/comments/create', {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json'
        // "Authorization": `Bearer ${window.localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        "articleId": articleId,
        "content": content,
        "date":"2003-11-01T12:00:00Z"
    })
    }).then(result => {
      return result;
    });

    return response;
  }


  static async approveComment(id: string) {
    const response = await fetch('https://journa-token.onrender.com/admin/comments/approve', {
      method: 'PATCH',
      headers: {
        "Content-Type": 'application/json',
        "Authorization": `Bearer ${window.localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        "id": id,
        "content": "contentEng"
    })
    }).then(result => {
      return result;
    });

    return response;
  }

  
  static async deleteComment(commentId: string) {
    const response = await fetch(`https://journa-token.onrender.com/admin/comments/delete/${commentId}`, {
      method: 'DELETE',
      headers: {
        "Authorization": `Bearer ${window.localStorage.getItem('token')}`
      }
    }).then(result => {
      return result;
    });

    return response;
  }
}