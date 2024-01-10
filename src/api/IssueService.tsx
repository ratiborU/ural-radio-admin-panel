// import { getAllIssues, getIssueById } from "../mock/Issues"
// import { getAllReductors } from "../mock/reductors";
// import { getFileById } from "../mock/files";
// import { getAllArticles, getArticlesByIssueId, getArticleById } from "../mock/articles";
// import { getAllComments, getCommentsByArticleId, getCommentById } from "../mock/comments";
import axios from "axios";


export default class IssuesService {
  // Выпуски
  static async getAllIssues() {
    const response =  await axios.get('https://journal-8xii.onrender.com/editions/get/all'); 
    return response["data"]["data"];
  }
  static async getIssueById(id) {
    const response =  await axios.get(`https://journal-8xii.onrender.com/editions/get/${id}`); 
    return response["data"]["edition"];
  }

  // static async getAllIssuesRight() {
  //   const response =  await axios.get('http://127.0.0.1:8000/editions/get/all'); 
  //   return response["data"]["data"];
  // }


  // Статьи
  static async getAllArticles() {
    const response =  await axios.get('https://journal-8xii.onrender.com/articles/get/all'); 
    return response["data"]["data"];
  }
  static async getArticlesByIssueId(id: string) {
    const response =  await axios.get('https://journal-8xii.onrender.com/articles/get/all'); 
    return response["data"]["data"].filter(item => item["editionId"] == id);
  }
  static async getArticleById(id: string) {
    const response =  await axios.get(`https://journal-8xii.onrender.com/articles/get/${id}`); 
    return response["data"]["article"];
  }

  
  // Комментарии
  static async getAllComments() {
    const response =  await axios.get(`https://journal-8xii.onrender.com/comments/get/all?onlyApproved=false`); 
    return response["data"]["data"];
  }
  static async getCommentsByArticleId(id: string) {
    const response =  await axios.get(`https://journal-8xii.onrender.com/comments/get/all?onlyApproved=false`); 
    return response["data"]["data"].filter(item => item["articleId"] == id);
  }
  static async getApprovedCommentsByArticleId(id: string) {
    const response =  await axios.get(`https://journal-8xii.onrender.com/comments/get/all?onlyApproved=false`); 
    return response["data"]["data"].filter(item => item["articleId"] == id && item["isApproved"]);
  }
  static async getNotApprovedCommentsByArticleId(id: string) {
    const response =  await axios.get(`https://journal-8xii.onrender.com/comments/get/all?onlyApproved=false`); 
    return response["data"]["data"].filter(item => item["articleId"] == id && !item["isApproved"]);
  }
  static async getCommentById(id: string) {
    const response =  await axios.get(`https://journal-8xii.onrender.com/comments/get/all?onlyApproved=false`); 
    return response["data"]["data"].filter(item => item["id"] == id);
  }


  // Редакторы
  static async getAllReductors() {
    const response =  await axios.get('https://journal-8xii.onrender.com/council/members/get/all');
    return response["data"]["data"];
  }
  static async getReductorById(id: string) {
    const response =  await axios.get(`https://journal-8xii.onrender.com/council/members/get/${id}`);
    return response["data"]["member"];
  }


  static async getImageLinkById(id: string) {
    return `https://journal-8xii.onrender.com/files/get/${id}?download=false`;
  }
  static async getFileLinkById(id: string) {
    return `https://journal-8xii.onrender.com/files/get/${id}?download=true`;
  }


  static postAuth() {
    const response = fetch("https://journal-8xii.onrender.com/admin/auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "username": "admin",
        "password": "admin"
      })
    }).then((response => {
      return response;
    }));
    return response;
  }


  static async postLoadFile(filePath: string) {
    const response =  await fetch("https://journal-8xii.onrender.com/admin/files/upload/editions", {
      method: 'POST',
      credentials: 'include',
      headers: {
        "Content-Type": 'multipart/form-data',
        "Cookie": "admin=MTcwNDgzMzMyMXxEWDhFQVFMX2dBQUJFQUVRQUFBa180QUFBUVp6ZEhKcGJtY01Cd0FGWVdSdGFXNEdjM1J5YVc1bkRBY0FCV0ZrYldsdXz_nJ91UydqxfvO_vB_zP-RKS9Oj8rZoD8OsYvM0HQmzQ=="
      },
      body: JSON.stringify({
        file: filePath
      })
    }).then((response => {
      // console.log(response.json());
      return response
    }));
    return response;
  }


  // static async postLoadFile(filePath: string) {
  //   const response =  await fetch("http://127.0.0.1:8000/admin/files/upload/editions", {
  //     method: 'POST',
  //     headers: {
  //       "Connection": "keep-alive",
  //       "Content-Type": "multipart/form-data; boundary=--------------------------117116850221063695455125",
  //       "Cookie": "admin=MTcwNDgxMzA4MHxEWDhFQVFMX2dBQUJFQUVRQUFBa180QUFBUVp6ZEhKcGJtY01Cd0FGWVdSdGFXNEdjM1J5YVc1bkRBY0FCV0ZrYldsdXwJrIzDH4lzqrvtQyc2vAHQPpbJjRSZs3PHmYun3J7yMQ==",
  //       "Content-Length": "8838389",
  //     },
  //     body: JSON.stringify({
  //       file: filePath
  //     })
  //   }).then((response => {
  //     return response
  //   }));
  //   return response;
  // }
}