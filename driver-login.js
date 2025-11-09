document.getElementById("driverLoginForm").addEventListener("submit", e=>{
  e.preventDefault();
  const name = document.getElementById("driverName").value.trim();
  const id = document.getElementById("driverID").value.trim();
  const drivers = JSON.parse(localStorage.getItem("drivers") || "[]");

  const driver = drivers.find(d => d.name === name && d.id === id);
  if(driver){
    sessionStorage.setItem("driverId", id);
    window.location.href = "../pages/driver.html";
  } else {
    alert("❌ لم يتم العثور على سائق بهذا الاسم أو المعرف");
  }
});
