// assets/js/ui.js
(() => {
  const esc = (s) => String(s ?? "")
    .replaceAll("&","&amp;").replaceAll("<","&lt;")
    .replaceAll(">","&gt;").replaceAll('"',"&quot;")
    .replaceAll("'","&#39;");

  const is = (roles=[]) => roles.includes(window.currentUser?.role);

  function appLinks() {
    // apps por plan
    const plan = window.currentPlan || "essential";
    const allowed = {
      essential: ["eduadmin","edubank"],
      professional: ["eduadmin","eduasist","edubank","eduia"],
      premium: ["eduadmin","eduasist","edubank","eduia"],
    }[plan] || ["eduadmin","edubank"];

    const links = [];
    if (allowed.includes("eduadmin")) links.push(`<a class="nav-link" href="/eduadmin/dashboard.html">EduAdmin</a>`);
    if (allowed.includes("eduasist")) links.push(`<a class="nav-link" href="/eduasist/dashboard.html">EduAsist</a>`);
    if (allowed.includes("edubank"))  links.push(`<a class="nav-link" href="/edubank/dashboard.html">EduBank</a>`);
    if (allowed.includes("eduia"))    links.push(`<a class="nav-link" href="/eduia/dashboard.html">EduAI</a>`);
    return links.join("");
  }

  function eduadminMenu() {
    // solo si estás en eduadmin
    const path = location.pathname || "";
    if (!path.includes("/eduadmin/")) return "";

    // roles permitidos para admin
    const canAdmin = is(["superadmin","admin","director"]);
    if (!canAdmin) {
      return `
        <div class="nav-section">
          <div class="nav-title">EduAdmin</div>
          <a class="nav-link" href="/eduadmin/dashboard.html">Inicio</a>
        </div>
      `;
    }

    return `
      <div class="nav-section">
        <div class="nav-title">Configuración</div>
        <a class="nav-link" href="/eduadmin/colegio.html">Datos del colegio</a>
        <a class="nav-link" href="/eduadmin/anios.html">Año académico</a>
        <a class="nav-link disabled" href="javascript:void(0)">Niveles</a>
        <a class="nav-link disabled" href="javascript:void(0)">Grados</a>
        <a class="nav-link disabled" href="javascript:void(0)">Secciones</a>
        <a class="nav-link disabled" href="javascript:void(0)">Vacantes</a>
        <a class="nav-link disabled" href="javascript:void(0)">Cursos</a>
        <a class="nav-link disabled" href="javascript:void(0)">Docentes</a>
        <a class="nav-link disabled" href="javascript:void(0)">Horarios</a>
        <a class="nav-link disabled" href="javascript:void(0)">Permisos</a>
        <a class="nav-link disabled" href="javascript:void(0)">Cajas</a>
      </div>

      <div class="nav-section">
        <div class="nav-title">Matrícula</div>
        <a class="nav-link disabled" href="javascript:void(0)">Alumnos</a>
        <a class="nav-link disabled" href="javascript:void(0)">Apoderados</a>
        <a class="nav-link disabled" href="javascript:void(0)">Matrícula</a>
        <a class="nav-link disabled" href="javascript:void(0)">Traslados</a>
        <a class="nav-link disabled" href="javascript:void(0)">Historial</a>
      </div>

      <div class="nav-section">
        <div class="nav-title">Finanzas</div>
        <a class="nav-link disabled" href="javascript:void(0)">Conceptos</a>
        <a class="nav-link disabled" href="javascript:void(0)">Cronograma</a>
        <a class="nav-link disabled" href="javascript:void(0)">Deudas</a>
        <a class="nav-link disabled" href="javascript:void(0)">Descuentos</a>
        <a class="nav-link disabled" href="javascript:void(0)">Pagos</a>
        <a class="nav-link disabled" href="javascript:void(0)">Caja</a>
        <a class="nav-link disabled" href="javascript:void(0)">Arqueo</a>
      </div>

      <div class="nav-section">
        <div class="nav-title">Reportes</div>
        <a class="nav-link disabled" href="javascript:void(0)">Ingresos</a>
        <a class="nav-link disabled" href="javascript:void(0)">Morosidad</a>
        <a class="nav-link disabled" href="javascript:void(0)">Por grado</a>
        <a class="nav-link disabled" href="javascript:void(0)">Premium</a>
      </div>
    `;
  }

  function render() {
    const user = window.currentUser || {};
    const colegio = user?.colegios?.nombre || "Colegio";
    const plan = window.currentPlan || "essential";
    const role = user?.role || "-";

    const sidebar = document.getElementById("sidebar");
    const topbar = document.getElementById("topbar");
    if (!sidebar || !topbar) return;

    sidebar.innerHTML = `
      <aside class="sidebar">
        <div class="brand">
          <div class="brand-logo">E</div>
          <div>
            <div class="brand-name">EDUCORE</div>
            <div class="brand-sub">${esc(colegio)}</div>
          </div>
        </div>

        <div class="nav-section">
          <div class="nav-title">General</div>
          <a class="nav-link" href="/dashboard.html">Dashboard</a>
          ${appLinks()}
        </div>

        ${eduadminMenu()}

        <div class="sidebar-footer">
          <button class="btn danger" onclick="logout()">Salir</button>
        </div>
      </aside>
    `;

    topbar.innerHTML = `
      <header class="topbar">
        <div class="top-left">
          <div class="pill">Plan: <b>${esc(plan)}</b></div>
          <div class="pill">Rol: <b>${esc(role)}</b></div>
        </div>
        <div class="top-right">
          <div class="userchip">
            <div class="avatar">${esc((user.full_name || "U").trim().slice(0,1).toUpperCase())}</div>
            <div>
              <div class="uname">${esc(user.full_name || "Usuario")}</div>
              <div class="usub">${esc(user.id || "")}</div>
            </div>
          </div>
        </div>
      </header>
    `;
  }

  // Se renderiza cuando guard.js ya cargó el perfil
  document.addEventListener("DOMContentLoaded", () => {
    setTimeout(render, 0);
    window.addEventListener("contextUpdated", render);
  });
})();