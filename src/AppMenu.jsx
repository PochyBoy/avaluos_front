import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import classNames from "classnames";
import { Ripple } from "primereact/ripple";
import { Badge } from "primereact/badge";

const AppSubmenu = (props) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const onMenuItemClick = (event, item, index) => {
    //avoid processing disabled items
    if (item.disabled) {
      event.preventDefault();
      return true;
    }

    //execute command
    if (item.command) {
      item.command({ originalEvent: event, item: item });
    }

    if (index === activeIndex) setActiveIndex(null);
    else setActiveIndex(index);

    if (props.onMenuItemClick) {
      props.onMenuItemClick({
        originalEvent: event,
        item: item,
      });
    }
  };

  const onKeyDown = (event) => {
    if (event.code === "Enter" || event.code === "Space") {
      event.preventDefault();
      event.target.click();
    }
  };

  const renderLinkContent = (item) => {
    let submenuIcon = item.items && (
      <i className="pi pi-fw pi-angle-down menuitem-toggle-icon"></i>
    );
    let badge = item.badge && <Badge value={item.badge} />;

    return (
      <React.Fragment>
        <i className={item.icon}></i>
        <span>{item.label}</span>
        {submenuIcon}
        {badge}
        <Ripple />
      </React.Fragment>
    );
  };

  const renderLink = (item, i) => {
    let content = renderLinkContent(item);

    if (item.to) {
      return (
        <NavLink
          aria-label={item.label}
          onKeyDown={onKeyDown}
          role="menuitem"
          className="p-ripple"
          activeClassName="router-link-active router-link-exact-active"
          to={item.to}
          onClick={(e) => onMenuItemClick(e, item, i)}
          exact
          target={item.target}
        >
          {content}
        </NavLink>
      );
    } else {
      return (
        <a
          tabIndex="0"
          aria-label={item.label}
          onKeyDown={onKeyDown}
          role="menuitem"
          href={item.url}
          className="p-ripple"
          onClick={(e) => onMenuItemClick(e, item, i)}
          target={item.target}
        >
          {content}
        </a>
      );
    }
  };

  let items =
    props.items &&
    props.items.map((item, i) => {
      let active = activeIndex === i;
      let styleClass = classNames(item.badgeStyleClass, {
        "layout-menuitem-category": props.root,
        "active-menuitem": active && !item.to,
      });

      if (props.root) {
        return (
          <li className={styleClass} key={i} role="none">
            {props.root === true && (
              <React.Fragment>
                <div
                  className="layout-menuitem-root-text"
                  aria-label={item.label}
                >
                  {item.label}
                </div>
                <AppSubmenu
                  items={item.items}
                  onMenuItemClick={props.onMenuItemClick}
                />
              </React.Fragment>
            )}
          </li>
        );
      } else {
        return (
          <li className={styleClass} key={i} role="none">
            {renderLink(item, i)}
            <CSSTransition
              classNames="layout-submenu-wrapper"
              timeout={{ enter: 1000, exit: 450 }}
              in={active}
              unmountOnExit
            >
              <AppSubmenu
                items={item.items}
                onMenuItemClick={props.onMenuItemClick}
              />
            </CSSTransition>
          </li>
        );
      }
    });

  return items ? (
    <ul className={props.className} role="menu">
      {items}
    </ul>
  ) : null;
};

