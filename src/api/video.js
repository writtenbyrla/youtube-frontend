import axios from "axios";

// api 관리하는 파일 따로 지정

// http://localhost:8080/api/
const instance = axios.create({
  baseURL: "http://localhost:8080/api/",
});

// async ~ await + axios
export const getCategories = async () => {
  return await instance.get("category");
};
