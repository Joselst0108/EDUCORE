async function getUserProfile() {
  const { data: { user } } = await window.sb.auth.getUser();
  if (!user) {
    window.location.href = "/login.html";
    return null;
  }

  const { data } = await window.sb
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  window.currentUser = data;
  return data;
}