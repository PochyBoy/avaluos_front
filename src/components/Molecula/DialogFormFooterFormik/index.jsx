import { Button } from "primereact/button";
import React from "react";
import BtnDialogFormTimes from "../../Atomo/BtnDialogFormTimes";
import "./styles.scss";
export default function DialogFormFooterFormik({ OnClickTimes }) {
  return (
    <div className="btnFooterFormikRight">
      <div className="btnFooterFormik">
        <BtnDialogFormTimes OnClickTimes={OnClickTimes} />
        <Button
          type="submit"
          icon="pi pi-check"
          label="Guardar"
          className="p-button-text "
        />
      </div>
    </div>
  );
}
