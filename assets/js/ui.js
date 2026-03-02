document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("sidebar").innerHTML = `
    <div style="width:220px;position:fixed;height:100%;background:#111827;padding:20px;">
      <h3>EDUCORE</h3>
      <a href="/dashboard.html">Dashboard</a><br><br>
      <a href="/eduadmin/">EduAdmin</a><br>
      <a href="/eduasist/">EduAsist</a><br>
      <a href="/edubank/">EduBank</a><br>
      <a href="/eduia/">EduAI</a><br><br>
      <button onclick="logout()">Salir</button>
    </div>
  `;
});
