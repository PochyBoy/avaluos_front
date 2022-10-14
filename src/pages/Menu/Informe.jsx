import React from 'react';
import { InputText } from 'primereact/inputtext';
// import { FileUpload } from 'primereact/fileupload';
import { Button } from 'primereact/button';

import { Image } from 'primereact/image';



// const arr1 = [
//   {
//     "Codigo": "J",
//     "Nombre Persona": "JURIDICAS",
//     "Estado": "ACTIVO"
//   },
//   {
//     "Codigo": "N",
//     "Nombre Persona": "NATURAL",
//     "Estado": "ACTIVO"
//   }
// ]

// const arr = {
//   "Codigo": "E",
//   "Nombre Persona": "EMPRESARIO",
//   "Estado": "INACTIVO"
// };

// const arrLength = arr1.unshift(arr);


const Informe = () => {

  // const toast = useRef(null);

  // const onUpload = () => {
  //   toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
  // }



  // const options = {
  //   center: { lat: 36.890257, lng: 30.707417 },
  //   zoom: 12
  // };

  return (

    <div className="card p-fluid">
      <h5>Generación de informe</h5>
      <div className="field">
        <label htmlFor="name1">Responsable</label>
        <InputText id="name1" type="text" />
      </div>
      <div className="field">
        <label htmlFor="email1">Nombre</label>
        <InputText id="email1" type="text" />
      </div>
      <div className="field">
        <label htmlFor="age1">Email</label>
        <InputText id="age1" type="text" />
      </div>
      {/* <div className="field">
        <Image src={`assets/demo/images/blocks/mapa.png`} width={50} style={{ verticalAlign: 'middle' }} />
      </div> */}
      <div>
        <div className="card">
          <h5>Registrar Ubicación del Inmueble</h5>
          <Image src="https://motor.elpais.com/wp-content/uploads/2022/01/google-maps-22-1800x728.jpg?v=1643297065" alt="Image" width="750" />

          {/* <h5>Preview</h5>
                <Image src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" alt="Image" width="250" preview /> */}
        </div>
      </div>
      {/* <GMap options={options} style={{width: '100%', minHeight: '320px'}} /> */}
      <div className="p-fluid grid formgrid">
        <div className="field col-12 md:col-4">
        <Button label="Adjuntar Informe" aria-label="Submit"  />
        </div>
      </div>
    </div>
  );
};

export default Informe;
