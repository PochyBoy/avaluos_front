import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { InputSwitch } from "primereact/inputswitch";
import "./AppTopbar.scss";
import { useHistory } from "react-router-dom";

export const AppTopbar = (props) => {
  const [value, setValue] = useState(true);
  const [theme, setTheme] = useState("lara-light-indigo");
  const history = useHistory();

  const replaceLink = useCallback((linkElement, href, callback) => {
    if (isIE()) {
      linkElement.setAttribute("href", href);

      if (callback) {
        callback();
      }
    } else {
      const id = linkElement.getAttribute("id");
      const cloneLinkElement = linkElement.cloneNode(true);

      cloneLinkElement.setAttribute("href", href);
      cloneLinkElement.setAttribute("id", id + "-clone");

      linkElement.parentNode.insertBefore(
        cloneLinkElement,
        linkElement.nextSibling
      );

      cloneLinkElement.addEventListener("load", () => {
        linkElement.remove();
        cloneLinkElement.setAttribute("id", id);

        if (callback) {
          callback();
        }
      });
    }
  }, []);

  useEffect(() => {
    let themeElement = document.getElementById("theme-link");
    const themeHref = "assets/themes/" + theme + "/theme.css";
    replaceLink(themeElement, themeHref);
  }, [theme, replaceLink]);

  const isIE = () => {
    return /(MSIE|Trident\/|Edge\/)/i.test(window.navigator.userAgent);
  };

  const changeTheme = (theme, scheme) => {
    props.onColorModeChange(scheme);
    setTheme(theme);
  };
  const switchFondo = (e) => {
    setValue(e);
    if (value) {
      changeTheme("lara-dark-indigo", "dark");
    } else {
      changeTheme("lara-light-indigo", "light");
    }
  };
  const handleSeccion = () => {
    localStorage.clear();
    props.setIsLogged(null);
    history.push("/");
  };
  const isLogger = JSON.parse(localStorage.getItem("isLogger"));
  return (
    <div className="layout-topbar">
      <Link to="/" className="layout-topbar-logo">
        {/* <img src={props.layoutColorMode === 'light' ? 'assets/layout/images/logo-dark.svg' : 'assets/layout/images/logo-white.svg'} alt="logo"/> */}
        <span>Sistema de Avalúos</span>
      </Link>

      <button
        type="button"
        className="p-link  layout-menu-button layout-topbar-button"
        onClick={props.onToggleMenuClick}
      >
        <i className="pi pi-bars" />
      </button>

      <button
        type="button"
        className="p-link layout-topbar-menu-button layout-topbar-button"
        onClick={props.onMobileTopbarMenuClick}
      >
        <i className="pi pi-ellipsis-v" />
      </button>
      <ul
        className={classNames("layout-topbar-menu lg:flex origin-top", {
          "layout-topbar-menu-mobile-active": props.mobileTopbarMenuActive,
        })}
      >
        <li className="nameHeader">
          <h2>{isLogger.nombre.toUpperCase()}</h2>
        </li>
        <li className="switchHeader">
          <InputSwitch checked={value} onChange={(e) => switchFondo(e.value)} />
        </li>
        <li>
          <button
            className="p-link layout-topbar-button"
            onClick={props.onMobileSubTopbarMenuClick}
          >
            <i className="pi pi-cog" />
            <span>Settings</span>
          </button>
        </li>
        <li>
          <button
            className="p-link layout-topbar-button"
            onClick={handleSeccion}
          >
            <i className="pi pi-user" />
            <span>Profile</span>
          </button>
        </li>
      </ul>
    </div>
  );
};
