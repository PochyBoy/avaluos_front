import React from "react";
import { Dialog } from "primereact/dialog";
import DialogFormFooter from "../../Molecula/DialogFormFooter";
import { useState } from "react";
import { useRef } from "react";
import { Button } from "primereact/button";
import "./styles.scss";
export default function Anexo4({ productDialog2, hideDialog2, saveProduct2 }) {
  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const ref4 = useRef();
  const ref5 = useRef();
  const ref6 = useRef(); 
  const ref7 = useRef();
  const [inputFile, setinputFile] = useState({
    archivo1: null,
    archivo2: null,
    archivo3: null,
    archivo4: null,
    archivo5: null,
    archivo6: null,
    archivo7: null,
  });

  return (
    <>
      <Dialog
        visible={productDialog2}
        header="Registro de Archivos"
        modal
        className="p-fluid screenWidth"
        footer={DialogFormFooter({
          OnClickTimes: hideDialog2,
          OnClickCheck: saveProduct2,
        })}
        onHide={hideDialog2}
      >
        <div className="field">
          <label htmlFor="archivo1">
            Folio Real (90 Dias para garantias nuevas) o ultimo folio que
            consigne gravamen y asiento de subinscripcion (Garantias antiguas a
            favor del banco)
          </label>
          <br />
          <input
            type="file"
            name="archivo1"
            id="archivo1"
            ref={ref1}
            onChange={(e) =>
              setinputFile({
                ...inputFile,
                archivo1: e.target.value.split("\\").pop(),
              })
            }
            accept="application/pdf, .doc, .docx, .odf"
          />

          <Button
            className="btnInputFile"
            icon="pi pi-upload"
            label="Ingrese un Archivo PDF"
            onClick={() => ref1.current.click()}
          />
          <span className="spanFile">
            {" "}
            {inputFile.archivo1
              ? inputFile.archivo1
              : "Falta ingresar el documento."}
          </span>
        </div>

        <div className="field">
          <label htmlFor="archivo2">Ultimo impuesto</label>
          <br />
          <input
            type="file"
            name="archivo2"
            id="archivo2"
            ref={ref2}
            onChange={(e) =>
              setinputFile({
                ...inputFile,
                archivo2: e.target.value.split("\\").pop(),
              })
            }
            accept="application/pdf, .doc, .docx, .odf"
          />
          <Button
            className="btnInputFile"
            icon="pi pi-upload"
            label="Ingrese un Archivo PDF"
            onClick={() => ref2.current.click()}
          />

          <span className="spanFile">
            {" "}
            {inputFile.archivo2
              ? inputFile.archivo2
              : "Falta ingresar el documento."}
          </span>
        </div>
        <div className="field">
          <label htmlFor="">Plano de lote</label>
          <br />
          <input
            type="file"
            name="archivo3"
            id="archivo3"
            ref={ref3}
            onChange={(e) =>
              setinputFile({
                ...inputFile,
                archivo3: e.target.value.split("\\").pop(),
              })
            }
            accept="application/pdf, .doc, .docx, .odf"
          />
          <Button
            className="btnInputFile"
            icon="pi pi-upload"
            label="Ingrese un Archivo PDF"
            onClick={() => ref3.current.click()}
          />

          <span className="spanFile">
            {" "}
            {inputFile.archivo3
              ? inputFile.archivo3
              : "Falta ingresar el documento."}
          </span>
        </div>
        <div className="field">
          <label htmlFor="archivo4">Certificado catastral</label>
          <br />
          <input
            type="file"
            name="archivo4"
            id="archivo4"
            ref={ref4}
            onChange={(e) =>
              setinputFile({
                ...inputFile,
                archivo4: e.target.value.split("\\").pop(),
              })
            }
            accept="application/pdf, .doc, .docx, .odf"
          />
          <Button
            className="btnInputFile"
            icon="pi pi-upload"
            label="Ingrese un Archivo PDF"
            onClick={() => ref4.current.click()}
          />

          <span className="spanFile">
            {" "}
            {inputFile.archivo4
              ? inputFile.archivo4
              : "Falta ingresar el documento."}
          </span>
        </div>
        <div className="field">
          <label htmlFor="archivo5">Plano de ubicacion</label>
          <br />
          <input
            type="file"
            name="archivo5"
            id="archivo5"
            ref={ref5}
            onChange={(e) =>
              setinputFile({
                ...inputFile,
                archivo5: e.target.value.split("\\").pop(),
              })
            }
            accept="application/pdf, .doc, .docx, .odf"
          />
          <Button
            className="btnInputFile"
            icon="pi pi-upload"
            label="Ingrese un Archivo PDF"
            onClick={() => ref5.current.click()}
          />

          <span className="spanFile">
            {" "}
            {inputFile.archivo5
              ? inputFile.archivo5
              : "Falta ingresar el documento."}
          </span>
        </div>
        <div className="field">
          <label htmlFor="archivo6">
            Plano de construccion (Para proyectos de construccion)
          </label>
          <br />
          <input
            type="file"
            name="archivo6"
            id="archivo6"
            ref={ref6}
            onChange={(e) =>
              setinputFile({
                ...inputFile,
                archivo6: e.target.value.split("\\").pop(),
              })
            }
            accept="application/pdf, .doc, .docx, .odf"
          />
          <Button
            className="btnInputFile"
            icon="pi pi-upload"
            label="Ingrese un Archivo PDF"
            onClick={() => ref6.current.click()}
          />
          <span className="spanFile">
            {" "}
            {inputFile.archivo6
              ? inputFile.archivo6
              : "Falta ingresar el documento."}
          </span>
        </div>
        <div className="field">
          <label htmlFor="archivo7">
            Presupuesto de obra (para proyectos de construccion)
          </label>
          <br />
          <input
            type="file"
            name="archivo7"
            id="archivo7"
            ref={ref7}
            onChange={(e) =>
              setinputFile({
                ...inputFile,
                archivo7: e.target.value.split("\\").pop(),
              })
            }
            accept="application/pdf, .doc, .docx, .odf"
          />
          <Button
            className="btnInputFile"
            icon="pi pi-upload"
            label="Ingrese un Archivo PDF"
            onClick={() => ref7.current.click()}
          />

          <span className="spanFile">
            {" "}
            {inputFile.archivo7
              ? inputFile.archivo7
              : "Falta ingresar el documento."}
          </span>
        </div>
      </Dialog>
    </>
  );
}
