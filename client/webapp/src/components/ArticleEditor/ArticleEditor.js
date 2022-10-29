import { useState, useEffect } from "react";

import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
} from "draft-js";

import "draft-js/dist/Draft.css";
import "./style.css";
import ApiWrapperService from "../../service/ApiWrapperService";
import { useParams } from "react-router-dom";
import { CommonHeader } from "../CommonHeader/CommonHeader";

const BLOCK_TYPES = [
  { label: " “ ” ", style: "blockquote" },
  { label: "UL", style: "unordered-list-item" },
  { label: "OL", style: "ordered-list-item" },
  { label: "{ }", style: "code-block" },
];

const BLOCK_TYPE_HEADINGS = [
  { label: "Texto Normal", style: "unstyled" },
  { label: "Título 1", style: "header-one" },
  { label: "Título 2", style: "header-two" },
  { label: "Título 3", style: "header-three" },
  { label: "Título 4", style: "header-four" },
  { label: "Título 5", style: "header-five" },
  { label: "Título 6", style: "header-six" },
];

function ArticleEditor() {
  const [editorState, setEditorState] = useState(null);
  const [activeBlockType, setActiveBlockType] = useState("unstyled");
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

  useEffect(() => {
    updateBlockType();

    function updateBlockType() {
      if (!editorState) return;

      const selection = editorState.getSelection();
      const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();
      console.log("update block type::", blockType);
      setActiveBlockType(blockType);
    }
  }, [editorState]);

  function handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      setEditorState(newState);
      return "handled";
    }

    return "not-handled";
  }

  function onBoldClick() {
    // console.log(convertToRaw(editorState.getCurrentContent()));
    handleEditorChange(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  }

  function onItalicClick() {
    handleEditorChange(RichUtils.toggleInlineStyle(editorState, "ITALIC"));
  }

  function onUnderlineClick() {
    handleEditorChange(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"));
  }

  function handleEditorChange(newState) {
    console.log("editor change");
    setEditorState(newState);
  }

  function toggleBlockType(blockType) {
    console.log(blockType);
    setActiveBlockType(blockType);
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  }

  async function saveContent() {
    const content = convertToRaw(editorState.getCurrentContent());
    await ApiWrapperService.updateModuleData(
      moduleData.id,
      JSON.stringify(content)
    );
  }

  return (
    <>
      <CommonHeader />
      <div>
        {!moduleData && "Loading"}
        {moduleData && (
          <>
            <div className="editor__toolbar">
              <div>{moduleData.title}</div>
              <div className="editor__toolbar-separator">|</div>
              <select
                value={activeBlockType}
                onChange={(event) => toggleBlockType(event.target.value)}
              >
                {BLOCK_TYPE_HEADINGS.map((heading, idx) => {
                  return (
                    <option key={idx} value={heading.style}>
                      {heading.label}
                    </option>
                  );
                })}
              </select>
              <div className="editor__toolbar-separator">|</div>
              <div className="editor__toolbar-button" onClick={onBoldClick}>
                B
              </div>
              <div className="editor__toolbar-button" onClick={onItalicClick}>
                I
              </div>
              <div
                className="editor__toolbar-button"
                onClick={onUnderlineClick}
              >
                U
              </div>
              <div className="editor__toolbar-separator">|</div>
              <div className="editor__toolbar-save-btn" onClick={saveContent}>
                Salvar
              </div>
            </div>
            <div className="editor__editor">
              <Editor
                editorState={editorState}
                onChange={(newState) => handleEditorChange(newState)}
                handleKeyCommand={handleKeyCommand}
                placeholder="Enter some text..."
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default ArticleEditor;
