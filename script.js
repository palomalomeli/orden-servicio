// URL del Apps Script (reemplaza con la tuya real)
const url = 'https://script.google.com/macros/s/TU_URL_DE_APPS_SCRIPT/exec';

// Función para registrar datos en Google Sheets
function registrarDatos() {
  try {
    const cliente = document.getElementById("cliente").value;
    const telefono = document.getElementById("telefono").value;
    const vehiculo = document.getElementById("vehiculo").value;
    const color = document.getElementById("color").value;
    const kilometraje = document.getElementById("kilometraje").value;
    const noserie = document.getElementById("noserie").value;
    const tipomotor = document.getElementById("tipomotor").value;
    const motivo = document.getElementById("motivo").value;
    const serviciosRealizados = document.getElementById("serviciosRealizados").value;
    const observaciones = document.getElementById("observaciones").value;

    // Capturar los checkboxes seleccionados
    const otros = Array.from(document.querySelectorAll('input[name="otros"]:checked'))
      .map(cb => cb.value)
      .join(", ");

    const datos = {
      cliente,
      telefono,
      vehiculo,
      color,
      kilometraje,
      noserie,
      tipomotor,
      motivo,
      serviciosRealizados,
      otros,
      observaciones
    };

    // Enviar los datos a Google Sheets
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(datos),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.text())
    .then(response => {
      alert("Datos enviados correctamente.");
    })
    .catch(error => {
      console.error("Error al enviar datos:", error);
      alert("Error al enviar los datos.");
    });
  } catch (error) {
    console.error("Error al capturar datos:", error);
    alert("Hubo un problema al leer el formulario.");
  }
}

// Función para generar PDF
function generarPDF() {
  const cliente = document.getElementById("cliente").value;
  const telefono = document.getElementById("telefono").value;
  const vehiculo = document.getElementById("vehiculo").value;
  const color = document.getElementById("color").value;
  const kilometraje = document.getElementById("kilometraje").value;
  const noserie = document.getElementById("noserie").value;
  const tipomotor = document.getElementById("tipomotor").value;
  const motivo = document.getElementById("motivo").value;
  const serviciosRealizados = document.getElementById("serviciosRealizados").value;
  const observaciones = document.getElementById("observaciones").value;
  const otros = Array.from(document.querySelectorAll('input[name="otros"]:checked'))
    .map(cb => cb.value)
    .join(", ");

  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Orden de Servicio", 105, 15, null, null, "center");

  doc.setFontSize(14);
  doc.text("Taller Mecánico XYZ", 105, 25, null, null, "center");
  doc.text("Tel: 555-123-4567", 105, 32, null, null, "center");

  // Datos del cliente y vehículo
  doc.setFontSize(12);
  doc.text("Datos del Cliente:", 10, 45);
  doc.text(`Nombre: ${cliente}`, 10, 52);
  doc.text(`Teléfono: ${telefono}`, 10, 59);
  doc.text("Datos del Vehículo:", 110, 45);
  doc.text(`Vehículo: ${vehiculo}`, 110, 52);
  doc.text(`Color: ${color}`, 110, 59);
  doc.text(`Kilometraje: ${kilometraje}`, 110, 66);
  doc.text(`No. Serie: ${noserie}`, 110, 73);
  doc.text(`Tipo de Motor: ${tipomotor}`, 110, 80);

  // Motivo y servicios
  doc.setFontSize(12);
  doc.text("Motivo:", 10, 90);
  doc.text(doc.splitTextToSize(motivo, 190), 10, 97);
  
  doc.text("Servicios Realizados:", 10, doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : 115);
  doc.text(doc.splitTextToSize(serviciosRealizados, 190), 10, 115);

  doc.text("Otros servicios:", 10, 130);
  doc.text(doc.splitTextToSize(otros, 190), 10, 137);

  doc.text("Observaciones:", 10, 150);
  doc.text(doc.splitTextToSize(observaciones, 190), 10, 157);

  // En tu script.js
function generarPDF() {
  // Obtener el elemento imagen
  const imgElement = document.getElementById("imagenCarro");

  // Crear canvas para convertir la imagen a base64
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  // Ajusta el canvas al tamaño de la imagen
  canvas.width = imgElement.width;
  canvas.height = imgElement.height;

  // Cuando la imagen esté cargada
  imgElement.onload = () => {
    // Dibujar imagen en canvas
    ctx.drawImage(imgElement, 0, 0);

    // Obtener base64 de la imagen
    const base64Img = canvas.toDataURL("image/jpeg");

    const doc = new jsPDF();

    // Agrega el texto, etc.

    // Agregar imagen base64 al pdf
    doc.addImage(base64Img, "JPEG", 10, 180, 60, 40);

    // Guardar PDF
    doc.save("orden_servicio.pdf");
  };

  // Si la imagen ya estaba cargada, dispara onload manualmente
  if (imgElement.complete) {
    imgElement.onload();
  }
}


    // Firma
    doc.text("Firma del Cliente: ______________________", 10, 230);
    doc.text("Firma del Técnico: ______________________", 110, 230);

    doc.save("orden_servicio.pdf");
  };
