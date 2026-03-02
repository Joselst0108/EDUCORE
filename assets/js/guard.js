document.addEventListener("DOMContentLoaded", async () => {
  const p = await getUserProfile();
  if (!p) return;

  // 🔥 avisa al UI que ya hay contexto cargado
  window.dispatchEvent(new Event("contextUpdated"));
});