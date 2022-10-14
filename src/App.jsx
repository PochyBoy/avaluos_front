import React, { useState, useEffect, useRef } from "react";
import {
  Route,
  useLocation,
  BrowserRouter,
  Switch,
  Redirect,
} from "react-router-dom";
import classNames from "classnames";
import { CSSTransition } from "react-transition-group";
// PrimeReact
import PrimeReact from "primereact/api";
import { Tooltip } from "primereact/tooltip";
import "primereact/resources/primereact.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

// Page
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

// Page --> Menu
import RegistroAsignado from "./pages/Menu/RegistroAsignado";
import AsignacionSLA from "./pages/Menu/AsignacionSLA";
import Bien from "./pages/Menu/Bien";
import TipoDeBien from "./pages/Menu/TipoDeBien";
import RegistroDeSolicitantes from "./pages/Menu/RegistroDeSolicitantes/RegistroDeSolicitantes";
import Profesion from "./pages/Menu/Profesion";
import Municipio from "./pages/Menu/Municipio";
import Convenio from "./pages/Menu/RegistroConvenios";
import SolicitudMov from "./pages/Menu/SolicitudMov/SolicitudMov";
import BandejaPeritosAvaluadores from "./pages/Menu/BandejaPeritosAvaluadores";
import BandejaExperto from "./pages/Menu/BandejaExperto";
import BandejaSolicitante from "./pages/Menu/BandejaSolicitante";
import RegistroUsuarioAD from "./pages/Menu/RegistroUsuarioAD";

import Informe from "./pages/Menu/Informe";
import Usuarios from "./pages/Menu/Usuarios";
import RegistroAvaluadores from "./pages/Menu/RegistroAvaluadores";
import Banca from "./pages/Menu/Banca";
import FormikFormDemo from "./pages/Pruebas/Formik";

// Style SASS
import "prismjs/themes/prism-coy.css";
import "./assets/demo/flags/flags.css";
import "./assets/demo/Demos.scss";
import "./assets/layout/layout.scss";
import "./App.scss";

// src
import { AppTopbar } from "./AppTopbar";
import { AppFooter } from "./AppFooter";
import { AppMenu } from "./AppMenu";
// import { AppConfig } from "./AppConfig";
// Redux Toolkip
import PrivateRouteLogin from "./components/Atomo/PrivateRoute/PrivateRouteLogin";
import PrivateRouteBien from "./components/Atomo/PrivateRoute/PrivateRouteBien";
import PrivateRouteBandejaSolicitante from "./components/Atomo/PrivateRoute/PrivateRouteBandejaSolicitante";
import PrivateRouteUsuarios from "./components/Atomo/PrivateRoute/PrivateRouteUsuarios";
import PrivateRouteUsuariosAD from "./components/Atomo/PrivateRoute/PrivateRouteUsuariosAD";
import PrivateRouteInforme from "./components/Atomo/PrivateRoute/PrivateRouteInforme";
import PrivateRouteBandejaExperto from "./components/Atomo/PrivateRoute/PrivateRouteBandejaExperto";

