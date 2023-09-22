import styled from "styled-components";
import {
  faBagShopping,
  faClapperboard,
  faGamepad,
  faHouse,
  faLightbulb,
  faMedal,
  faMusic,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";
import { getCategories } from "../api/video";
// video.js에서 export로 내보낸건 {}로 import함
import { getVideos } from "../api/video";
import { useInView } from "react-intersection-observer";

// css
const StyledAside = styled.aside`
  display: none;
  position: fixed;
  background-color: white;
  width: 70px;
  overflow-y: auto; /* 왼쪽 상단메뉴 스크롤바 */
  height: 100%;

  /* 스크롤바 꾸미기 */
  //aside::-webkit-scrollbar {
  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #999;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background-color: white;
    border-radius: 10px;
  }

  /* 
    상단 메뉴바 클릭시 js로 main class="aside-change" 넣어줌
    왼쪽 메뉴섹션 생기면 메인부분도 바껴야 하기 때문에 main에 class 넣어줌
*/

  a {
    border-radius: 5px;
    display: block;
    text-align: center;
    padding: 10px;
    margin: 10px;
    &:hover {
      background-color: #eee;
    }
    p {
      font-size: 0.9rem;
      margin-top: 5px;
    }
  }

  .aside-category,
  footer {
    display: none;
  }
`;

const MainContent = styled.div`
  &.main-content {
    padding-left: 70px;
  }

  nav {
    position: fixed;
    background-color: white;
    width: 100%;
    height: 56px;
    z-index: 1;
    padding-left: 15px;

    a {
      background-color: #eee;
      padding: 5px 10px;
      border-radius: 5px;
      line-height: 56px; /* nav에 height값이 있을 경우 위아래 가운데 정렬 */
      margin: 5px;

      &.active {
        background-color: black;
        color: white;
      }
    }
  }

  /* 클릭했을 때 active */
  section {
    padding-top: 56px;
    display: flex;
    flex-wrap: wrap; /*비디오 줄바꿈*/
    justify-content: center;

    .video-content {
      display: block; /*a 태그는 기본이 inline*/
      width: 100%;
      max-width: 400px;
      margin: 10px;
      margin-top: 20px;

      video {
        border-radius: 15px;
        /* 썸네일 이미지와 비디오 크기 일치시키기 */
        height: 220px;
        object-fit: cover;
      }

      .video-summary {
        display: flex;
        margin-top: 10px;

        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          margin-right: 10px;
        }
      }
    }
    .video-desc {
      h3 {
        line-height: 1.4;
        /* 제목 여러줄 넘어갈때 2줄 이상 ... 처리하기 */
        overflow: hidden;
        text-overflow: ellipsis;
        width: 100%;
        display: -webkit-box;
        -webkit-box-orient: vertical; /* 수직 */
        -webkit-line-clamp: 2; /* 2줄까지만 보여줌 */
      }
      p {
        font-size: 0.9rem;
        color: #333;
        line-height: 1.2;
      }
    }
  }
`;

const StyledMain = styled.main`
  padding-top: 56px;
  display: flex;

  // aside-change 지정됐을 때
  &.aside-change {
    aside {
      width: 70px;
      a {
        flex-direction: column;
        p {
          font-size: 0.8rem;
          margin-top: 5px;
        }
      }

      .aside-category {
        display: none;
      }

      footer {
        display: none;
      }
    }
    .main-content {
      padding-left: 70px;
    }
  }

  /* 홈, 구독버튼 보이게*/
  @media screen and (min-width: 927px) {
    aside {
      display: block;
    }
    section {
      justify-content: flex-start;
    }
  }

  /* aside-category */
  @media screen and (min-width: 1350px) {
    /*왼쪽 사이드바 너비 조절, 메인부분 맞추기*/
    aside {
      width: 200px;
    }
    aside a {
      display: flex;
    }
    aside a svg {
      width: 30px;
      margin-right: 20px;
    }
    aside a p {
      font-size: 1rem;
      margin-top: 0;
    }

    .main-content {
      padding-left: 200px;
    }

    /* 숨겨놨던 왼쪽 카테고리탭 보이게*/
    .aside-category {
      display: block;
    }

    .aside-category h2 {
      margin: 22px 22px 0; /* 탐색 아래쪽만 margin 0*/
    }
    footer {
      display: block;
      margin: 22px;
    }

    .video-content {
      max-width: 350px;
    }
  }
`;

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [videos, setVideos] = useState([]);

  // page 스크롤 무한처리
  const [page, setPage] = useState(1);
  const [ref, inView] = useInView();

  //카테고리 값 받아서 url에 출력되게 하려는 변수
  // http://localhost:8080/api/video?page=1&category=1
  // 카테고리 코드 받으려고
  const [category, setCategory] = useState(null);

  const categoryAPI = async () => {
    const result = await getCategories();
    setCategories(result.data);
  };

  const videoAPI = async () => {
    const result = await getVideos(page, category);
    //setVideos(result.data);

    // 비디오 계속 나오게 무한처리
    setVideos([...videos, ...result.data]);

    console.log(result.data);
  };

  const categoryFilterAPI = async () => {
    const result = await getVideos(page, category);
    setVideos(result.data);
  };

  //카테고리 클릭 했을 때 메서드
  const filterCategory = (e) => {
    e.preventDefault();
    //http://localhost:3000/1
    //쪼개서 마지막 카테고리 코드만 값 추출되게 해야함
    console.log(e.target.href);
    const href = e.target.href.split("/");
    console.log(href[href.length - 1]);

    setCategory(parseInt(href[href.length - 1]));
    setPage(1);
  };

  // 아래 코드 video.js로 따로 뺌(api 관련 관리하는 파일 따로 지정)
  // // async ~ await + axios
  // const getCategories = async () => {
  //   const result = await axios.get("http://localhost:8080/api/category");
  //   console.log(result);
  //   setCategories(result.data);
  // };

  useEffect(() => {
    categoryAPI();
    //   fetch("http://localhost:8080/api/category")
    //     .then((response) => response.json())
    //     .then((json) => {
    //       console.log(json);
    //       setCategories(json); // 배열을 categories로 담음
    //     });
    //   //console.log(response.json());
    //   // [[PromiseResult]]:Array(6)에서 객체방식으로 카테고리 목록 받아와짐
    //   //console.log(json);
    //   // 배열 방식으로 받아와짐, 배열 담기 위해서 useState 필요
  }, []);

  // useEffect(() => {
  //   videoAPI();
  // }, []);

  useEffect(() => {
    if (inView) {
      console.log(`${inView} : 무한 스크롤 요청이 들어가야 하는 부분`);
      videoAPI();
      setPage(page + 1);
    }
  }, [inView]);

  useEffect(() => {
    console.log(category);
    categoryFilterAPI();
  }, [category]);

  return (
    <StyledMain>
      <StyledAside>
        <div className="aside-top">
          <a href="#">
            <FontAwesomeIcon icon={faHouse} />
            <p>홈</p>
          </a>
          <a href="#">
            <FontAwesomeIcon icon={faFolder} />
            <p>구독</p>
          </a>
        </div>
        <div className="aside-category">
          <h2>탐색</h2>
          {categories.map((category) => (
            <a href="#" key={category.categoryCode}>
              {category.categoryCode === 1 ? (
                <FontAwesomeIcon icon={faBagShopping} />
              ) : category.categoryCode === 2 ? (
                <FontAwesomeIcon icon={faMusic} />
              ) : category.categoryCode === 3 ? (
                <FontAwesomeIcon icon={faClapperboard} />
              ) : category.categoryCode === 4 ? (
                <FontAwesomeIcon icon={faGamepad} />
              ) : category.categoryCode === 5 ? (
                <FontAwesomeIcon icon={faMedal} />
              ) : category.categoryCode === 6 ? (
                <FontAwesomeIcon icon={faLightbulb} />
              ) : null}
              {/* <i className="fa-solid fa-basket-shopping"></i> */}
              <p>{category.categoryName}</p>
            </a>
          ))}

          {/* <a href="#">
            <i className="fa-solid fa-basket-shopping"></i>
            <p>쇼핑</p>
          </a>
          <a href="#">
            <i className="fa-solid fa-headphones-simple"></i>
            <p>음악</p>
          </a> */}
        </div>
        <footer>개인정보처리방침</footer>
      </StyledAside>
      <MainContent className="main-content">
        <nav>
          <a href="#" className="active">
            전체
          </a>
          {/* 콜백함수 map으로 위에서 배열형태로 담은 categories를 뿌림 */}
          {categories.map((category) => (
            <a
              href={category.categoryCode}
              onClick={filterCategory}
              key={category.categoryCode}
            >
              {category.categoryName}
            </a>
          ))}

          {/* <a href="#">쇼핑</a> */}
          {/* <a href="#">음악</a> */}
        </nav>

        {/* 
          파일 절대 경로의 경우 Not allowed to load local resource: 에러뜸 
          public 폴더로 접근하면 가능
        */}
        <section>
          {videos.map((video) => (
            <a href="#" className="video-content" key={video.videoCode}>
              <video
                poster={"/upload/" + video.videoPhoto}
                width="100%"
                autoPlay
                loop
                controls
              >
                <source src={"/upload/" + video.videoUrl} type="video/mp4" />
              </video>
              <div className="video-summary">
                <img
                  src={"/upload/" + video.channel.channelPhoto}
                  alt="채널이미지"
                />
                <div className="video-desc">
                  <h3>{video.videoTitle}</h3>
                  <p>{video.channel.channelName}</p>
                  <p>
                    조회수
                    <span> {video.videoViews}</span>
                    회ㆍ
                    <span>1일</span>전
                  </p>
                </div>
              </div>
            </a>
          ))}

          {/* <a href="#" className="video-content">
            <video poster="./resources/thumbnail.jpg" width="100%" autoplay loop controls>
                <source src="./resources/video.mp4" type="video/mp4" />
            </video>
            <div className="video-summary">
              <img src="./resources/thumbnail.jpg" alt="채널이미지" />
              <div className="video-desc">
                <h3>"한국 사람들은 소풍가서 이렇게 먹어?! 캐나다에서 김밥 팔자는 엄마.." 김밥에 라면 처음 먹어본 캐나다 가족 반응! 라면 국물에 김밥 찍어먹더니.. 외국인 김밥먹방 [국제커플]</h3>
                <p>tvN</p>
                <p>
                  조회수 <span>9.1만</span>회ㆍ</span>
                  <span>1일</span> 전
                </p>
              </div>
            </div>
        </a>

        <a href="#" className="video-content">
            <video poster="./resources/thumbnail.jpg" width="100%" autoplay loop controls>
                <source src="./resources/video.mp4" type="video/mp4" />
            </video>
            <div className="video-summary">
              <img src="./resources/thumbnail.jpg" alt="채널이미지" />
              <div className="video-desc">
                <h3>부산촌놈 마지막화..!</h3>
                <p>tvN</p>
                <p>
                  조회수 <span>9.1만</span>회ㆍ</span>
                  <span>1일</span> 전
                </p>
              </div>
            </div>
        </a>

        <a href="#" className="video-content">
            <video poster="./resources/thumbnail.jpg" width="100%" autoplay loop controls>
                <source src="./resources/video.mp4" type="video/mp4" />
            </video>
            <div className="video-summary">
              <img src="./resources/thumbnail.jpg" alt="채널이미지" />
              <div className="video-desc">
                <h3>부산촌놈 마지막화..!</h3>
                <p>tvN</p>
                <p>
                  조회수 <span>9.1만</span>회ㆍ</span>
                  <span>1일</span> 전
                </p>
              </div>
            </div>
        </a>

        <a href="#" className="video-content">
            <video poster="./resources/thumbnail.jpg" width="100%" autoplay loop controls>
                <source src="./resources/video.mp4" type="video/mp4" />
            </video>
            <div className="video-summary">
              <img src="./resources/thumbnail.jpg" alt="채널이미지" />
              <div className="video-desc">
                <h3>부산촌놈 마지막화..!</h3>
                <p>tvN</p>
                <p>
                  조회수 <span>9.1만</span>회ㆍ</span>
                  <span>1일</span> 전
                </p>
              </div>
            </div>
        </a>

        <a href="#" className="video-content">
            <video poster="./resources/thumbnail.jpg" width="100%" autoplay loop controls>
                <source src="./resources/video.mp4" type="video/mp4" />
            </video>
            <div className="video-summary">
              <img src="./resources/thumbnail.jpg" alt="채널이미지" />
              <div className="video-desc">
                <h3>부산촌놈 마지막화..!</h3>
                <p>tvN</p>
                <p>
                  조회수 <span>9.1만</span>회ㆍ</span>
                  <span>1일</span> 전
                </p>
              </div>
            </div>
        </a> */}
          <div ref={ref}></div>
        </section>
      </MainContent>
    </StyledMain>
  );
};
export default Home;
