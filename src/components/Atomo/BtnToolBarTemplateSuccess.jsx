import { Button } from 'primereact/button'
import React from 'react'

export default function BtnToolBarTemplateSuccess({openNew}) {
  return (
    <>
    <Button
            label="Nuevo"
            icon="pi pi-plus"
            className="p-button-success mr-2"
            onClick={openNew}
          />
    </>
  )
}
