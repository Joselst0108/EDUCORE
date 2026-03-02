async function getUserProfile() {
  const { data: { user }, error: uErr } = await window.sb.auth.getUser();
  if (uErr || !user) {
    window.location.href = "/login.html";
    return null;
  }

  const { data, error } = await window.sb
    .from("profiles")
    .select(`
      id, colegio_id, full_name, role, plan,
      colegios:colegio_id ( id, nombre, plan )
    `)
    .eq("id", user.id)
    .single();

  if (error) {
    // Esto te ayuda a ver la causa real (RLS, row missing, etc.)
    alert("Error cargando perfil: " + error.message);
    return null;
  }

  window.currentUser = data;

  // Plan real: primero el del colegio (SaaS), si no existe usa el del perfil
  window.currentPlan = data?.colegios?.plan || data?.plan || "essential";

  return data;
}