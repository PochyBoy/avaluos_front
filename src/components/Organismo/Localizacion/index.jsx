import React, { useMemo, useRef, useState } from "react";
// leaflet
import { icon } from "leaflet";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
// Componente
import InputTextForm from "../../Atomo/InputTextForm";
import DialogFormFooter from "../../Molecula/DialogFormFooter";
import InputNumberForm from "../../Atomo/InputNumberForm";
import Icon from "./icon.svg";
import "leaflet/dist/leaflet.css";
import "./styles.scss";
// PrimeReact
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputSwitch } from "primereact/inputswitch";
export default function Localizacion({
  productDialog3,
  hideDialog3,
  saveProduct,
  data,
  getFormErrorMessage,
  onInputChange,
}) {
 
  const [draggable, setDraggable] = useState(false);
  function DraggableMarker() {
    const markerRef = useRef(null);
    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current;
          if (marker != null) {
            let LatLng = marker.getLatLng();
     
        
            onInputChange(
              {
                target: {
                  value: LatLng.lat,
                  name: "coordenadasX",
                },
              },
              "coordenadasX"
            );
            onInputChange(
              {
                target: {
                  value: LatLng.lng,
                  name: "coordenadasY",
                },
              },
              "coordenadasY"
            );
          }
        },
      }),
      []
    );

    return (
      <Marker
        draggable={draggable}
        eventHandlers={eventHandlers}
        position={{
          lat: data.coordenadasX||-17.7752264,
          lng: data.coordenadasY||-63.1846905,
        }}
        ref={markerRef}
        icon={icon({
          iconUrl: Icon,
          iconRetinaUrl: Icon,
          iconAnchor: null,
          shadowUrl: null,
          shadowAnchor: null,
          shadowSize: null,
          iconSize: [35, 35],
          className: "leaflet-venue-icon",
        })}
      ></Marker>
    );
  }
  const handleDraggable = () => {
    setDraggable(!draggable);
  };
  return (
    <>
      <Dialog
        visible={productDialog3}
        header="Registro de Localizacion"
        modal
        className="p-fluid screenWidth"
        footer={DialogFormFooter({
          OnClickTimes: hideDialog3,
          OnClickCheck: saveProduct,
        })}
        onHide={hideDialog3}
      >
        <InputTextForm
          nameLabel={"Responsable"}
          nameInput={"responsable"}
          dataInput={data.responsable}
          onInputChange={onInputChange}
          getFormErrorMessage={getFormErrorMessage}
          required={true}
        />
        <InputTextForm
          nameLabel={"Nombre"}
          nameInput={"nombre"}
          dataInput={data.nombre}
          onInputChange={onInputChange}
          getFormErrorMessage={getFormErrorMessage}
          required={true}
        />
        <InputTextForm
          nameLabel={"Email"}
          nameInput={"email"}
          dataInput={data.email}
          onInputChange={onInputChange}
          getFormErrorMessage={getFormErrorMessage}
          required={true}
        />
        <InputTextForm
          nameLabel={"Direccion"}
          nameInput={"direccion"}
          dataInput={data.direccion}
          onInputChange={onInputChange}
          getFormErrorMessage={getFormErrorMessage}
          required={true}
        />
        <div className="flexlocation">
          <div className="geolocalizacionflex">
            <InputNumberForm
              nameLabel={"Latitude"}
              nameInput={"coordenadasX"}
              dataInput={data.coordenadasX}
              onInputChange={onInputChange}
              getFormErrorMessage={getFormErrorMessage}
              required={true}
              
            />
            <InputNumberForm
              nameLabel={"Longitude"}
              nameInput={"coordenadasY"}
              dataInput={data.coordenadasY}
              onInputChange={onInputChange}
              getFormErrorMessage={getFormErrorMessage}
              required={true}
              
            />
          </div>
          {!draggable ? (
            <Button
              label="Editar Mapa"
              className="btnLocation"
              onClick={handleDraggable}
            />
          ) : (
            <Button
              label="Guardar Mapa"
              className="btnLocation"
              onClick={handleDraggable}
            />
          )}
          <div className="field">
            <label htmlFor={"Estado".toLowerCase()}>Estado</label>
            <br />

            <InputSwitch
              id="estado"
              name="estado"
              checked={data.estado}
              onChange={(e) => onInputChange(e, "estado")}
            />
          </div>
        </div>

        <div>
          <MapContainer
            center={{
              lat: data.coordenadasX||-17.7752264,
              lng: data.coordenadasY||-63.1846905,
            }}
            zoom={13}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <DraggableMarker lat={data.coordenadasX} lng={data.coordenadasY} />
          </MapContainer>
        </div>
      </Dialog>
    </>
  );
}
