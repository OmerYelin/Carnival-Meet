import { db, auth } from "./firebase.js";

import {
  doc,
  setDoc,
  collection,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

import { signInAnonymously } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";

let userId = null;
let name = prompt("מה השם שלך?");

/* 🔥 הפוליגון שלך */
const stationPolygon = [
  [31.2413911, 34.7992480],
  [31.2433259, 34.7985828],
  [31.2438791, 34.7980219],
  [31.2439708, 34.7965950],
  [31.2443863, 34.7953412],
  [31.2439187, 34.7942147],
  [31.2435353, 34.7941736],
  [31.2428338, 34.7950300],
  [31.2420788, 34.7961120],
  [31.2413082, 34.7970057],
  [31.2405990, 34.7977098],
  [31.2413509, 34.7992548],
  [31.2442055, 34.8001707],
  [31.2452050, 34.8000526]
];

/* 🔥 התחברות */
signInAnonymously(auth).then((u) => {
  userId = u.user.uid;
  document.getElementById("status").innerText = "מחובר ✔";
});

/* 📍 בדיקת פוליגון */
function isInside(lat, lng, polygon) {
  let inside = false;

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i][0], yi = polygon[i][1];
    const xj = polygon[j][0], yj = polygon[j][1];

    const intersect =
      ((yi > lat) !== (yj > lat)) &&
      (lng < (xj - xi) * (lat - yi) / (yj - yi) + xi);

    if (intersect) inside = !inside;
  }

  return inside;
}

/* 🚀 מעקב מיקום רציף */
navigator.geolocation.watchPosition(async (pos) => {
  if (!userId) return;

  const lat = pos.coords.latitude;
  const lng = pos.coords.longitude;

  const inside = isInside(lat, lng, stationPolygon);

  await setDoc(doc(db, "users", userId), {
    name,
    lat,
    lng,
    inStation: inside,
    lastUpdate: Date.now()
  });
});

/* 👀 צפייה בזמן אמת */
onSnapshot(collection(db, "users"), (snap) => {
  const div = document.getElementById("users");
  div.innerHTML = "";

  snap.forEach((d) => {
    const u = d.data();

    const el = document.createElement("div");
    el.className = "card";

    el.innerHTML = `
      <b>${u.name}</b><br/>
      ${u.inStation ? "🟢 בתחנה" : "🔴 מחוץ לתחנה"}<br/>
      ${new Date(u.lastUpdate).toLocaleTimeString()}
    `;

    div.appendChild(el);
  });
});

/* כפתור ידני (לא חובה אבל נשאר) */
window.checkIn = function () {};
