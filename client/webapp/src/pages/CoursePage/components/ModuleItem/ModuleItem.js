import { Link } from "react-router-dom";
import "./style.css";

export default function ModuleItem({ status, module }) {
  function renderIcon(type) {
    switch (type) {
      case "locked":
        return (
          <div className="module-item__icon module-item__icon--locker">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" />
            </svg>
          </div>
        );
      case "doing":
        return (
          <div className="module-item__icon module-item__icon--doing">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="module-item__icon module-item__icon--done">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
            </svg>
          </div>
        );
    }
  }

  return (
    <div className="module-item">
      {renderIcon(status)}
      <div
        className={`module-item__title${status === "locked" ? "-locked" : ""}`}
        href="#"
      >
        {status !== "locked" ? (
          <Link to={`/module/${module.id}`}>{module.title}</Link>
        ) : (
          module.title
        )}
      </div>
    </div>
  );
}
