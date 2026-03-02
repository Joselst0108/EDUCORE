document.addEventListener("DOMContentLoaded", async () => {
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

  if (error) return showMsg("msgColegio", error.message);

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
