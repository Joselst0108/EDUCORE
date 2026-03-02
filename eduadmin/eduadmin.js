67898document.addEventListener("DOMContentLoaded", async () => {
  // Bloqueo por plan
  checkPlanAccess("eduadmin");

  const profile = await getUserProfile();
  if (!profile) return;

  const colegioId = profile.colegio_id;

  // Si estamos en colegio.html cargamos datos
  if (window.location.pathname.includes("colegio.html")) {
    loadColegio(colegioId);
    document.getElementById("btnGuardarColegio").addEventListener("click", () => {
      saveColegio(colegioId);
    });
  }
});

async function loadColegio(colegioId) {
  const { data, error } = await window.sb
    .from("colegios")
    .select("*")
    .eq("id", colegioId)
    .single();

  if (error) return showMsg("msgColegio", "❌ " + error.message);
if (!data) return showMsg("msgColegio", "❌ No se pudo leer el colegio (data=null)");

  document.getElementById("nombreColegio").value = data.nombre;
  document.getElementById("planColegio").value = data.plan;
}

async function saveColegio(colegioId) {
  const nombre = document.getElementById("nombreColegio").value.trim();

  const { error } = await window.sb
    .from("colegios")
    .update({ nombre })
    .eq("id", colegioId);

  if (error) return showMsg("msgColegio", error.message);

  showMsg("msgColegio", "✅ Guardado correctamente");
}

function showMsg(id, msg) {
  document.getElementById(id).innerText = msg;
}
// ===== AÑOS ACADÉMICOS =====

if (window.location.pathname.includes("anios.html")) {
  document.addEventListener("DOMContentLoaded", async () => {
    const profile = await getUserProfile();
    if (!profile) return;

    const colegioId = profile.colegio_id;

    loadAnios(colegioId);

    document.getElementById("btnCrearAnio").addEventListener("click", async () => {
      const anio = parseInt(document.getElementById("anioInput").value);
      if (!anio) return;

      await window.sb.from("anios_academicos").insert({
        colegio_id: colegioId,
        anio: anio,
        nombre: "Año " + anio,
        activo: false
      });

      loadAnios(colegioId);
    });
  });
}

async function loadAnios(colegioId) {
  const { data } = await window.sb
    .from("anios_academicos")
    .select("*")
    .eq("colegio_id", colegioId)
    .order("anio", { ascending: false });

  const container = document.getElementById("listaAnios");
  container.innerHTML = "";

  data.forEach(a => {
    const div = document.createElement("div");
    div.innerHTML = `
      <p>${a.anio} ${a.activo ? "(Activo)" : ""}</p>
      <button onclick="activarAnio('${a.id}')">Activar</button>
    `;
    container.appendChild(div);
  });
}

async function activarAnio(id) {
  const profile = await getUserProfile();
  const colegioId = profile.colegio_id;

  // Desactivar solo los años del mismo colegio
  await window.sb
    .from("anios_academicos")
    .update({ activo: false })
    .eq("colegio_id", colegioId);

  // Activar el seleccionado
  await window.sb
    .from("anios_academicos")
    .update({ activo: true })
    .eq("id", id);

  location.reload();
}