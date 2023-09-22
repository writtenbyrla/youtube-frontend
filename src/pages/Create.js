import "bootstrap/dist/css/bootstrap.min.css";
// component 부분적으로 부트스트랩 쓰고 싶을때 부트스트랩 설치(npm install react-bootstrap bootstrap) 후 https://react-bootstrap.netlify.app/docs/getting-started/introduction 사이트에서 css부분 긁어오면 됨
import { Container } from "react-bootstrap";
import styled from "styled-components";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { getCategories } from "../api/video";
import { useState, useEffect } from "react";
import { addVideo } from "../api/video";

const Header = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  padding: 20px 0;
`;

const Create = () => {
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState();
  const [video, setVideo] = useState(null);
  const [image, setImage] = useState(null);
  const [select, setSelect] = useState(1);

  const categoryAPI = async () => {
    const result = await getCategories();
    setCategories(result.data);
  };

  // 빈 배열로 1회 호출
  useEffect(() => {
    categoryAPI();
  }, []);

  // 저장버튼 클릭했을때
  const onClick = () => {
    console.log(title);
    console.log(desc);
    console.log(image);
    console.log(video);
    console.log(select);

    // video.js에서 import해온 addVideo(api) 사용할 때 data를 formData 형식으로 넘겨야 함(자바스크립트에서 제공)
    const formData = new FormData();
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("image", image);
    formData.append("video", video);
    formData.append("categoryCode", parseInt(select));
    addVideo(formData);
  };

  const onUploadImage = (e) => {
    // console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  };

  const onUploadVideo = (e) => {
    // console.log(e.target.files[0]);
    setVideo(e.target.files[0]);
  };

  const onChangeCategory = (e) => {
    setSelect(e.currentTarget.value); // 현재 선택한거
  };

  return (
    <Container>
      <Header> 동영상 업로드</Header>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>제목</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>내용</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>썸네일 이미지</Form.Label>
          <Form.Control type="file" onChange={onUploadImage} />
          {/* 이미지의 경우 value값 바로 지정하면 오류 남 */}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>동영상 파일</Form.Label>
          <Form.Control type="file" onChange={onUploadVideo} />
        </Form.Group>
        <Form.Select onChange={onChangeCategory} value={select}>
          {/* <option>카테고리 선택</option> */}
          {categories.map((category) => (
            <option value={category.categoryCode} key={category.categoryCode}>
              {category.categoryName}
            </option>
          ))}

          {/* <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option> */}
        </Form.Select>
        <Button
          variant="danger"
          style={{ marginTop: "20px" }}
          onClick={onClick}
        >
          저장
        </Button>
      </Form>
    </Container>
  );
};
export default Create;
