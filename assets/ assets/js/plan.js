function checkPlan(requiredPlan) {
  const userPlan = window.currentUser?.plan || "essential";
  const hierarchy = ["essential", "professional", "premium"];

  if (hierarchy.indexOf(userPlan) < hierarchy.indexOf(requiredPlan)) {
    alert("Tu plan no permite acceder a esta sección.");
    window.location.href = "/dashboard.html";
  }
}