const form = document.getElementById("studentForm");
const msg = document.getElementById("msg");

let drivers = JSON.parse(localStorage.getItem("drivers") || "[]");
let students = JSON.parse(localStorage.getItem("students") || "[]");

function assignDriver(area, time){
  const eligible = drivers.filter(d => d.area === area);
  if(eligible.length === 0) return null;

  // 3 طالبات لكل سائق
  const counts = eligible.map(d => {
    const c = students.filter(s => s.driverIdGo === d.id && s.departureTime === time).length;
    return {driverId:d.id,count:c};
  });
  counts.sort((a,b)=>a.count-b.count);
  return counts[0].count < 3 ? counts[0].driverId : null;
}

form.addEventListener("submit", e=>{
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const area = document.getElementById("area").value;
  const departureTime = document.getElementById("departureTime").value;
  const returnTime = document.getElementById("returnTime").value;

  if(!name || !phone || !area || !departureTime || !returnTime){
    msg.textContent = "الرجاء ملء جميع الحقول";
    msg.style.color = "red";
    return;
  }

  const driverIdGo = assignDriver(area, departureTime);
  const driverIdReturn = assignDriver(area, returnTime);

  students.push({name, phone, area, departureTime, returnTime, driverIdGo, driverIdReturn});
  localStorage.setItem("students", JSON.stringify(students));

  msg.textContent = "✅ تم تسجيل الطالبة وتوزيعها على السائقين بنجاح";
  msg.style.color = "green";
  form.reset();
});
