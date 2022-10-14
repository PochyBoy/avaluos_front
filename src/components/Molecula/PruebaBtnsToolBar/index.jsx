import React from 'react'
import PruebaBtnToolBarTemplateSuccess from "../../Atomo/PruebaBtnToolBarTemplateSuccess";
export default function PruebaBtnsToolBar({
  openNewUno,
              openNewDos,
              openNewTres,
              openNewCuatro,
    // confirmDeleteSelected,
    // selectedProducts,
  }) {
  return (
    <div>
      <PruebaBtnToolBarTemplateSuccess openNew={openNewUno} nameLabel={"Codigo creciente"} />
      <PruebaBtnToolBarTemplateSuccess openNew={openNewDos} nameLabel={"Codigo Creciente de 10 digitos"}  />
      <PruebaBtnToolBarTemplateSuccess openNew={openNewTres} nameLabel={"Codigo Aleatorio de 10 digitos"}  />
      <PruebaBtnToolBarTemplateSuccess openNew={openNewCuatro} nameLabel={"Codigo Correlativo desde Tabla"}  />
    </div>
  )
}
