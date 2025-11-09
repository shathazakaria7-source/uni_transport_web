const driversTable = document.getElementById("driversTable").querySelector("tbody");
const addDriverForm = document.getElementById("addDriverForm");
const studentsTable = document.getElementById("studentsTable").querySelector("tbody");
const addStudentForm = document.getElementById("addStudentForm");
const clearTimesBtn = document.getElementById("clearTimesBtn");

let drivers = JSON.parse(localStorage.getItem("drivers") || "[]");
let students = JSON.parse(localStorage.getItem("students") || "[]");

function generateDriverID() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

function renderDrivers() {
  driversTable.innerHTML = "";
  drivers.forEach((driver, idx) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${driver.name}</td>
      <td>${driver.area}</td>
      <td>${driver.id}</td>
      <td><button data-idx="${idx}">❌ حذف</button></td>
    `;
    driversTable.appendChild(row);
  });
  driversTable.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", e => {
      const idx = e.target.dataset.idx;
      if(confirm("هل تريد حذف هذا السائق؟")){
        drivers.splice(idx,1);
        localStorage.setItem("drivers", JSON.stringify(drivers));
        renderDrivers();
      }
    });
  });
}

function renderStudents() {
  studentsTable.innerHTML = "";
  students.forEach((s, idx) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${s.name}</td>
      <td>${s.phone}</td>
      <td>${s.area}</td>
      <td>${s.departureTime || '-'}</td>
      <td>${s.returnTime || '-'}</td>
      <td>${s.driverId || '-'}</td>
      <td><button data-idx="${idx}">❌ حذف</button></td>
    `;
    studentsTable.appendChild(row);
  });
  studentsTable.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", e => {
      const idx = e.target.dataset.idx;
      if(confirm("هل تريد حذف هذه الطالبة؟")){
        students.splice(idx,1);
        localStorage.setItem("students", JSON.stringify(students));
        renderStudents();
      }
    });
  });
}

// إضافة سائق
addDriverForm.addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("driverName").value.trim();
  const area = document.getElementById("driverArea").value;
  const id = generateDriverID();
  drivers.push({ name, area, id });
  localStorage.setItem("drivers", JSON.stringify(drivers));
  renderDrivers();
  addDriverForm.reset();
  alert(`✅ تم إضافة السائق - ID: ${id}`);
});

// إضافة / تحديث طالبة
addStudentForm.addEventListener("submit", e => {
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

  let existingStudent = students.find(s => s.name === name || s.phone === phone);
  if(existingStudent){
    existingStudent.departureTime = departureTime;
    existingStudent.returnTime = returnTime;
    alert("✅ تم تحديث مواعيد الطالبة بنجاح");
  } else {
    students.push({
      name, phone, area, departureTime, returnTime, driverId: ""
    });
    alert("✅ تم إضافة الطالبة بنجاح");
  }

  localStorage.setItem("students", JSON.stringify(students));
  renderStudents();
  addStudentForm.reset();
});

// مسح المواعيد اليومية
clearTimesBtn.addEventListener("click", () => {
  if(confirm("هل تريد مسح جميع مواعيد الذهاب والعودة اليوم؟")){
    students = students.map(s => ({
      name: s.name, phone: s.phone, area: s.area, driverId: s.driverId || ""
    }));
    localStorage.setItem("students", JSON.stringify(students));
    renderStudents();
    alert("✅ تم مسح المواعيد اليومية. معلومات الطالبات محفوظة.");
  }
});

// عرض أولي
renderDrivers();
renderStudents();
