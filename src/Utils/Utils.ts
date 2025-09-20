import configApi from "./ConfigApi";

export function createFileUtil(data: string, nombre: string, extension: string) {
  const bytesAtob = atob(data);
  const tamanho = bytesAtob.length;
  const bytes = new Uint8Array(tamanho);

  for (let i = 0; i < tamanho; i++) {
      bytes[i] = bytesAtob.charCodeAt(i);
  }

  let type = "";
  const extensionUpper = extension.toUpperCase();

  if (extensionUpper == "PNG") {
    type = "image/png";
  } else if (extensionUpper == "PDF") {
    type = "application/pdf";
  } else if (extensionUpper == "JPEG") {
    type = "image/jpeg";
  } else if (extensionUpper == "ICON") {
    type = "image/x-icon";
  } else if (extensionUpper == "DOCX") {
    type = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  } else if (extensionUpper == "XLSX") {
    type = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  } else if (extensionUpper == "XLS") {
    type = "application/vnd.ms-excel";
  } else if (extensionUpper == "PPT") {
    type = "application/vnd.ms-powerpoint";
  } else if (extensionUpper == "PPTX") {
    type = "application/vnd.openxmlformats-officedocument.presentationml.presentation";
  } else {
    alert("El formato del archivo no esta definido.");
    return ;
  }

  const blob = new Blob([bytes], { type: type });

  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = nombre;
  link.click();
}

export function getBgBorder(pos: number) {
  const colores = [
    {
      backgroundColor: "#D0F0C0",
      borderColor: "#85C785",
    },
    {
      backgroundColor: "#D0F0C0",
      borderColor: "#85C785",
    },
  ];
  const index = pos % 2;

  return colores[index];
}

export function getFechaLunes() {
  const date = new Date();
  const day = date.getDay();
  const ajuste = (day == 0 ? -6 : 1) - day;
  const lunes = new Date(date);
  lunes.setDate(date.getDate() + ajuste);

  const anho = lunes.getFullYear();
  const mes = String(lunes.getMonth() + 1).padStart(2, '0');
  const dia = String(lunes.getDate()).padStart(2, '0');

  return anho + "-" + mes + "-" + dia;
}

export function getFechaCalendar(dia: number, hora: any) {
  const lunes = new Date(getFechaLunes());2024-11-20
  lunes.setDate(lunes.getDate() + (dia-1));
  const isoFecha = lunes.toISOString().substring(0, 10); // "YYYY-MM-DD"

  return  isoFecha + "T" + hora;
}

export function rutaApi(url: string) {
  const urlApi = configApi.baseURL + url;

  return  urlApi;
}