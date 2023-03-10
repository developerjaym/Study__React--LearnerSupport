import React from "react";
import * as ReactDOM from "react-dom/client";

import {
  createHashRouter,
  defer,
  Navigate,
  RouterProvider
} from "react-router-dom";
import App from "./App";
import Article from "./article/Article";
import ArticlePage from "./article/ArticlePage";
import CreateQuestionPage from "./article/post/create/page/CreateQuestionPage";
import Home from "./home/Home";
import "./index.css";
import { datasource } from "./utility/datasource";


const router = createHashRouter([
  {
    path:"/",
    element: <App/>,
    children: [
      {
        path:"/question/:id",
        element: <ArticlePage/>,
        loader: ({request, params}) => {
          return defer({
            article: datasource.getArticle(params.id)
          })
        }
      },
      {
        path:"/ask",
        element: <CreateQuestionPage/>
      },
      {
        path:"/",
        element: <Home/>,
        loader: ({request, params}) => {
          return defer({
            all: datasource.getAll()
          })
        }
      },
    ],
    errorElement:  <div className="page"><h1>ERROR</h1></div>
  },
  
  {
    path:"*",
    element: <Navigate to="/" replace/>
  }
])

ReactDOM.createRoot(document.getElementById("root")).render(<RouterProvider router={router}/>);