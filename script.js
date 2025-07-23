const scriptURL = 'https://script.google.com/macros/s/AKfycbxglq-Ieex-ysB2bky38xRnLgYQAb89yWr0RY_llskO2joQdEH139BWXVL3b3xdSAyXBA/exec';

document.getElementById('ordenForm').addEventListener('submit', e => {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  fetch(scriptURL, {
    method: 'POST',
    body: formData
  })
    .then(response => response.text())
    .then(result => {
      alert("Datos enviados correctamente");
      form.reset();
    })
    .catch(error => {
      console.error('Error al enviar datos:', error);
      alert("Error al enviar los datos.");
    });
});

function getCheckedOthers() {
  return Array.from(document.querySelectorAll('input[name="otros"]:checked'))
    .map(cb => cb.value);
}

function generarPDF() {
  const cliente = document.getElementById("cliente").value;
  const telefono = document.getElementById("telefono").value;
  const vehiculo = document.getElementById("vehiculo").value;
  const color = document.getElementById("color").value;
  const kilometraje = document.getElementById("kilometraje").value;
  const noSerie = document.getElementById("noSerie").value;
  const tipoMotor = document.getElementById("tipoMotor").value;
  const motivo = document.getElementById("motivo").value;
  const serviciosRealizados = document.getElementById("serviciosRealizados").value;
  const observaciones = document.getElementById("observaciones").value;
  const otros = getCheckedOthers().join(", ");

  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Orden de Servicio", 105, 15, null, null, "center");
  doc.setFontSize(14);
  doc.text("Taller Mecánico XYZ", 105, 25, null, null, "center");
  doc.text("Tel: 555-123-4567", 105, 32, null, null, "center");

  doc.setFontSize(12);
  doc.text("Datos del Cliente:", 10, 45);
  doc.text(`Nombre: ${cliente}`, 10, 52);
  doc.text(`Teléfono: ${telefono}`, 10, 59);

  doc.text("Datos del Vehículo:", 110, 45);
  doc.text(`Vehículo: ${vehiculo}`, 110, 52);
  doc.text(`Color: ${color}`, 110, 59);
  doc.text(`Kilometraje: ${kilometraje}`, 110, 66);
  doc.text(`No. Serie: ${noSerie}`, 110, 73);
  doc.text(`Tipo de Motor: ${tipoMotor}`, 110, 80);

  let y = 95;
  doc.text("Motivo:", 10, y);
  y += 7;
  const motivoText = doc.splitTextToSize(motivo, 190);
  doc.text(motivoText, 10, y);
  y += motivoText.length * 7;

  doc.text("Servicios Realizados:", 10, y);
  y += 7;
  const serviciosText = doc.splitTextToSize(serviciosRealizados, 190);
  doc.text(serviciosText, 10, y);
  y += serviciosText.length * 7;

  doc.text("Otros servicios:", 10, y);
  y += 7;
  const otrosText = doc.splitTextToSize(otros, 190);
  doc.text(otrosText, 10, y);
  y += otrosText.length * 7;

  doc.text("Observaciones:", 10, y);
  y += 7;
  const observacionesText = doc.splitTextToSize(observaciones, 190);
  doc.text(observacionesText, 10, y);
  y += observacionesText.length * 7;

  const imgElement = document.getElementById("imagenCarro");
  if (imgElement && imgElement.complete) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = imgElement.width;
    canvas.height = imgElement.height;
    ctx.drawImage(imgElement, 0, 0);
    const base64Img = canvas.toDataURL("image/jpeg");
    doc.addImage(base64Img, "JPEG", 10, y + 10, 60, 40);
  }

  doc.text("Firma del Cliente: ______________________", 10, 270);
  doc.text("Firma del Técnico: ______________________", 110, 270);

  doc.save("orden_servicio.pdf");
}
