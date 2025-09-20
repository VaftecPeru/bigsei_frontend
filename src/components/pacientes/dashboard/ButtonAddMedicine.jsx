import React from "react";

const ButtonAgreg = ({ onClick }) => {
  return (
    <button className="buttonAddMedicine" onClick={onClick}>
      ➕ Agregar Medicamento
    </button>
  );
};

export default ButtonAgreg;
