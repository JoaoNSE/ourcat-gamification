import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiWrapperService from "../../service/ApiWrapperService";
import { DropdownUserMenu } from "./components/DropdownUserMenu/DropdownUserMenu";
import "./style.css";

export function CommonHeader() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadUser() {
      try {
        const us = await ApiWrapperService.getMe();
        console.log(us);
        setUser(us);
      } catch (error) {
        if (error.response.status === 401) {
          setUser(null);
        } else {
          throw error;
        }
      }
    }

    loadUser();
  }, []);

  async function handleLogout() {
    await ApiWrapperService.logout();
    setUser(null);
    alert("Você foi deslogado.");
    navigate("/");
  }

  return (
    <div className="common-header">
      <div>
        <img
          className="common-header__logo"
          src={require("../../img/logo.png")}
          alt="logo"
          onClick={() => navigate("/")}
        />
      </div>

      {user && (
        <div className="common-header__user">
          <DropdownUserMenu user={user} handleLogout={handleLogout} />
        </div>
      )}
      {!user && (
        <button
          className="common-header__login-button"
          onClick={() => navigate("/login")}
        >
          Entrar
        </button>
      )}
    </div>
  );
}
