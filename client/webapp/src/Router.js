import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import ArticleEditor from "./components/ArticleEditor/ArticleEditor";
import ArticleViewer from "./components/ArticleViewer/ArticleViewer";
import { CreationMenuPage } from "./pages/CreationMenuPage/CreationMenuPage";
import EditCoursePage from "./pages/CreationMenuPage/EditCoursePage/EditCoursePage";
import { HomePage } from "./pages/HomePage/HomePage";
import { LoginPage } from "./pages/LoginPage/LoginPage";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomePage />} path="/" />
        <Route element={<LoginPage />} path="/login" />
        <Route path="creation-menu">
          <Route index element={<CreationMenuPage />} />
          <Route path="course/:courseId" element={<EditCoursePage />} />
        </Route>
        <Route path="module/:id">
          <Route index element={<ArticleViewer />} />
          <Route path="edit" element={<ArticleEditor />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
