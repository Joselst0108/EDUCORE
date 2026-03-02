function checkPlanAccess(appName) {
  const allowedApps = {
    essential: ['eduadmin','edubank'],
    professional: ['eduadmin','eduasist','edubank','eduia'],
    premium: ['eduadmin','eduasist','edubank','eduia']
  };

  const plan = window.currentPlan || 'essential';

  if (!allowedApps[plan].includes(appName)) {
    alert("Tu plan no permite acceder a esta aplicación.");
    window.location.href = "/dashboard.html";
  }
}