import PrivateRouteBanca from "./components/Atomo/PrivateRoute/PrivateRouteBanca";
import PrivateRouteRegistroAsignado from "./components/Atomo/PrivateRoute/PrivateRouteRegistroAsignado";
import PrivateRouteSLAAsignado from "./components/Atomo/PrivateRoute/PrivateRouteSLAAsignado";
import PrivateRouteTipoBien from "./components/Atomo/PrivateRoute/PrivateRouteTipoBien";
import PrivateRouteRegistroSolicitantes from "./components/Atomo/PrivateRoute/PrivateRouteRegistroSolicitantes";
import PrivateRouteBandejaPeritoAvaluadores from "./components/Atomo/PrivateRoute/PrivateRouteBandejaPeritoAvaluadores";
import PrivateRouteProfesion from "./components/Atomo/PrivateRoute/PrivateRouteProfesion";
import PrivateRouteMunicipio from "./components/Atomo/PrivateRoute/PrivateRouteMunicipio";
import PrivateRouteMovSolicitud from "./components/Atomo/PrivateRoute/PrivateRouteMovSolicitud";
import PrivateRouteRegistroConvenio from "./components/Atomo/PrivateRoute/PrivateRouteRegistroConvenio";
import PrivateRouteAvaluadores from "./components/Atomo/PrivateRoute/PrivateRouteAvaluadores";
import PrivateRouteNewPassword from "./components/Atomo/PrivateRoute/PrivateRouteNewPassword";
import NewPassword from "./pages/NewPassword";
import PrivateRouteTipoDePersona from "./components/Atomo/PrivateRoute/PrivateRouteTipoDePersona";
import TipoDePersona from "./pages/Menu/TipoDePersona";
import PrivateRouteSolicitarAvaluos from "./components/Atomo/PrivateRoute/Solicitante/PrivateRouteSolicitarAvaluos";
import SolicitarAvaluos from "./pages/Solicitante/Menu/SolicitarAvaluos";
import PrivateRouteGeneracionEnvioInforme from "./components/Atomo/PrivateRoute/PeritoAvaluos/PrivateRouteGeneracionEnvioInforme";
import GeneracionEnvioInforme from "./pages/PeritoAvaluos/Menu/GeneracionEnvioInforme";
import PrivateRouteRegistroSolicitudExpertoAvaluos from "./components/Atomo/PrivateRoute/ExpertoAvaluos/PrivateRouteRegistroSolicitudExpertoAvaluos";
import RegistroSolicitud from "./pages/ExpertoEnAvaluos/Menu/RegistroSolicitud";
import PrivateRouteRevisionValidacionAvaluos from "./components/Atomo/PrivateRoute/ExpertoAvaluos/PrivateRouteRevisionValidacionAvaluos";
import RevisionYValidacionAvaluos from "./pages/ExpertoEnAvaluos/Menu/RevisionYValidacionAvaluos";
import PrivateRouteGeneracionReporteExpertoAvaluos from "./components/Atomo/PrivateRoute/ExpertoAvaluos/PrivateRouteGeneracionReporteExpertoAvaluos";
import GeneracionReporte from "./pages/ExpertoEnAvaluos/Menu/GeneracionReporte";

