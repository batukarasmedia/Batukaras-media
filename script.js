const WA_NUMBER = "6285155012620";

const prices = {
  "Jetski Sea-Doo GTX Pro New 1.800cc — Rp700.000/jetski": { type:"jetski", unit:700000, label:"Rp700.000/jetski" },
  "Paddleboard Single — Rp300.000/papan": { type:"fixed", unit:300000, label:"Rp300.000/papan" },
  "Paddleboard Tandem — Rp350.000/papan": { type:"fixed", unit:350000, label:"Rp350.000/papan" },
  "Freediving — Rp700.000/orang": { type:"person", unit:700000, label:"Rp700.000/orang" },
  "Scuba Diving — Rp1.500.000/orang": { type:"person", unit:1500000, label:"Rp1.500.000/orang" },
  "Snorkeling Paket 1 — Rp150.000/orang — minimal 4 orang": { type:"person", unit:150000, label:"Rp150.000/orang" },
  "Snorkeling Paket 2 — Rp100.000/orang — minimal 4 orang": { type:"person", unit:100000, label:"Rp100.000/orang" },
  "Paket 3 Permainan Watersport — Rp175.000/orang": { type:"person", unit:175000, label:"Rp175.000/orang" },
  "Paket Drone 3 Permainan — Rp200.000/orang": { type:"person", unit:200000, label:"Rp200.000/orang" },
  "Green Canyon Paket Perahu — Rp300.000/perahu": { type:"fixed", unit:300000, label:"Rp300.000/perahu" }
};

const form = document.getElementById("bookingForm");
const packageSelect = document.getElementById("package");
const peopleInput = document.getElementById("people");
const estimate = document.getElementById("estimate");

function rupiah(n){
  return new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}).format(n);
}

function updateEstimate(){
  const selected = packageSelect.value;
  const people = Math.max(1, Number(peopleInput.value || 1));
  const item = prices[selected];
  if(!item){
    estimate.textContent = "Pilih paket untuk melihat estimasi harga.";
    return;
  }
  let total = item.unit;
  let text = `Estimasi: ${rupiah(total)}`;
  if(item.type === "person") {
    total = item.unit * people;
    text = `Estimasi ${people} orang: ${rupiah(total)}`;
  }
  if(item.type === "jetski") {
    const jetski = Math.ceil(people / 2);
    total = item.unit * jetski;
    text = `Estimasi ${jetski} jetski untuk ${people} orang: ${rupiah(total)}`;
  }
  estimate.textContent = text + " • Harga final dikonfirmasi admin.";
}

packageSelect.addEventListener("change", updateEstimate);
peopleInput.addEventListener("input", updateEstimate);

document.querySelectorAll(".reserve-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const pkg = btn.dataset.package || "";
    [...packageSelect.options].some(opt => {
      if(opt.text === pkg || opt.text.includes(pkg.split(" — ")[0])) {
        packageSelect.value = opt.value;
        return true;
      }
      return false;
    });
    updateEstimate();
  });
});

form.addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const instagram = document.getElementById("instagram").value.trim() || "-";
  const tiktok = document.getElementById("tiktok").value.trim() || "-";
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  const pkg = packageSelect.value;
  const people = peopleInput.value;
  const notes = document.getElementById("notes").value.trim() || "-";

  const dateText = date ? new Date(date + "T00:00:00").toLocaleDateString("id-ID",{day:"2-digit",month:"long",year:"numeric"}) : "-";
  const message =
`Halo BATUKARAS MEDIA 👋

Saya ingin melakukan RESERVASI WISATA.

👤 Nama: ${name}
📸 Instagram: ${instagram}
🎵 TikTok: ${tiktok}
📅 Tanggal: ${dateText}
⏰ Waktu: ${time} WIB
🎯 Paket: ${pkg}
👥 Jumlah orang: ${people}
📝 Catatan: ${notes}

Mohon info ketersediaan dan konfirmasi total pembayaran. Terima kasih.`;

  window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
});

const menuBtn = document.querySelector(".menu-toggle");
const nav = document.getElementById("mainNav");
menuBtn.addEventListener("click", () => nav.classList.toggle("open"));
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));

const today = new Date();
const yyyy = today.getFullYear();
const mm = String(today.getMonth()+1).padStart(2,"0");
const dd = String(today.getDate()).padStart(2,"0");
document.getElementById("date").min = `${yyyy}-${mm}-${dd}`;
