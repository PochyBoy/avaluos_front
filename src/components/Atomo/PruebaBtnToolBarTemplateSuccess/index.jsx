import React from "react";
import { Button } from "primereact/button";
export default function index({ nameLabel, openNew }) {
  return (
    <>
      <Button
        label={nameLabel}
        icon="pi pi-plus"
        className="p-button-success mr-2"
        onClick={openNew}
      />
    </>
  );
}
