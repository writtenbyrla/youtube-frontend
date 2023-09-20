import "bootstrap/dist/css/bootstrap.min.css";
// component 부분적으로 부트스트랩 쓰고 싶을때 부트스트랩 설치(npm install react-bootstrap bootstrap) 후 https://react-bootstrap.netlify.app/docs/getting-started/introduction 사이트에서 css부분 긁어오면 됨
import { Container } from "react-bootstrap";
import styled from "styled-components";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { getCategories } from "../api/video";
import { useState, useEffect } from "react";

const Header = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  padding: 20px 0;
`;

const Create = () => {
  const [categories, setCategories] = useState([]);

  const categoryAPI = async () => {
    const result = await getCategories();
    setCategories(result.data);
  };

  // 빈 배열로 1회 호출
  useEffect(() => {
    categoryAPI();
  }, []);

  return (
    <Container>
      <Header> 동영상 업로드</Header>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>제목</Form.Label>
          <Form.Control type="text" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>내용</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>썸네일 이미지</Form.Label>
          <Form.Control type="file" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>동영상 파일</Form.Label>
          <Form.Control type="file" />
        </Form.Group>
        <Form.Select>
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
        <Button variant="danger" style={{ marginTop: "20px" }}>
          저장
        </Button>
      </Form>
    </Container>
  );
};
export default Create;
