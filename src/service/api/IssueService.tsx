import axios from "axios"
import { IIssue } from "../types/typesNew.tsx";
import { serverUrl } from "../utils/serverPaths.tsx";


export const getIssues = async (): Promise<IIssue[]> => {
  const response = await axios.get(`${serverUrl}/api/v1/editions/get/all`)
    .then((response) => {
      return response["data"]["data"];
    }).catch((error: Error) => {
      console.log(error.message);
      throw new Error(error.message);
    }); 
  return response;
}

export const getIssueById = async (id: string): Promise<IIssue> => {
  const response = await axios.get(`${serverUrl}/api/v1/editions/get/${id}`)
    .then((response) => {
      return response["data"]["edition"];
    }).catch((error: Error) => {
      throw new Error(error.message);
    }); 
  return response;
}

export const createPost = async (year: number, number: number, volume: number, date: string, documentID: string, imageID: string): Promise<IIssue> => {
  const response = await axios.post(`${serverUrl}/api/v1/editions/create`, {
    "year": year,
    "number": number,
    "volume": volume,
    "date": date,
    "documentID": documentID,
    "ImageID" : imageID
  }, {
    headers: {
      "Authorization": `${window.localStorage.getItem("token")}`
    }
  }).then((response) => {
      return response["data"];
    }).catch((error) => {
      console.log(error);
      throw new Error(error.message);
    }); 
  return response;
}


export const updatePost = async (id: number, year: number, number: number, volume: number, date: string, documentID: string, imageID: string): Promise<IIssue> => {
  const response = await axios.put(`${serverUrl}/api/v1/editions/update`, {
    "id": id,
    "year": year,
    "number": number,
    "volume": volume,
    "date": date,
    "documentID": documentID,
    "ImageID" : imageID
  }, {
    headers: {
      "Authorization": `${window.localStorage.getItem("token")}`
    }
  }).then((response) => {
      return response["data"];
    }).catch((error) => {
      console.log(error);
      throw new Error(error.message);
    }); 
  return response;
}


export const deleteIssue = async (id: string): Promise<IIssue[]> => {
  const response = await axios.delete(`${serverUrl}/api/v1/editions/delete/${id}`, {
    headers: {
      "Authorization": `${window.localStorage.getItem("token")}`
    }
  }).then((response) => {
      return response["data"]["data"];
    }).catch((error: Error) => {
      console.log(error.message);
      throw new Error(error.message);
    }); 
  return response;
}