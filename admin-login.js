document.getElementById("adminLoginForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const adminID = document.getElementById("adminID").value.trim();
  if (adminID === "0001") {
    window.location.href = "../pages/admin.html";
  } else {
    alert("❌ معرف المدير غير صحيح");
  }
});
