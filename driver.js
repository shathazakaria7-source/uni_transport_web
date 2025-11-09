import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import {
  getFirestore, collection, query, where, onSnapshot
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
import { firebaseConfig } from "./firebase-config.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function getParamId() {
  const url = new URL(window.location.href);
  return url.searchParams.get('id') || sessionStorage.getItem('driverId');
}
const driverId = getParamId();
if (!driverId) {
  document.body.innerHTML = "<p style='text-align:center;margin-top:50px'>لا يوجد ID سائق. الرجاء تسجيل الدخول أولاً.</p>";
  throw new Error("No driverId");
}

const driverNameHead = document.getElementById("driverNameHead");
const goTbody = document.querySelector("#goTable tbody");
const returnTbody = document.querySelector("#returnTable tbody");

function formatTime12(timeStr) {
  if (!timeStr) return "-";
  let [hour, minute] = timeStr.split(':').map(Number);
  const ampm = hour >= 12 ? 'م' : 'ص';
  hour = hour % 12 || 12;
  return `${hour}:${minute.toString().padStart(2,'0')} ${ampm}`;
}

// Show real-time assigned students
const q = query(collection(db, "students"), where("driverId", "==", driverId));
onSnapshot(q, (snap) => {
  const goRows = [];
  const returnRows = [];
  snap.docs.forEach(docSnap => {
    const s = docSnap.data();
    if (s.goTime) goRows.push(s);
    if (s.returnTime) returnRows.push(s);
  });

  // render go
  goTbody.innerHTML = "";
  goRows.sort((a,b) => a.goTime.localeCompare(b.goTime)).forEach(s => {
    const tr = goTbody.insertRow();
    tr.insertCell(0).textContent = s.name;
    tr.insertCell(1).textContent = s.phone;
    tr.insertCell(2).textContent = s.neighborhood;
    tr.insertCell(3).textContent = formatTime12(s.goTime);
    const btn = document.createElement("button");
    btn.className = "whatsapp-btn";
    btn.textContent = "WhatsApp";
    btn.onclick = () => {
      const message = `مرحباً ${s.name}, سيتم توصيلك الآن.`;
      window.open(`https://wa.me/${s.phone}?text=${encodeURIComponent(message)}`, '_blank');
    };
    tr.insertCell(4).appendChild(btn);
  });

  // render return
  returnTbody.innerHTML = "";
  returnRows.sort((a,b) => a.returnTime.localeCompare(b.returnTime)).forEach(s => {
    const tr = returnTbody.insertRow();
    tr.insertCell(0).textContent = s.name;
    tr.insertCell(1).textContent = s.phone;
    tr.insertCell(2).textContent = s.neighborhood;
    tr.insertCell(3).textContent = formatTime12(s.returnTime);
    const btn = document.createElement("button");
    btn.className = "whatsapp-btn";
    btn.textContent = "WhatsApp";
    btn.onclick = () => {
      const message = `مرحباً ${s.name}, سيتم توصيلك الآن.`;
      window.open(`https://wa.me/${s.phone}?text=${encodeURIComponent(message)}`, '_blank');
    };
    tr.insertCell(4).appendChild(btn);
  });
});

// show driver name
(async function showDriverName(){
  try{
    const driversSnap = await getDocs(query(collection(db,"drivers"), where("driverId","==",driverId)));
    if(driversSnap.size>0){
      const d = driversSnap.docs[0].data();
      driverNameHead.textContent = `${d.name} — ID: ${driverId}`;
      sessionStorage.setItem('driverId', driverId);
    } else {
      driverNameHead.textContent = `السائق: ${driverId}`;
    }
  } catch(err){ console.error(err); }
})();
