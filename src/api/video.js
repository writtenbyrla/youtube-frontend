import axios from "axios";

// api 관리하는 파일 따로 지정

// http://localhost:8080/api/
const instance = axios.create({
  baseURL: "http://localhost:8080/api/",
});

// async ~ await + axios
// 카테고리 목록 get(넘기는 값 없음)
export const getCategories = async () => {
  return await instance.get("category");
};

// 비디오 추가, post는 넘기는 값이 있음
export const addVideo = async (data) => {
  return await instance.post("video", data);
};

// 비디오 전체 보기
// export const getVideos = async (page, ) => {
//   return await instance.get("video");
// };

export const getVideos = async (page, category) => {
  let url = `video?page=${page}`;

  if (category != null) {
    url += `&category=${category}`;
  }
  return await instance.get(`video?page=${page}`);
};
