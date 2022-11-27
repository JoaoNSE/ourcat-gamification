import { useState, useEffect } from "react";

import { Editor, EditorState, convertFromRaw } from "draft-js";

import "./style.css";
import "draft-js/dist/Draft.css";

function ArticleViewer({ content }) {
  const [editorState, setEditorState] = useState(null);

  useEffect(() => {
    async function configureEditorState() {
      if (!content) {
        return;
      }

      const contentObject = JSON.parse(content);
      const initialEditorState = EditorState.createWithContent(
        convertFromRaw(contentObject)
      );

      setEditorState(initialEditorState);
    }

    configureEditorState();
  }, [content]);

  return (
    <>{editorState && <Editor editorState={editorState} readOnly={true} />}</>
  );
}

export default ArticleViewer;
