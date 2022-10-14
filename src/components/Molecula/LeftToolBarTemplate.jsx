import React from "react";
// import BtnToolBarTemplateDanger from "../Atomo/BtnToolBarTemplateDanger";
import BtnToolBarTemplateSuccess from "../Atomo/BtnToolBarTemplateSuccess";

export default function LeftToolBarTemplate({
    openNew,
    // confirmDeleteSelected,
    // selectedProducts,
  }) {
  return (
    <div>
      <BtnToolBarTemplateSuccess openNew={openNew} />
      {/* <BtnToolBarTemplateDanger
        confirmDeleteSelected={confirmDeleteSelected}
        selectedProducts={selectedProducts}
      /> */}
    </div>
  );
}
