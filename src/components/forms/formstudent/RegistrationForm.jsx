import { useState, useContext } from "react";
import { ContextGlobal } from "../../../App";

//Program section
function Program_section({ formData, handleInputChange }) {
  return (
    <>
      <div className="font-bold mb-2">PROGRAMA DE ESTUDIOS A INSCRIBIRSE:</div>
      <table className="w-full border-collapse mb-4">
        <tbody>
          <tr>
            <td className="border border-black p-2 bg-[#E6F0F8] w-1/3">
              Tipo Programa:
            </td>
            <td className="border border-black p-2 bg-[#E6E6E6] w-1/3">
              <input
                type="text"
                name="tipoPrograma"
                value={formData.tipoPrograma}
                onChange={handleInputChange}
                className="w-full bg-transparent"
              />
            </td>
            <td className="border border-black p-2 bg-[#E6F0F8] w-1/6">
              Carrera/
              <br />
              especialización:
            </td>
            <td className="border border-black p-2">
              <div className="space-y-1">
                {[
                  "Inteligencia artificial",
                  "Desarrollo web",
                  "Ciencia de datos",
                  "Ciberseguridad",
                  "Cloud computing",
                ].map((carrera, index) => (
                  <div key={index}>
                    <label>
                      <input
                        type="radio"
                        name="carrera"
                        value={carrera}
                        checked={formData.carrera === carrera}
                        onChange={handleInputChange}
                      />{" "}
                      {carrera}
                    </label>
                  </div>
                ))}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

//institution Details Table  _ este comp. es usado en
function IE_details_table({ formData, handleInputChange }) {
  return (
    <>
      {/* Header */}
      <div className="bg-[#E6F0F8] text-center p-2 font-bold text-blue-900 border border-black">
        FICHA DE INSCRIPCION VIRTUAL Y DECLARACIÓN JURADA
      </div>

      {/* Tabla*/}
      <table className="w-full border-collapse mb-4">
        <tbody>
          <tr>
            <td className="border border-black p-2 w-1/3">Nombre del IE</td>
            <td className="border border-black p-2">
              <input
                type="text"
                name="ieName"
                value={formData.ieName}
                onChange={handleInputChange}
                className="w-full"
              />
            </td>
            <td className="border border-black p-2">Código modular</td>
            <td className="border border-black p-2">
              <input
                type="text"
                name="codigoModular"
                value={formData.codigoModular}
                onChange={handleInputChange}
                className="w-full"
              />
            </td>
          </tr>
          <tr>
            <td className="border border-black p-2">Tipo de Gestión</td>
            <td className="border border-black p-2">
              <select
                name="tipoGestion"
                value={formData.tipoGestion}
                onChange={handleInputChange}
                className="w-full"
              >
                <option value="">Seleccione</option>
                <option value="Privada">Privada</option>
                <option value="Pública">Pública</option>
              </select>
            </td>
            <td className="border border-black p-2">DRE/GRE</td>
            <td className="border border-black p-2">
              <input
                type="text"
                name="dre"
                value={formData.dre}
                onChange={handleInputChange}
                className="w-full"
              />
            </td>
          </tr>
          <tr>
            <td className="border border-black p-2" colSpan="2">
              Resolución de licenciamiento y/o autorización (tipo, número y
              fecha)
            </td>
            <td className="border border-black p-2" colSpan="2">
              <input
                type="text"
                name="resolucion"
                value={formData.resolucion}
                onChange={handleInputChange}
                className="w-full"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

function RegistrationForm() {
  const { idStep } = useContext(ContextGlobal);

  const [formData, setFormData] = useState({
    ieName: "",
    codigoModular: "",
    tipoGestion: "",
    dre: "",
    resolucion: "",
    tipoPrograma: "",
    carrera: "",
    turno: "",
    nivelFormativo: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    nombres: "",
    tipoDocumento: "",
    numeroDocumento: "",
    fechaNacimiento: "",
    edad: "",
    sexo: "",
    estadoCivil: "",
    telefonoFijo: "",
    celular: "",
    correoElectronico: "",
    gradoAcademico: "",
    pais: "",
    departamento: "",
    provincia: "",
    distrito: "",
    residenciaPais: "",
    residenciaDepartamento: "",
    residenciaProvincia: "",
    residenciaDistrito: "",
    domicilioActual: "",
    tipoColegio: "",
    nombreColegio: "",
    anioTerminoSecundaria: "",
    trabaja: false,
    razonSocial: "",
    telefonoTrabajo: "",
    tieneDiscapacidad: false,
    especifiqueDiscapacidad: "",
    carneConadis: "",
    apoderadoNombres: "",
    apoderadoTipoDoc: "",
    apoderadoNumDoc: "",
    apoderadoTelefono: "",
    apoderadoParentesco: "",
    apoderadoCorreo: "",
    apoderadoDireccion: "",
    quienApoyara: "",
    ocupacionPagador: "",
    tipoComprobante: "",
    primeraOpcion: "",
    primeraOpcionDetalle: "",
    porqueDecidiste: [],
    comoTeEnteraste: "",
    mediosVistos: [],
    esEstudiante: "",
    carreraActual: "",
    esEgresado: "",
    carreraEgresado: "",
    institucionNombre: "",
    identificacionNumero: "",
    fechaDeclaracion: {
      dia: "",
      mes: "",
      anio: "",
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically send the data to a server
  };

  return (
    <>
      {idStep !== 1 && idStep !== 2? (
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-4">
          <IE_details_table
            formData={formData}
            handleInputChange={handleInputChange}
          />

          <Program_section
            formData={formData}
            handleInputChange={handleInputChange}
          />

          <p className="my-2 text-sm">
            Llene la presente ficha de inscripción totalmente y con datos
            reales, ya que esos serán consignados en el sistema para su
            identificación y tramite documentario.
          </p>

          {/* Schedule Section */}
          <table className="w-full border-collapse mb-4">
            <tbody>
              <tr>
                <td className="border border-black p-2 bg-[#E6F0F8] w-1/4">
                  TURNO (marcar con X)
                </td>
                <td className="border border-black p-2">
                  {["Mañana", "Tarde", "Noche"].map((turno) => (
                    <label key={turno} className="mr-4">
                      <input
                        type="radio"
                        name="turno"
                        value={turno}
                        checked={formData.turno === turno}
                        onChange={handleInputChange}
                      />{" "}
                      {turno}
                    </label>
                  ))}
                </td>
              </tr>
              <tr>
                <td className="border border-black p-2 bg-[#E6F0F8]">
                  NIVEL FORMATIVO:
                </td>
                <td className="border border-black p-2">
                  <input
                    type="text"
                    name="nivelFormativo"
                    value={formData.nivelFormativo}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </td>
              </tr>
            </tbody>
          </table>

          {/* Student Data Section */}
          <div className="font-bold mb-2">DATOS DEL ESTUDIANTE:</div>
          <table className="w-full border-collapse">
            <tbody>
              <tr>
                <td
                  className="border border-black p-2 bg-[#E6F0F8] text-center"
                  colSpan="2"
                >
                  APELLIDO PATERNO
                </td>
                <td
                  className="border border-black p-2 bg-[#E6F0F8] text-center"
                  colSpan="2"
                >
                  APELLIDO MATERNO
                </td>
              </tr>
              <tr>
                <td className="border border-black p-2" colSpan="2">
                  <input
                    type="text"
                    name="apellidoPaterno"
                    value={formData.apellidoPaterno}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </td>
                <td className="border border-black p-2" colSpan="2">
                  <input
                    type="text"
                    name="apellidoMaterno"
                    value={formData.apellidoMaterno}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </td>
              </tr>
              <tr>
                <td className="border border-black p-2 bg-[#E6F0F8] text-center w-1/4">
                  NOMBRES
                </td>
                <td className="border border-black p-2 bg-[#E6F0F8] text-center">
                  TIPO DE DOCUMENTO (marcar con X)
                </td>
                <td
                  className="border border-black p-2 bg-[#E6F0F8] text-center"
                  colSpan="2"
                >
                  NRO. DOCUMENTO
                </td>
              </tr>
              <tr>
                <td className="border border-black p-2">
                  <input
                    type="text"
                    name="nombres"
                    value={formData.nombres}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </td>
                <td className="border border-black p-2">
                  <div className="grid grid-cols-2 gap-2">
                    {["DNI", "Pasaporte", "Carnet ext.", "Part. Nac."].map(
                      (tipo) => (
                        <label key={tipo}>
                          <input
                            type="radio"
                            name="tipoDocumento"
                            value={tipo}
                            checked={formData.tipoDocumento === tipo}
                            onChange={handleInputChange}
                          />{" "}
                          {tipo}
                        </label>
                      )
                    )}
                  </div>
                </td>
                <td className="border border-black p-2" colSpan="2">
                  <input
                    type="text"
                    name="numeroDocumento"
                    value={formData.numeroDocumento}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </td>
              </tr>
              <tr>
                <td className="border border-black p-2 bg-[#E6F0F8] text-center">
                  FECHA DE NACIMIENTO
                </td>
                <td className="border border-black p-2 bg-[#E6F0F8] text-center">
                  EDAD
                </td>
                <td
                  className="border border-black p-2 bg-[#E6F0F8] text-center"
                  colSpan="2"
                >
                  SEXO (marcar con X)
                </td>
              </tr>
              <tr>
                <td className="border border-black p-2">
                  <div className="flex gap-2">
                    <input
                      type="date"
                      name="fechaNacimiento"
                      value={formData.fechaNacimiento}
                      onChange={handleInputChange}
                      className="w-full"
                    />
                  </div>
                </td>
                <td className="border border-black p-2">
                  <input
                    type="number"
                    name="edad"
                    value={formData.edad}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </td>
                <td className="border border-black p-2" colSpan="2">
                  <div className="flex gap-4 justify-center">
                    <label>
                      <input
                        type="radio"
                        name="sexo"
                        value="Masculino"
                        checked={formData.sexo === "Masculino"}
                        onChange={handleInputChange}
                      />{" "}
                      Masculino
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="sexo"
                        value="Femenino"
                        checked={formData.sexo === "Femenino"}
                        onChange={handleInputChange}
                      />{" "}
                      Femenino
                    </label>
                  </div>
                </td>
              </tr>
              <tr>
                <td
                  className="border border-black p-2 bg-[#E6F0F8]"
                  colSpan="2"
                >
                  ESTADO CIVIL (marcar con X)
                </td>
                <td className="border border-black p-2 bg-[#E6F0F8]">
                  TELÉFONO FIJO
                </td>
                <td className="border border-black p-2 bg-[#E6F0F8]">
                  CELULAR
                </td>
              </tr>
              <tr>
                <td className="border border-black p-2" colSpan="2">
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      "Soltero",
                      "Casado",
                      "Viudo",
                      "Divorciado",
                      "Conviviente",
                      "Religioso",
                    ].map((estado) => (
                      <label key={estado}>
                        <input
                          type="radio"
                          name="estadoCivil"
                          value={estado}
                          checked={formData.estadoCivil === estado}
                          onChange={handleInputChange}
                        />{" "}
                        {estado}
                      </label>
                    ))}
                  </div>
                </td>
                <td className="border border-black p-2">
                  <input
                    type="tel"
                    name="telefonoFijo"
                    value={formData.telefonoFijo}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </td>
                <td className="border border-black p-2">
                  <input
                    type="tel"
                    name="celular"
                    value={formData.celular}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </td>
              </tr>
              <tr>
                <td
                  className="border border-black p-2 bg-[#E6F0F8]"
                  colSpan="2"
                >
                  CORREO ELECTRÓNICO
                </td>
                <td
                  className="border border-black p-2 bg-[#E6F0F8]"
                  colSpan="2"
                >
                  GRADO ACADÉMICO ACTUAL (marcar con X)
                </td>
              </tr>
              <tr>
                <td className="border border-black p-2" colSpan="2">
                  <input
                    type="email"
                    name="correoElectronico"
                    value={formData.correoElectronico}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </td>
                <td className="border border-black p-2" colSpan="2">
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      "Primaria",
                      "Secundaria",
                      "Técnico concluido",
                      "Técnico en curso",
                      "Universitario concluido",
                      "Universitario en curso",
                    ].map((grado) => (
                      <label key={grado}>
                        <input
                          type="radio"
                          name="gradoAcademico"
                          value={grado}
                          checked={formData.gradoAcademico === grado}
                          onChange={handleInputChange}
                        />{" "}
                        {grado}
                      </label>
                    ))}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          {/* Place of Birth Section */}
          <div className="font-bold mt-4 mb-2">LUGAR DE NACIMIENTO:</div>
          <table className="w-full border-collapse">
            <tbody>
              <tr>
                <td className="border border-black p-2 bg-[#E6F0F8] w-1/4">
                  PAÍS
                </td>
                <td className="border border-black p-2 bg-[#E6F0F8] w-1/4">
                  DEPARTAMENTO
                </td>
                <td className="border border-black p-2 bg-[#E6F0F8] w-1/4">
                  PROVINCIA
                </td>
                <td className="border border-black p-2 bg-[#E6F0F8] w-1/4">
                  DISTRITO
                </td>
              </tr>
              <tr>
                <td className="border border-black p-2">
                  <input
                    type="text"
                    name="pais"
                    value={formData.pais}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </td>
                <td className="border border-black p-2">
                  <input
                    type="text"
                    name="departamento"
                    value={formData.departamento}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </td>
                <td className="border border-black p-2">
                  <input
                    type="text"
                    name="provincia"
                    value={formData.provincia}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </td>
                <td className="border border-black p-2">
                  <input
                    type="text"
                    name="distrito"
                    value={formData.distrito}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </td>
              </tr>
            </tbody>
          </table>

          {/* Place of Residence Section */}
          <div className="font-bold mt-4 mb-2">LUGAR DE RESIDENCIA:</div>
          <table className="w-full border-collapse mb-4">
            <tbody>
              <tr>
                <td className="border border-black p-2 bg-[#E6F0F8] w-1/4">
                  PAÍS
                </td>
                <td className="border border-black p-2 bg-[#E6F0F8] w-1/4">
                  DEPARTAMENTO
                </td>
                <td className="border border-black p-2 bg-[#E6F0F8] w-1/4">
                  PROVINCIA
                </td>
                <td className="border border-black p-2 bg-[#E6F0F8] w-1/4">
                  DISTRITO
                </td>
              </tr>
              <tr>
                <td className="border border-black p-2">
                  <input
                    type="text"
                    name="residenciaPais"
                    value={formData.residenciaPais}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </td>
                <td className="border border-black p-2">
                  <input
                    type="text"
                    name="residenciaDepartamento"
                    value={formData.residenciaDepartamento}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </td>
                <td className="border border-black p-2">
                  <input
                    type="text"
                    name="residenciaProvincia"
                    value={formData.residenciaProvincia}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </td>
                <td className="border border-black p-2">
                  <input
                    type="text"
                    name="residenciaDistrito"
                    value={formData.residenciaDistrito}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </td>
              </tr>
              <tr>
                <td className="border border-black p-2 bg-[#E6F0F8]">
                  DOMICILIO ACTUAL
                </td>
                <td className="border border-black p-2" colSpan="3">
                  <input
                    type="text"
                    name="domicilioActual"
                    value={formData.domicilioActual}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </td>
              </tr>
            </tbody>
          </table>

          {/* School Data Section */}
          <div className="font-bold mt-4 mb-2">DATOS DEL COLEGIO:</div>
          <table className="w-full border-collapse mb-4">
            <tbody>
              <tr>
                <td className="border border-black p-2 bg-[#E6F0F8] w-1/4">
                  TIPO DE COLEGIO
                  <br />
                  (marcar con X)
                </td>
                <td className="border border-black p-2">
                  <div className="flex gap-4">
                    <label>
                      <input
                        type="radio"
                        name="tipoColegio"
                        value="Particular"
                        checked={formData.tipoColegio === "Particular"}
                        onChange={handleInputChange}
                      />{" "}
                      Particular
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="tipoColegio"
                        value="Estatal"
                        checked={formData.tipoColegio === "Estatal"}
                        onChange={handleInputChange}
                      />{" "}
                      Estatal
                    </label>
                  </div>
                </td>
                <td className="border border-black p-2 bg-[#E6F0F8]">
                  COLEGIO EN QUE TERMINASTE
                  <br />
                  SECUNDARIA
                </td>
                <td className="border border-black p-2">
                  <input
                    type="text"
                    name="nombreColegio"
                    value={formData.nombreColegio}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </td>
              </tr>
              <tr>
                <td className="border border-black p-2 bg-[#E6F0F8]">
                  AÑO EN QUE TERMINASTE LA
                  <br />
                  SECUNDARIA
                </td>
                <td className="border border-black p-2" colSpan="3">
                  <input
                    type="number"
                    name="anioTerminoSecundaria"
                    value={formData.anioTerminoSecundaria}
                    onChange={handleInputChange}
                    className="w-full"
                    min="1900"
                    max={new Date().getFullYear()}
                  />
                </td>
              </tr>
            </tbody>
          </table>

          {/* Work Section */}
          <div className="font-bold mt-4 mb-2">TRABAJA:</div>
          <table className="w-full border-collapse mb-4">
            <tbody>
              <tr>
                <td
                  className="border border-black p-2 bg-[#E6F0F8] text-sm"
                  colSpan="3"
                >
                  TRABAJA: (En caso de marcar sí, complete los siguientes
                  campos)
                </td>
              </tr>
              <tr>
                <td className="border border-black p-2 w-1/6">
                  <div className="flex gap-4">
                    <label>
                      <input
                        type="radio"
                        name="trabaja"
                        value="true"
                        checked={formData.trabaja === true}
                        onChange={(e) =>
                          handleInputChange({
                            target: {
                              name: "trabaja",
                              value: e.target.checked,
                            },
                          })
                        }
                      />{" "}
                      SI
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="trabaja"
                        value="false"
                        checked={formData.trabaja === false}
                        onChange={(e) =>
                          handleInputChange({
                            target: {
                              name: "trabaja",
                              value: e.target.checked,
                            },
                          })
                        }
                      />{" "}
                      NO
                    </label>
                  </div>
                </td>
                <td className="border border-black p-2 bg-[#E6F0F8]">
                  RAZÓN SOCIAL:
                </td>
                <td className="border border-black p-2">
                  <input
                    type="text"
                    name="razonSocial"
                    value={formData.razonSocial}
                    onChange={handleInputChange}
                    className="w-full"
                    disabled={!formData.trabaja}
                  />
                </td>
              </tr>
              <tr>
                <td className="border border-black p-2" colSpan="2"></td>
                <td className="border border-black p-2 bg-[#E6F0F8]">
                  TELÉFONO:
                </td>
              </tr>
              <tr>
                <td className="border border-black p-2" colSpan="2"></td>
                <td className="border border-black p-2">
                  <input
                    type="tel"
                    name="telefonoTrabajo"
                    value={formData.telefonoTrabajo}
                    onChange={handleInputChange}
                    className="w-full"
                    disabled={!formData.trabaja}
                  />
                </td>
              </tr>
            </tbody>
          </table>

          {/* Disability Section */}
          <div className="font-bold mt-4 mb-2">SUFRE ALGUNA DISCAPACIDAD:</div>
          <table className="w-full border-collapse mb-4">
            <tbody>
              <tr>
                <td
                  className="border border-black p-2 bg-[#E6F0F8]"
                  colSpan="2"
                >
                  SUFRE DE ALGUNA DISCAPACIDAD: (marcar con X)
                </td>
              </tr>
              <tr>
                <td className="border border-black p-2 w-1/6">
                  <div className="flex gap-4">
                    <label>
                      <input
                        type="radio"
                        name="tieneDiscapacidad"
                        value="true"
                        checked={formData.tieneDiscapacidad === true}
                        onChange={(e) =>
                          handleInputChange({
                            target: {
                              name: "tieneDiscapacidad",
                              value: e.target.checked,
                            },
                          })
                        }
                      />{" "}
                      SI
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="tieneDiscapacidad"
                        value="false"
                        checked={formData.tieneDiscapacidad === false}
                        onChange={(e) =>
                          handleInputChange({
                            target: {
                              name: "tieneDiscapacidad",
                              value: e.target.checked,
                            },
                          })
                        }
                      />{" "}
                      NO
                    </label>
                  </div>
                </td>
                <td className="border border-black p-2">
                  <div className="text-center text-sm mb-2">
                    Especifique discapacidad (en caso haya marcado SI):
                  </div>
                  <input
                    type="text"
                    name="especifiqueDiscapacidad"
                    value={formData.especifiqueDiscapacidad}
                    onChange={handleInputChange}
                    className="w-full"
                    disabled={!formData.tieneDiscapacidad}
                  />
                </td>
              </tr>
              <tr>
                <td
                  className="border border-black p-2 bg-[#E6F0F8]"
                  colSpan="2"
                >
                  N° CARNÉ CONADIS (en caso haya marcado SI):
                </td>
              </tr>
              <tr>
                <td className="border border-black p-2" colSpan="2">
                  <input
                    type="text"
                    name="carneConadis"
                    value={formData.carneConadis}
                    onChange={handleInputChange}
                    className="w-full"
                    disabled={!formData.tieneDiscapacidad}
                  />
                </td>
              </tr>
            </tbody>
          </table>

          {/* Parent/Guardian Data Section */}
          <div className="font-bold mt-4 mb-2">
            DATOS DEL PADRE, MADRE O APODERADO (si es menor de edad):
          </div>
          <table className="w-full border-collapse mb-4">
            <tbody>
              <tr>
                <td
                  className="border border-black p-2 bg-[#E6F0F8]"
                  colSpan="3"
                >
                  DATOS DEL PADRE, MADRE o APODERADO (si es menor de edad):
                </td>
              </tr>
              <tr>
                <td className="border border-black p-2">APELLIDOS Y NOMBRES</td>
                <td className="border border-black p-2">
                  <input
                    type="text"
                    name="apoderadoNombres"
                    value={formData.apoderadoNombres}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </td>
                <td className="border border-black p-2 bg-[#E6F0F8]">
                  <div className="text-center mb-2">PARENTESCO:</div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: "Padre", value: "padre" },
                      { label: "Madre", value: "madre" },
                      { label: "Hermano", value: "hermano" },
                      { label: "Hermana", value: "hermana" },
                    ].map((parentesco) => (
                      <label key={parentesco.value}>
                        <input
                          type="radio"
                          name="apoderadoParentesco"
                          value={parentesco.value}
                          checked={
                            formData.apoderadoParentesco === parentesco.value
                          }
                          onChange={handleInputChange}
                        />{" "}
                        {parentesco.label}
                      </label>
                    ))}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="border border-black p-2 bg-[#E6F0F8]">
                  TIPO DE DOCUMENTO (marcar con X)
                </td>
                <td className="border border-black p-2">NRO. DOCUMENTO</td>
                <td className="border border-black p-2">TELÉFONO</td>
              </tr>
              <tr>
                <td className="border border-black p-2">
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      "DNI",
                      "Pasaporte",
                      "Carnet ext.",
                      "Part. Nac.",
                      "Ced. Ciudadanía",
                      "Ced. Identidad",
                    ].map((tipo) => (
                      <label key={tipo}>
                        <input
                          type="radio"
                          name="apoderadoTipoDoc"
                          value={tipo}
                          checked={formData.apoderadoTipoDoc === tipo}
                          onChange={handleInputChange}
                        />{" "}
                        {tipo}
                      </label>
                    ))}
                  </div>
                </td>
                <td className="border border-black p-2">
                  <input
                    type="text"
                    name="apoderadoNumDoc"
                    value={formData.apoderadoNumDoc}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </td>
                <td className="border border-black p-2">
                  <input
                    type="tel"
                    name="apoderadoTelefono"
                    value={formData.apoderadoTelefono}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </td>
              </tr>
              <tr>
                <td className="border border-black p-2 bg-[#E6F0F8]">
                  CORREO ELECTRÓNICO
                </td>
                <td className="border border-black p-2" colSpan="2">
                  DIRECCIÓN
                </td>
              </tr>
              <tr>
                <td className="border border-black p-2">
                  <input
                    type="email"
                    name="apoderadoCorreo"
                    value={formData.apoderadoCorreo}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </td>
                <td className="border border-black p-2" colSpan="2">
                  <input
                    type="text"
                    name="apoderadoDireccion"
                    value={formData.apoderadoDireccion}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </td>
              </tr>
            </tbody>
          </table>

          {/* Other Data Section */}
          <div className="font-bold mt-4 mb-2">OTROS DATOS:</div>
          <table className="w-full border-collapse mb-4">
            <tbody>
              <tr>
                <td
                  className="border border-black p-2 bg-[#E6F0F8]"
                  colSpan="4"
                >
                  1. ¿QUIÉN TE APOYARÁ CON EL PAGO DE TUS ESTUDIOS? (marcar con
                  X)
                </td>
              </tr>
              <tr>
                <td className="border border-black p-2" colSpan="4">
                  <div className="flex gap-4 justify-center">
                    {[
                      "Padres o apoderados",
                      "Otro familiar",
                      "Yo mismo",
                      "Soy becado",
                    ].map((option) => (
                      <label key={option}>
                        <input
                          type="radio"
                          name="quienApoyara"
                          value={option}
                          checked={formData.quienApoyara === option}
                          onChange={handleInputChange}
                        />{" "}
                        {option}
                      </label>
                    ))}
                  </div>
                </td>
              </tr>
              <tr>
                <td
                  className="border border-black p-2 bg-[#E6F0F8]"
                  colSpan="4"
                >
                  2. OCUPACIÓN DEL QUE PAGARÁ TUS ESTUDIOS (obligatorio)
                </td>
              </tr>
              <tr>
                <td className="border border-black p-2" colSpan="4">
                  <input
                    type="text"
                    name="ocupacionPagador"
                    value={formData.ocupacionPagador}
                    onChange={handleInputChange}
                    className="w-full"
                    required
                  />
                </td>
              </tr>
              <tr>
                <td
                  className="border border-black p-2 bg-[#E6F0F8]"
                  colSpan="4"
                >
                  3. TIPO DE COMPROBANTE DE PAGO QUE REQUIERES (obligatorio)
                  (marcar con X)
                </td>
              </tr>
              <tr>
                <td className="border border-black p-2" colSpan="4">
                  <div className="flex gap-4 justify-center">
                    {["Boleta", "Factura"].map((tipo) => (
                      <label key={tipo}>
                        <input
                          type="radio"
                          name="tipoComprobante"
                          value={tipo}
                          checked={formData.tipoComprobante === tipo}
                          onChange={handleInputChange}
                          required
                        />{" "}
                        {tipo}
                      </label>
                    ))}
                  </div>
                </td>
              </tr>
              <tr>
                {" "}
                <td className="border border-black p-2" colSpan="4">
                  ¡Recuerda!
                </td>
              </tr>
              <tr>
                <td
                  className="border border-black p-2 bg-[#E6F0F8]"
                  colSpan="4"
                >
                  4. ¿FUE TU PRIMERA OPCIÓN CUANDO DECIDISTE ESTUDIAR UN
                  PROGRAMA O CURSO? (obligatorio) (marcar con X)
                </td>
              </tr>
              <tr>
                <td className="border border-black p-2" colSpan="4">
                  <div className="flex gap-4 justify-center">
                    <label>
                      <input
                        type="radio"
                        name="primeraOpcion"
                        value="SI"
                        checked={formData.primeraOpcion === "SI"}
                        onChange={handleInputChange}
                        required
                      />{" "}
                      SI
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="primeraOpcion"
                        value="NO"
                        checked={formData.primeraOpcion === "NO"}
                        onChange={handleInputChange}
                        required
                      />{" "}
                      NO
                    </label>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="border border-black p-2" colSpan="4">
                  En caso de marcar No, indica tu primera opción:
                  <input
                    type="text"
                    name="primeraOpcionDetalle"
                    value={formData.primeraOpcionDetalle}
                    onChange={handleInputChange}
                    className="w-full mt-2"
                    disabled={formData.primeraOpcion !== "NO"}
                  />
                </td>
              </tr>
              <tr>
                <td
                  className="border border-black p-2 bg-[#E6F0F8]"
                  colSpan="4"
                >
                  5. ¿POR QUÉ DECIDISTE ESTUDIAR? (obligatorio) (marcar con X)
                </td>
              </tr>
              <tr>
                <td className="border border-black p-2" colSpan="4">
                  <div className="space-y-2">
                    <label className="block">
                      <input
                        type="checkbox"
                        name="porqueDecidiste"
                        value="Prestigio y Trayectoria"
                        checked={formData.porqueDecidiste.includes(
                          "Prestigio y Trayectoria"
                        )}
                        onChange={(e) => {
                          const value = e.target.value;
                          handleInputChange({
                            target: {
                              name: "porqueDecidiste",
                              value: e.target.checked
                                ? [...formData.porqueDecidiste, value]
                                : formData.porqueDecidiste.filter(
                                    (v) => v !== value
                                  ),
                            },
                          });
                        }}
                      />{" "}
                      Prestigio y Trayectoria
                    </label>
                    <label className="block">
                      <input
                        type="checkbox"
                        name="porqueDecidiste"
                        value="Un amigo o familiar me recomendó la institución por su calidad académica"
                        checked={formData.porqueDecidiste.includes(
                          "Un amigo o familiar me recomendó la institución por su calidad académica"
                        )}
                        onChange={(e) => {
                          const value = e.target.value;
                          handleInputChange({
                            target: {
                              name: "porqueDecidiste",
                              value: e.target.checked
                                ? [...formData.porqueDecidiste, value]
                                : formData.porqueDecidiste.filter(
                                    (v) => v !== value
                                  ),
                            },
                          });
                        }}
                      />{" "}
                      Un amigo o familiar me recomendó la institución por su
                      calidad académica
                    </label>
                    <label className="block">
                      <input
                        type="checkbox"
                        name="porqueDecidiste"
                        value="Precio: Era lo más accesible que mi familia o yo podíamos costear para estudiar una carrera de salud"
                        checked={formData.porqueDecidiste.includes(
                          "Precio: Era lo más accesible que mi familia o yo podíamos costear para estudiar una carrera de salud"
                        )}
                        onChange={(e) => {
                          const value = e.target.value;
                          handleInputChange({
                            target: {
                              name: "porqueDecidiste",
                              value: e.target.checked
                                ? [...formData.porqueDecidiste, value]
                                : formData.porqueDecidiste.filter(
                                    (v) => v !== value
                                  ),
                            },
                          });
                        }}
                      />{" "}
                      Precio: Era lo más accesible que mi familia o yo podíamos
                      costear para estudiar una carrera de salud
                    </label>
                  </div>
                </td>
              </tr>
              <tr>
                <td
                  className="border border-black p-2 bg-[#E6F0F8]"
                  colSpan="4"
                >
                  6. ¿CÓMO TE ENTERASTE? (obligatorio) (marcar con X)
                </td>
              </tr>
              <tr>
                <td className="border border-black p-2" colSpan="4">
                  <input
                    type="text"
                    name="comoTeEnteraste"
                    value={formData.comoTeEnteraste}
                    onChange={handleInputChange}
                    className="w-full"
                    required
                  />
                </td>
              </tr>
              <tr>
                <td
                  className="border border-black p-2 bg-[#E6F0F8]"
                  colSpan="4"
                >
                  7. ¿EN QUÉ MEDIOS NOS HAS VISTO O ESCUCHADO? (obligatorio)
                  (marcar más de una alternativa)
                </td>
              </tr>
              <tr>
                <td className="border border-black p-2" colSpan="4">
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      "Televisión",
                      "Cine",
                      "Radio",
                      "Spotify",
                      "Volantes",
                      "Paneles publicitarios en vías públicas",
                      "Correo electrónico",
                      "Redes sociales",
                      "Web",
                    ].map((medio) => (
                      <label key={medio} className="flex items-start gap-2">
                        <input
                          type="checkbox"
                          name="mediosVistos"
                          value={medio}
                          checked={formData.mediosVistos.includes(medio)}
                          onChange={(e) => {
                            const value = e.target.value;
                            handleInputChange({
                              target: {
                                name: "mediosVistos",
                                value: e.target.checked
                                  ? [...formData.mediosVistos, value]
                                  : formData.mediosVistos.filter(
                                      (v) => v !== value
                                    ),
                              },
                            });
                          }}
                        />
                        <span>{medio}</span>
                      </label>
                    ))}
                  </div>
                </td>
              </tr>
              <tr>
                <td
                  className="border border-black p-2 bg-[#E6F0F8]"
                  colSpan="4"
                >
                  8. ¿ES ACTUALMENTE ESTUDIANTE? (obligatorio)
                </td>
              </tr>
              <tr>
                <td className="border border-black p-2" colSpan="4">
                  <div className="flex gap-4 justify-center">
                    <label>
                      <input
                        type="radio"
                        name="esEstudiante"
                        value="SI"
                        checked={formData.esEstudiante === "SI"}
                        onChange={handleInputChange}
                        required
                      />{" "}
                      SI
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="esEstudiante"
                        value="NO"
                        checked={formData.esEstudiante === "NO"}
                        onChange={handleInputChange}
                        required
                      />{" "}
                      NO
                    </label>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="border border-black p-2" colSpan="4">
                  En caso de marcar Sí, de qué carrera o programa/curso:
                  <input
                    type="text"
                    name="carreraActual"
                    value={formData.carreraActual}
                    onChange={handleInputChange}
                    className="w-full mt-2"
                    disabled={formData.esEstudiante !== "SI"}
                  />
                </td>
              </tr>
              <tr>
                <td
                  className="border border-black p-2 bg-[#E6F0F8]"
                  colSpan="4"
                >
                  9. ¿ES EGRESADO? (obligatorio)
                </td>
              </tr>
              <tr>
                <td className="border border-black p-2" colSpan="4">
                  <div className="flex gap-4 justify-center">
                    <label>
                      <input
                        type="radio"
                        name="esEgresado"
                        value="SI"
                        checked={formData.esEgresado === "SI"}
                        onChange={handleInputChange}
                        required
                      />{" "}
                      SI
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="esEgresado"
                        value="NO"
                        checked={formData.esEgresado === "NO"}
                        onChange={handleInputChange}
                        required
                      />{" "}
                      NO
                    </label>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="border border-black p-2" colSpan="4">
                  En caso de marcar Sí, de qué carrera o programa/curso:
                  <input
                    type="text"
                    name="carreraEgresado"
                    value={formData.carreraEgresado}
                    onChange={handleInputChange}
                    className="w-full mt-2"
                    disabled={formData.esEgresado !== "SI"}
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <div className="mt-8 max-w-4xl mx-auto">
            <div className="text-center font-bold mb-4">
              <div>DECLARACIÓN JURADA DEL ESTUDIANTE</div>
              <div className="mt-2">
                INSTITUCIÓN{" "}
                <input
                  type="text"
                  name="institucionNombre"
                  value={formData.institucionNombre}
                  onChange={handleInputChange}
                  className="border-b border-black w-64 text-center"
                />
              </div>
            </div>

            <div className="mb-6 text-justify">
              <p className="mb-4">
                Yo,{" "}
                <input
                  type="text"
                  value={`${formData.nombres} ${formData.apellidoPaterno} ${formData.apellidoMaterno}`}
                  className="border-b border-black w-64 text-center"
                  readOnly
                />{" "}
                identificado (a) con{" "}
                <input
                  type="text"
                  value={formData.tipoDocumento}
                  className="border-b border-black w-32 text-center"
                  readOnly
                />{" "}
                N°{" "}
                <input
                  type="text"
                  value={formData.numeroDocumento}
                  className="border-b border-black w-32 text-center"
                  readOnly
                />
                , declaro bajo juramento la veracidad de la información
                presentada para el proceso de matrícula del{" "}
                <input
                  type="text"
                  value={formData.institucionNombre}
                  className="border-b border-black w-64 text-center"
                  readOnly
                />{" "}
                y suscribo mi compromiso de cumplir y respetar lo siguiente:
              </p>

              <ol className="list-decimal pl-6 space-y-2">
                <li>
                  Me matriculo voluntariamente bajo responsabilidad e
                  iniciativa, para seguir el plan de estudios vigente de la
                  carrera elegida, aceptando que la institución no hará
                  devolución de pagos efectuados por la cancelación de
                  inscripción y/o matrícula que hubiese realizado.
                </li>
                <li>
                  Acepto que la institución se reserva el derecho de aperturar
                  secciones e inicio, en caso de que el número de alumnos no
                  corresponda a lo establecido.
                </li>
                <li>
                  Conozco y he leído la Política de Pago del Estudiante, que se
                  encuentra en el Portal de Transparencia de la Institución
                </li>
                <li>
                  Me acojo a lo estipulado en la Política de Pagos del
                  Estudiante, en la que se detallan las condiciones sobre temas
                  económicos, tales como beneficios, convenios, devoluciones,
                  gastos administrativos por incumplimiento de pago, entre
                  otros.
                </li>
                <li>
                  Autorizo se realice el reporte a las Centrales de Riesgos, en
                  caso de incumplimiento de pago por los derechos de enseñanza.
                </li>
              </ol>

              <p className="mt-6 mb-4">
                Expreso mi conformidad con el contenido del presente documento.
              </p>

              <div className="mt-8">
                Lima,{" "}
                <input
                  type="number"
                  name="fechaDeclaracion.dia"
                  value={formData.fechaDeclaracion.dia}
                  onChange={handleInputChange}
                  className="border-b border-black w-16 text-center"
                  min="1"
                  max="31"
                  placeholder="día"
                />{" "}
                de{" "}
                <input
                  type="text"
                  name="fechaDeclaracion.mes"
                  value={formData.fechaDeclaracion.mes}
                  onChange={handleInputChange}
                  className="border-b border-black w-32 text-center"
                  placeholder="mes"
                />{" "}
                de 20
                <input
                  type="number"
                  name="fechaDeclaracion.anio"
                  value={formData.fechaDeclaracion.anio}
                  onChange={handleInputChange}
                  className="border-b border-black w-16 text-center"
                  min="0"
                  max="99"
                  placeholder="año"
                />
              </div>
            </div>
            <br />
            <div className="italic text-sm">
              <p>
                Autorizo libre y expresamente el tratamiento de mis datos
                personales, los cuales serás registrados en el banco de datos
                “Alumnos” de titularidad de la Institución. (en adelante, el
                “colegio/ Instituto/Universidad”), con la finalidad que esta
                última pueda almacenar mis datos, y además remitirme información
                a través de mis correo electrónico, WhatsApp, número de teléfono
                o dirección física sobre promociones, concursos, ofertas y, en
                general, realizar publicidad sobre los servicios de la
                institución durante un plazo indefinido o hasta que revoque esta
                autorización. Se me ha informado que la institución tratará
                directamente mis datos personales o a través de terceros. Cabe
                precisar que la presente autorización es obligatoria a finque la
                institución pueda cumplir con la finalidad antes mencionada.
                Podré ejercer los derechos contenidos en la Ley N° 29733, su
                reglamento y/o normas modificatorias, dirigiendo una solicitud
                al domicilio fiscal de la institución.{" "}
              </p>
            </div>
          </div>

          {/* en caso el estudiante es menor de edad */}
          <div className="mt-36">
            <span>
              En caso el estudiante es menor de edad, el apoderado debe llenar
              lo siguiente:
            </span>
          </div>
          <div className="max-w-4xl mx-auto p-8 space-y-6">
            <div></div>

            <div className="text-center space-y-2">
              <h1 className="font-bold text-lg">
                DECLARACIÓN JURADA DEL APODERADO
              </h1>
              <div className="flex items-center justify-center gap-2">
                <span className="font-bold">INSTITUCIÓN</span>
                <input
                  type="text"
                  className="border-b border-black focus:outline-none w-96 text-center"
                  placeholder="Nombre de la institución"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 items-center">
                  <span>Yo,</span>
                  <input
                    type="text"
                    className="border-b border-black focus:outline-none flex-grow"
                    placeholder="Nombres y apellidos"
                  />
                  <span>identificado (a) con</span>
                  <input
                    type="text"
                    className="border-b border-black focus:outline-none w-40"
                    placeholder="Tipo de documento"
                  />
                </div>

                <div className="flex flex-wrap gap-2 items-center">
                  <span>N°.</span>
                  <input
                    type="text"
                    className="border-b border-black focus:outline-none w-32"
                    placeholder="Número"
                  />
                  <span>domiciliado en la dirección</span>
                  <input
                    type="text"
                    className="border-b border-black focus:outline-none flex-grow"
                    placeholder="Dirección"
                  />
                </div>

                <div className="flex flex-wrap gap-2 items-center">
                  <span>distrito de</span>
                  <input
                    type="text"
                    className="border-b border-black focus:outline-none w-40"
                    placeholder="Distrito"
                  />
                  <span>provincia de</span>
                  <input
                    type="text"
                    className="border-b border-black focus:outline-none w-40"
                    placeholder="Provincia"
                  />
                  <span>departamento de</span>
                  <input
                    type="text"
                    className="border-b border-black focus:outline-none w-40"
                    placeholder="Departamento"
                  />
                </div>

                <div className="flex flex-wrap gap-2 items-center">
                  <span>con N° de contacto</span>
                  <input
                    type="tel"
                    className="border-b border-black focus:outline-none w-40"
                    placeholder="Número de contacto"
                  />
                  <span>me presento como APODERADO del/la estudiante</span>
                  <input
                    type="text"
                    className="border-b border-black focus:outline-none flex-grow"
                    placeholder="Nombre del estudiante"
                  />
                </div>

                <div className="flex flex-wrap gap-2 items-center">
                  <span>
                    y declaro bajo juramento la veracidad de la información
                    presentada del estudiante para el proceso de matrícula en la
                    Institución
                  </span>
                  <input
                    type="text"
                    className="border-b border-black focus:outline-none flex-grow"
                    placeholder="Nombre de la institución"
                  />
                </div>

                <p>
                  y suscribo mi compromiso de cumplir y respetar lo siguiente:
                </p>
              </div>

              <ol className="list-decimal pl-6 space-y-4">
                <li className="text-justify">
                  Matriculo voluntariamente al estudiante bajo mi
                  responsabilidad e iniciativa, para seguir el plan de estudios
                  vigente de la carrera elegida, aceptando que la institución no
                  hará devolución de pagos efectuados por la cancelación de
                  inscripción y/o matrícula que hubiese realizado.
                </li>
                <li className="text-justify">
                  Acepto que la institución se reserva el derecho de aperturar
                  secciones al inicio, en caso de que el número de alumnos no
                  corresponda a lo establecido.
                </li>
                <li className="text-justify">
                  Conozco y he leído la Política de Pago del Estudiante, que se
                  encuentra en el Portal de Transparencia de la institución.
                </li>
                <li className="text-justify">
                  Me acojo a lo estipulado en la Política de Pagos del
                  Estudiante, en la que se detallan las condiciones sobre temas
                  económicos, tales como beneficios, convenios, devoluciones,
                  gastos administrativos por incumplimiento de pago, entre
                  otros.
                </li>
                <li className="text-justify">
                  Autorizo se realice el reporte a las Centrales de Riesgos, en
                  caso de incumplimiento de pago por los derechos de enseñanza.
                </li>
              </ol>

              <p>
                Expreso mi conformidad con el contenido del presente documento.
              </p>

              <div className="mt-16 flex gap-2 items-center">
                <span>Lima,</span>
                <input
                  type="text"
                  className="border-b border-black focus:outline-none w-20 text-center"
                  placeholder="día"
                />
                <span>de</span>
                <input
                  type="text"
                  className="border-b border-black focus:outline-none w-32 text-center"
                  placeholder="mes"
                />
                <span>de 20</span>
                <input
                  type="text"
                  className="border-b border-black focus:outline-none w-16 text-center"
                  placeholder="año"
                />
              </div>
            </div>
            <div className="italic text-sm">
              <span>
                Autorizo libre y expresamente el tratamiento de mis datos
                personales, los cuales serás registrados en el banco de datos
                “Alumnos” de titularidad de la Institución. (en adelante, el
                “colegio/ Instituto/Universidad”), con la finalidad que esta
                última pueda almacenar mis datos, y además remitirme información
                a través de mis correo electrónico, WhatsApp, número de teléfono
                o dirección física sobre promociones, concursos, ofertas y, en
                general, realizar publicidad sobre los servicios de la
                institución durante un plazo indefinido o hasta que revoque esta
                autorización. Se me ha informado que la institución tratará
                directamente mis datos personales o a través de terceros. Cabe
                precisar que la presente autorización es obligatoria a finque la
                institución pueda cumplir con la finalidad antes mencionada.
                Podré ejercer los derechos contenidos en la Ley N° 29733, su
                reglamento y/o normas modificatorias, dirigiendo una solicitud
                al domicilio fiscal de la institución.
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Enviar formulario
          </button>
        </form>
      ) : (
        ""
      )}
    </>
  );
}

export default RegistrationForm;