export const AppMenu = (props) => {
  const isLogger = JSON.parse(localStorage.getItem("isLogger"));
  let menu = [];
  if (isLogger) {
    if (isLogger.rol === "Administrador") {
      menu = [
        {
          label: "Base de Información",
          items: [
            {
              label: "Dashboard",
              icon: "pi pi-fw pi-chart-bar",
              to: "/Dashboard",
            },
            {
              label: "Asignar Usuario",
              icon: "pi pi-fw pi-user",
              to: "/Asignar_Usuario",
            },
            {
              label: "Control de Usuario AD",
              icon: "pi pi-fw pi-shield",
              to: "/Control_de_Usuario_AD",
            },
            {
              label: "Registro de Avaluadores",
              icon: "pi pi-fw pi-users",
              to: "/Registro_de_Avaluadores",
            },
          ],
        },
        {
          label: "Bandejas",
          icon: "pi pi-fw pi-sitemap",
          items: [
            {
              label: "Bandeja de Experto",
              icon: "pi pi-fw pi-inbox",
              to: "/Bandeja_de_Experto",
            },
            {
              label: "Bandeja Peritos Avaluador",
              icon: "pi pi-fw pi-inbox",
              to: "/Bandeja_de_Perito_Avaluadores",
            },
            // {
            //   label: "Solicitud de Avalúo",
            //   icon: "pi pi-fw pi-id-card",
            //   to: "/Requerimientos",
            // },
            {
              label: "Registro de Solicitud",
              icon: "pi pi-fw pi-pencil",
              to: "/Registro_de_Solicitud",
            },
            {
              label: "Registro de Convenios",
              icon: "pi pi-fw pi-folder",
              to: "/Registro_de_Convenio",
            },
          ],
        },
        // {
        //   label: "Generacion de Informacion",
        //   items: [
        //     {
        //       label: "Validacion del Perito",
        //       icon: "pi pi-fw pi-eye",
        //       to: "/Informe",
        //     },
        //   ],
        // },
        {
          label: "Cliente",
          items: [
            {
              label: "Bandeja del Solicitante",
              icon: "pi pi-fw pi-paperclip",
              to: "/Registrar_visita_y_pago",
            },
          ],
        },
        {
          label: "Catalogo",
          items: [
            {
              label: "Registro de Banca",
              icon: "pi pi-fw pi-id-card",
              to: "/Registro_de_Banca",
            },
            {
              label: "Registro Asignado",
              icon: "pi pi-fw pi-id-card",
              to: "/Registro_de_Asignado",
            },
            {
              label: "Asignar SLA",
              icon: "pi pi-fw pi-id-card",
              to: "/Asignar_SLA",
            },
            {
              label: "Registro de Bien",
              icon: "pi pi-fw pi-id-card",
              to: "/Registro_de_Bien",
            },
            {
              label: "Registro de Tipo de Bien",
              icon: "pi pi-fw pi-id-card",
              to: "/Tipo_de_bien",
            },
            {
              label: "Registro de Solicitantes",
              icon: "pi pi-fw pi-id-card",
              to: "/Registro_de_Solicitantes",
            },
            {
              label: "Registro de Profesion",
              icon: "pi pi-fw pi-id-card",
              to: "/Registro_de_Profesion",
            },
            {
              label: "Registro de Municipio",
              icon: "pi pi-fw pi-id-card",
              to: "/Registro_de_Municipio",
            },
            {
              label: "Tipo de Persona",
              icon: "pi pi-fw pi-id-card",
              to: "/Tipo_de_Persona",
            },
          ],
        },
      ];
    } else if (isLogger.rol === "Gestor de Roles") {
      menu = [
        {
          label: "Base de Información",
          items: [
            {
              label: "Dashboard",
              icon: "pi pi-fw pi-chart-bar",
              to: "/Dashboard",
            },
          ],
        },

        {
          label: "Gestor de Roles",
          items: [
            {
              label: "Registro de Usuarios",
              icon: "pi pi-fw pi-user",
              to: "/Asignar_Usuario",
            },
            {
              label: "Control de Usuario AD",
              icon: "pi pi-fw pi-shield",
              to: "/Control_de_Usuario_AD",
            },
          ],
        },
      ];
    } else if (isLogger.rol === "Cliente") {
      menu = [
        {
          label: "Base de Información",
          items: [
            {
              label: "Dashboard",
              icon: "pi pi-fw pi-chart-bar",
              to: "/Dashboard",
            },
          ],
        },

        {
          label: "Cliente",
          items: [
            {
              label: "Registro visita y pago",
              icon: "pi pi-fw pi-paperclip",
              to: "/Registrar_visita_y_pago", //Bandeja_de_Solicitante
            },
          ],
        },
      ];
    }
    //else if (isLogger.rol === "Consultas") {
    //   menu = [
    //     {
    //       label: "Base de Información",
    //       items: [
    //         {
    //           label: "Dashboard",
    //           icon: "pi pi-fw pi-chart-bar",
    //           to: "/Dashboard",
    //         },
    //       ],
    //     },

    //     {
    //       label: "Consultas",
    //       items: [
    //         {
    //           label: "Consulta valores por zona", //Bandeja del Solicitante",
    //           icon: "pi pi-fw pi-paperclip",
    //           to: "/Registrar_visita_y_pago", //Bandeja_de_Solicitante
    //         },
    //       ],
    //     },
    //   ];
    // }
    else if (isLogger.rol === "Perito en avalúos") {
      menu = [
        {
          label: "Base de Información",
          items: [
            {
              label: "Dashboard",
              icon: "pi pi-fw pi-chart-bar",
              to: "/Dashboard",
            },
          ],
        },

        {
          label: "Perito avaluador",
          items: [
            {
              label: "Generación y envió de informe",
              icon: "pi pi-fw pi-paperclip",
              to: "/Generacion_y_Envio_de_Informe",
            },
          ],
        },
      ];
    } else if (isLogger.rol === "Solicitante") {
      menu = [
        {
          label: "Base de Información",
          items: [
            {
              label: "Dashboard",
              icon: "pi pi-fw pi-chart-bar",
              to: "/Dashboard",
            },
          ],
        },

        {
          label: "Solicitante",
          items: [
            // {
            //   label: "Registro de Solicitud",
            //   icon: "pi pi-fw pi-paperclip",
            //   to: "/Registro_de_Solicitud",
            // },
            {
              label: "Registro de Solicitud de Avaluos",
              icon: "pi pi-fw pi-paperclip",
              to: "/Solicitar_Avaluos",
            },
          ],
        },
      ];
    } else if (isLogger.rol === "Experto en avalúos") {
      menu = [
        {
          label: "Base de Información",
          items: [
            {
              label: "Dashboard",
              icon: "pi pi-fw pi-chart-bar",
              to: "/Dashboard",
            },
          ],
        },
        {
          label: "BANDEJAS",
          items: [
            // {
            //   label: "Bandeja de Experto",
            //   icon: "pi pi-fw pi-inbox",
            //   to: "/Bandeja_de_Experto",
            // },
            // {
            //   label: "Registro de Solicitud",
            //   icon: "pi pi-fw pi-pencil",
            //   to: "/Registro_de_Solicitud",
            // },
            {
              label: "Registrar convenios",
              icon: "pi pi-fw pi-paperclip",
              to: "/Registro_de_Convenio",
            },
            {
              label: "Revisión y validación del avalúo",
              icon: "pi pi-fw pi-paperclip",
              to: "/Revision_y_Validacion_de_avaluos",
            },
            {
              label: "Generar reporte",
              icon: "pi pi-fw pi-paperclip",
              to: "/Generacion_de_Reporte",
            },
          ],
        },
        {
          label: "CATALOGO",
          items: [
            {
              label: "Asignar SLA",
              icon: "pi pi-fw pi-paperclip",
              to: "/Asignar_SLA",
            },
            {
              label: "Registrar avaluadores",
              icon: "pi pi-fw pi-paperclip",
              to: "/Registro_de_Avaluadores",
            },
            {
              label: "Registro de Municipio",
              icon: "pi pi-fw pi-id-card",
              to: "/Registro_de_Municipio",
            },
          ],
        },
      ];
    }
  }
  return (
    <div className="layout-menu-container">
      <AppSubmenu
        items={menu}
        className="layout-menu"
        onMenuItemClick={props.onMenuItemClick}
        root={true}
        role="menu"
      />
    </div>
  );
};
