const form = document.getElementById("studentForm");
let students = JSON.parse(localStorage.getItem("students") || "[]");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("studentName").value.trim();
  const phone = document.getElementById("studentPhone").value.trim();
  const area = document.getElementById("studentArea").value;
  const departureTime = document.getElementById("departureTime").value;
  const returnTime = document.getElementById("returnTime").value || "";

  if(!name || !phone || !area || !departureTime){
    alert("❌ الرجاء ملء جميع الحقول المطلوبة");
    return;
  }

  // تحقق إذا الطالبة موجودة مسبقًا
  let existingStudent = students.find(s => s.name === name || s.phone === phone);
  if(existingStudent){
    existingStudent.departureTime = departureTime;
    existingStudent.returnTime = returnTime;
    alert("✅ تم تحديث مواعيدك بنجاح");
  } else {
    students.push({ name, phone, area, departureTime, returnTime, driverId: "" });
    alert("✅ تم تسجيلك بنجاح");
  }

  localStorage.setItem("students", JSON.stringify(students));
  form.reset();
});
