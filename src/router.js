import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Watch from "./pages/Watch";
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";
import Create from "./pages/Create";

const router = createBrowserRouter([
  {
    path: "/",
    // element: <Home/>,
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        // http://localhost:3001/watch 로 가도 Home.js에서 outlet 설정 전에는 Home이 뜸, 설정 후에는 상세페이지(Watch.js)가 같이 뜸
        path: "watch",
        element: <Watch />,
      },
    ],
  },
  {
    // 하위 페이지가 아닌 별도 페이지 빼고 싶을때 밖에서 지정
    path: "/create",
    element: <Create />,
  },
]);

export default router;
