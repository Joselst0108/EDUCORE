document.addEventListener("DOMContentLoaded", async () => {
  try {
    const p = await getUserProfile();
    if (!p) return;

    // Fuerza re-render del layout cuando ya existe currentUser/currentPlan
    window.dispatchEvent(new Event("contextUpdated"));
  } catch (e) {
    console.error(e);
  }
});