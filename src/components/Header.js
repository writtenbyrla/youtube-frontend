import logo from "../assets/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// fontAwesome에서 아이콘 따올 때 설치 후 import
// npm i @fortawesome/fontawesome-svg-core
// npm i @fortawesome/free-solid-svg-icons @fortawesome/free-regular-svg-icons @fortawesome/free-brands-svg-icons
// npm i @fortawesome/react-fontawesome
import { faBars, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import styled from "styled-components";

const StyledHeader = styled.header`
  position: fixed;
  background-color: white;
  width: 100%;
  z-index: 1; /*상위로 올림*/
  display: flex;
  height: 56px;
  justify-content: space-between;

  * {
    display: flex;
    align-items: center;
  }

  .header-start {
    margin: 10px;

    svg {
      font-size: 20px;
      cursor: pointer;
      padding: 10px;
      color: #666;
    }

    .header-start a {
      height: 100%;
      flex: 1;
      justify-content: flex-end;

      img {
        padding: 20px 10px;
      }
    }
  }

  .header-center {
    flex: 1;
    justify-content: flex-end;
    input {
      display: none;
    }
    button {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 20px;
    }
  }

  .header-end {
    margin: 20px;

    button {
      background: none;
      border: 1px solid #ddd;
      border-radius: 50px;
      padding: 10px;
      color: #065fd4;
      font-size: 1rem;
      svg {
        margin-right: 5px;
      }
    }
  }
  /* 검색창 보이게, 가운데정렬 */
  @media screen and (min-width: 600px) {
    .header-center {
      justify-content: center; /*flex-end에서 center로 변경*/

      input {
        display: block;
        padding: 10px 20px;
        border: 1px solid #ddd;
        width: 100%;
        max-width: 400px;
        border-top-left-radius: 50px;
        border-bottom-left-radius: 50px;
      }

      button {
        border: 1px solid #ddd;
        border-left: none;
        border-top-right-radius: 50px;
        border-bottom-right-radius: 50px;
        background-color: #eee;
        padding: 7.5px 20px;
      }
    }
  }
`;

const Header = () => {
  return (
    <StyledHeader>
      <div className="header-start">
        <FontAwesomeIcon icon={faBars} />
        <a href="#">
          <img src={logo} style={{ width: 100, height: 100 }} />
        </a>
      </div>

      <div className="header-center">
        <input type="search" name="search" id="search" placeholder="검색" />
        <button>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>

      <div className="header-end">
        <button>
          <span>
            <FontAwesomeIcon icon={faUser} />
          </span>
          <span>로그인</span>
        </button>
      </div>
    </StyledHeader>
  );
};
export default Header;
