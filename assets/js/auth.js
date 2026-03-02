
async function logout() {
  await window.sb.auth.signOut();
  window.location.href = "/login.html";
}
