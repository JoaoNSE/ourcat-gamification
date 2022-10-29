import { useState, useEffect } from "react";

import { Editor, EditorState, convertFromRaw } from "draft-js";

import "./style.css";
import "draft-js/dist/Draft.css";
import ApiWrapperService from "../../service/ApiWrapperService";
import { useParams } from "react-router-dom";
import { CommonHeader } from "../CommonHeader/CommonHeader";

function ArticleViewer() {
  const [editorState, setEditorState] = useState(null);
  const [moduleData, setModuleData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function getModule() {
      const module = await ApiWrapperService.getModuleById(id);
      console.log(module);

      let initialEditorState;

      try {
        const contentObject = JSON.parse(module.content);
        initialEditorState = EditorState.createWithContent(
          convertFromRaw(contentObject)
        );
      } catch (error) {
        initialEditorState = EditorState.createEmpty();
      }

      setEditorState(initialEditorState);
      setModuleData(module);
    }

    getModule();
  }, []);

  return (
    <>
      <CommonHeader />
      <div className="article-viewer__container">
        {!moduleData && "Loading"}
        {moduleData && <Editor editorState={editorState} readOnly={true} />}
      </div>
    </>
  );
}

export default ArticleViewer;
