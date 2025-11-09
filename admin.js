// ======= السائقين =======
const driversTable = document.getElementById("driversTable").querySelector("tbody");
const addDriverForm = document.getElementById("addDriverForm");
let drivers = JSON.parse(localStorage.getItem("drivers") || "[]");

function generateDriverID() {
  return Math.floor(1000 + Math.random() * 9000).toString(); // 4 أرقام
}

function renderDrivers() {
  driversTable.innerHTML = "";
  drivers.forEach((driver, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${driver.name}</td>
      <td>${driver.area}</td>
      <td>${driver.id}</td>
      <td><button data-index="${index}" class="deleteDriver">حذف</button></td>
    `;
    driversTable.appendChild(row);
  });

  // ربط أزرار الحذف
  document.querySelectorAll(".deleteDriver").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const idx = e.target.dataset.index;
      drivers.splice(idx, 1);
      localStorage.setItem("drivers", JSON.stringify(drivers));
      renderDrivers();
    });
  });
}

addDriverForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("driverName").value.trim();
  const area = document.getElementById("driverArea").value;
  const id = generateDriverID();

  drivers.push({ name, area, id });
  localStorage.setItem("drivers", JSON.stringify(drivers));
  renderDrivers();
  addDriverForm.reset();
  alert(`✅ تم إضافة السائق بنجاح - ID: ${id}`);
});

renderDrivers();

// ======= الطالبات =======
const studentsTable = document.getElementById("studentsTable").querySelector("tbody");
const addStudentForm = document.getElementById("addStudentForm");
let students = JSON.parse(localStorage.getItem("students") || "[]");

function renderStudents() {
  studentsTable.innerHTML = "";
  students.forEach((student, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.phone}</td>
      <td>${student.area}</td>
      <td>${student.goTime || '-'}</td>
      <td>${student.returnTime || '-'}</td>
      <td><button data-index="${index}" class="deleteStudent">حذف</button></td>
    `;
    studentsTable.appendChild(row);
  });

  // ربط أزرار الحذف
  document.querySelectorAll(".deleteStudent").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const idx = e.target.dataset.index;
      students.splice(idx, 1);
      localStorage.setItem("students", JSON.stringify(students));
      renderStudents();
    });
  });
}

addStudentForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("studentName").value.trim();
  const phone = document.getElementById("studentPhone").value.trim();
  const area = document.getElementById("studentArea").value;
  const goTime = document.getElementById("studentGoTime").value;
  const returnTime = document.getElementById("studentReturnTime").value;

  const newStudent = { name, phone, area, goTime, returnTime };
  students.push(newStudent);
  localStorage.setItem("students", JSON.stringify(students));
  renderStudents();
  addStudentForm.reset();
  alert(`✅ تم إضافة الطالبة بنجاح: ${name}`);
});

renderStudents();

// ======= حذف المواعيد اليومية =======
document.getElementById("clearDailySchedules").addEventListener("click", () => {
  students = students.map(s => ({ ...s, goTime: '', returnTime: '' }));
  localStorage.setItem("students", JSON.stringify(students));
  renderStudents();
  alert("✅ تم حذف المواعيد اليومية مع الاحتفاظ بمعلومات الطالبات الأساسية");
});
