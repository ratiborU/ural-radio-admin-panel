// import axios from "axios";


export default class ReductorService {
  static async getImageLinkById(id: string) {
    return `https://journa-token.onrender.com/files/get/${id}?download=false`;
  }


  static async getFileLinkById(id: string) {
    return `https://journa-token.onrender.com/files/get/${id}?download=true`;
  }


  static async postLoadFile(form: FormData, type: string) {
    const response = await fetch(`https://journa-token.onrender.com/admin/files/upload/${type}`, {
      method: 'POST',
      headers: {
        // "Content-Type": 'multipart/form-data',
        "Authorization": `Bearer ${window.localStorage.getItem('token')}`
      },
      body: form
    }).then((result) => {
      return result.json();
    })
    return response;
  }


  static async deletefile(fileId: string) {
    const response = await fetch(`https://journa-token.onrender.com/files/get/${fileId}?download=false`, {
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