export default function Home() {
  const [layoutMode, setLayoutMode] = useState("static");
  const [layoutColorMode, setLayoutColorMode] = useState("light");
  const [inputStyle, setInputStyle] = useState("outlined");
  const [ripple, setRipple] = useState(true);
  const [staticMenuInactive, setStaticMenuInactive] = useState(false);
  const [overlayMenuActive, setOverlayMenuActive] = useState(false);
  const [mobileMenuActive, setMobileMenuActive] = useState(false);
  const [mobileTopbarMenuActive, setMobileTopbarMenuActive] = useState(false);
  const copyTooltipRef = useRef();
  const location = useLocation();

  PrimeReact.ripple = true;

  let menuClick = false;
  let mobileTopbarMenuClick = false;

  useEffect(() => {
    if (mobileMenuActive) {
      addClass(document.body, "body-overflow-hidden");
    } else {
      removeClass(document.body, "body-overflow-hidden");
    }
  }, [mobileMenuActive]);

  useEffect(() => {
    copyTooltipRef &&
      copyTooltipRef.current &&
      copyTooltipRef.current.updateTargetEvents();
  }, [location]);

  const onInputStyleChange = (inputStyle) => {
    setInputStyle(inputStyle);
  };

  const onRipple = (e) => {
    PrimeReact.ripple = e.value;
    setRipple(e.value);
  };

  const onLayoutModeChange = (mode) => {
    setLayoutMode(mode);
  };

  const onColorModeChange = (mode) => {
    setLayoutColorMode(mode);
  };

  const onWrapperClick = (event) => {
    if (!menuClick) {
      setOverlayMenuActive(false);
      setMobileMenuActive(false);
    }

    if (!mobileTopbarMenuClick) {
      setMobileTopbarMenuActive(false);
    }

    mobileTopbarMenuClick = false;
    menuClick = false;
  };

  const onToggleMenuClick = (event) => {
    menuClick = true;

    if (isDesktop()) {
      if (layoutMode === "overlay") {
        if (mobileMenuActive === true) {
          setOverlayMenuActive(true);
        }

        setOverlayMenuActive((prevState) => !prevState);
        setMobileMenuActive(false);
      } else if (layoutMode === "static") {
        setStaticMenuInactive((prevState) => !prevState);
      }
    } else {
      setMobileMenuActive((prevState) => !prevState);
    }

    event.preventDefault();
  };

  const onSidebarClick = () => {
    menuClick = true;
  };

  const onMobileTopbarMenuClick = (event) => {
    mobileTopbarMenuClick = true;

    setMobileTopbarMenuActive((prevState) => !prevState);
    event.preventDefault();
  };

  const onMobileSubTopbarMenuClick = (event) => {
    mobileTopbarMenuClick = true;

    event.preventDefault();
  };

  const onMenuItemClick = (event) => {
    if (!event.item.items) {
      setOverlayMenuActive(false);
      setMobileMenuActive(false);
    }
  };
  const isDesktop = () => {
    return window.innerWidth >= 992;
  };

  const addClass = (element, className) => {
    if (element.classList) element.classList.add(className);
    else element.className += " " + className;
  };

  const removeClass = (element, className) => {
    if (element.classList) element.classList.remove(className);
    else
      element.className = element.className.replace(
        new RegExp(
          "(^|\\b)" + className.split(" ").join("|") + "(\\b|$)",
          "gi"
        ),
        " "
      );
  };

  const wrapperClass = classNames("layout-wrapper", {
    "layout-overlay": layoutMode === "overlay",
    "layout-static": layoutMode === "static",
    "layout-static-sidebar-inactive":
      staticMenuInactive && layoutMode === "static",
    "layout-overlay-sidebar-active":
      overlayMenuActive && layoutMode === "overlay",
    "layout-mobile-sidebar-active": mobileMenuActive,
    "p-input-filled": inputStyle === "filled",
    "p-ripple-disabled": ripple === false,
    "layout-theme-light": layoutColorMode === "light",
  });

  const dataLogin = JSON.parse(localStorage.getItem("isLogger")); ////Aqui
  const [isLogged, setIsLogged] = useState(dataLogin);

  return (
    <div className={wrapperClass} onClick={onWrapperClick}>
      <BrowserRouter>
        <Switch>
          <PrivateRouteNewPassword
            exact
            path="/password"
            component={NewPassword}
            isLogged={isLogged}
          />
          <PrivateRouteLogin
            exact
            path="/"
            component={Login}
            isLogged={isLogged}
            setIsLogged={setIsLogged}
          />

          {/* {isLogger ? (
            <Redirect to={"/Solicitante"} />
            ) : (
              <Route exact path="/" component={Login} />
            )}  */}
          {isLogged ? (
            <Route path="/">
              <Tooltip
                ref={copyTooltipRef}
                target=".block-action-copy"
                position="bottom"
                content="Copied to clipboard"
                event="focus"
              />
              <AppTopbar
                onToggleMenuClick={onToggleMenuClick}
                mobileTopbarMenuActive={mobileTopbarMenuActive}
                onMobileTopbarMenuClick={onMobileTopbarMenuClick}
                onMobileSubTopbarMenuClick={onMobileSubTopbarMenuClick}
                rippleEffect={ripple}
                onRippleEffect={onRipple}
                inputStyle={inputStyle}
                onInputStyleChange={onInputStyleChange}
                layoutMode={layoutMode}
                onLayoutModeChange={onLayoutModeChange}
                layoutColorMode={layoutColorMode}
                onColorModeChange={onColorModeChange}
                setIsLogged={setIsLogged}
              />

              <div className="layout-sidebar" onClick={onSidebarClick}>
                <AppMenu
                  onMenuItemClick={onMenuItemClick}
                  layoutColorMode={layoutColorMode}
                />
              </div>
              <div className="layout-main-container">
                <div className="layout-main">
                  <Route
                    path="/Dashboard"
                    exact
                    render={() => (
                      <Dashboard
                        colorMode={layoutColorMode}
                        location={location}
                      />
                    )}
                  />
                  {/* Experto en avalúos */}
                  <PrivateRouteRegistroSolicitudExpertoAvaluos
                    exact
                    path={"/Registro_Solicitud"}
                    component={RegistroSolicitud}
                    isLogged={isLogged}
                  />
                  <PrivateRouteRevisionValidacionAvaluos
                    exact
                    path={"/Revision_y_Validacion_de_avaluos"}
                    component={RevisionYValidacionAvaluos}
                    isLogged={isLogged}
                  />
                  <PrivateRouteGeneracionReporteExpertoAvaluos
                    exact
                    path={"/Generacion_de_Reporte"}
                    component={GeneracionReporte}
                    isLogged={isLogged}
                  />
                  {/* Fin Experto en avalúos */}
                  {/* Solicitante */}
                  <PrivateRouteSolicitarAvaluos
                    exact
                    path={"/Solicitar_Avaluos"}
                    component={SolicitarAvaluos}
                    isLogged={isLogged}
                  />
                  {/* Fin Solicitante */}
                  {/* Gestor de Role */}
                  <PrivateRouteGeneracionEnvioInforme
                    exact
                    path={"/Generacion_y_Envio_de_Informe"}
                    component={GeneracionEnvioInforme}
                    isLogged={isLogged}
                  />
                 
                  {/* Fin Gestor de Role */}
                  <Route
                    exact
                    path={"/FormikFormDemo"}
                    component={FormikFormDemo}
                    setIsLogged={setIsLogged}
                  />
                  <PrivateRouteBien
                    exact
                    path={"/Registro_de_Bien"}
                    component={Bien}
                    isLogged={isLogged}
                  />
                  <PrivateRouteTipoDePersona
                    exact
                    path={"/Tipo_de_Persona"}
                    component={TipoDePersona}
                    isLogged={isLogged}
                  />

                  <PrivateRouteBandejaSolicitante
                    exact
                    path={"/Registrar_visita_y_pago"}
                    component={BandejaSolicitante}
                    isLogged={isLogged}
                  />
                  {/* AQUI LO DEJAMOS */}

                  <PrivateRouteUsuariosAD
                    exact
                    path={"/Control_de_Usuario_AD"}
                    component={RegistroUsuarioAD}
                    isLogged={isLogged}
                  />

                  <PrivateRouteUsuarios
                    exact
                    path={"/Asignar_Usuario"}
                    component={Usuarios}
                    isLogged={isLogged}
                  />

                  <PrivateRouteInforme
                    exact
                    path={"/Informe"}
                    component={Informe}
                    isLogged={isLogged}
                  />

                  <PrivateRouteBandejaExperto
                    exact
                    path={"/Bandeja_de_Experto"}
                    component={BandejaExperto}
                    isLogged={isLogged}
                  />

          

                  <PrivateRouteBanca
                    exact
                    path={"/Registro_de_Banca"}
                    component={Banca}
                    isLogged={isLogged}
                  />

                  <PrivateRouteRegistroAsignado
                    exact
                    path={"/Registro_de_Asignado"}
                    component={RegistroAsignado}
                    isLogged={isLogged}
                  />

                  <PrivateRouteSLAAsignado
                    exact
                    path={"/Asignar_SLA"}
                    component={AsignacionSLA}
                    isLogged={isLogged}
                  />

                  <PrivateRouteTipoBien
                    exact
                    path={"/Tipo_de_bien"}
                    component={TipoDeBien}
                    isLogged={isLogged}
                  />

                  <PrivateRouteRegistroSolicitantes
                    exact
                    path={"/Registro_de_Solicitantes"}
                    component={RegistroDeSolicitantes}
                    isLogged={isLogged}
                  />

                  <PrivateRouteBandejaPeritoAvaluadores
                    exact
                    path={"/Bandeja_de_Perito_Avaluadores"}
                    component={BandejaPeritosAvaluadores}
                    isLogged={isLogged}
                  />

                  <PrivateRouteProfesion
                    exact
                    path={"/Registro_de_Profesion"}
                    component={Profesion}
                    isLogged={isLogged}
                  />

                  <PrivateRouteMunicipio
                    exact
                    path={"/Registro_de_Municipio"}
                    component={Municipio}
                    isLogged={isLogged}
                  />

                  <PrivateRouteMovSolicitud
                    exact
                    path={"/Registro_de_Solicitud"}
                    component={SolicitudMov}
                    isLogged={isLogged}
                  />

                  <PrivateRouteRegistroConvenio
                    exact
                    path={"/Registro_de_Convenio"}
                    component={Convenio}
                    isLogged={isLogged}
                  />

                  <PrivateRouteAvaluadores
                    exact
                    path={"/Registro_de_Avaluadores"}
                    component={RegistroAvaluadores}
                    isLogged={isLogged}
                  />
                </div>
                <AppFooter layoutColorMode={layoutColorMode} />
              </div>

              <CSSTransition
                classNames="layout-mask"
                timeout={{ enter: 200, exit: 200 }}
                in={mobileMenuActive}
                unmountOnExit
              >
                <div className="layout-mask p-component-overlay"></div>
              </CSSTransition>
            </Route>
          ) : (
            <Redirect to={"/"} />
          )}
        </Switch>
      </BrowserRouter>
    </div>
  );
}
