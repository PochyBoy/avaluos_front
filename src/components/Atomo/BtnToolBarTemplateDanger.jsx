import { Button } from "primereact/button";
import React from "react";

export default function BtnToolBarTemplateDanger({
  confirmDeleteSelected,
  selectedProducts,
}) {
  return (
    <>
      <Button
        label="Borrar"
        icon="pi pi-trash"
        className="p-button-danger"
        onClick={confirmDeleteSelected}
        disabled={!selectedProducts || !selectedProducts.length}
      />
    </>
  );
}
