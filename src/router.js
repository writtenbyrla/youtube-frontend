import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Watch from "./pages/Watch";
import Layout from "./components/Layout";
const router = createBrowserRouter([
  {
    path: "/",
    // element: <Home/>,
    element: <Layout />,
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
]);

export default router;
