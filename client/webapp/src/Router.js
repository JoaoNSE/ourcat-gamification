import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import ArticleEditor from "./components/ArticleEditor/ArticleEditor";
import { HomePage } from "./pages/HomePage/HomePage";
import { LoginPage } from "./pages/LoginPage/LoginPage";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomePage />} path="/" />
        <Route element={<LoginPage />} path="/login" />
        <Route element={<ArticleEditor />} path="/module/:id" />
      </Routes>
    </BrowserRouter>
  );
}
