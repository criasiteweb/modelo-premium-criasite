/* =========================================================
   Forno Nobre — Cozinha (KDS). Tela ao vivo pra cozinha.
   Pedidos do dia em 3 colunas: fila, em preparo, pronto.
   Toca o cartão pra avançar de etapa. Só a loja acessa.
   ========================================================= */
import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";
import { getFirestore, collection, query, where, orderBy, onSnapshot, doc, updateDoc } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";
import { FIREBASE_CONFIG, CONTA_LOJA } from "./firebase-config.js";

const app = getApps().length ? getApp() : initializeApp(FIREBASE_CONFIG);
const auth = getAuth(app);
const db = getFirestore(app);
const $ = s => document.querySelector(s);

/* relógio */
setInterval(() => {
  const r = $("[data-relogio]"); if (r)
    r.textContent = new Intl.DateTimeFormat("pt-BR",{hour:"2-digit",minute:"2-digit",timeZone:"America/Sao_Paulo"}).format(new Date());
}, 1000);

$("[data-form-login]").addEventListener("submit", async e => {
  e.preventDefault();
  const erro = $("[data-erro]"); erro.hidden = true;
  try { await signInWithEmailAndPassword(auth, CONTA_LOJA, $("[data-senha]").value); }
  catch { erro.textContent = "Senha incorreta."; erro.hidden = false; }
});

let parar = null;
onAuthStateChanged(auth, user => {
  $("[data-login]").hidden = !!user;
  $("[data-board]").hidden = !user;
  if (user) escutar(); else if (parar) parar();
});

function inicioDeHoje() {
  const agora = new Date();
  const d = new Intl.DateTimeFormat("en-CA",{timeZone:"America/Sao_Paulo"}).format(agora);
  return new Date(d + "T00:00:00-03:00");
}

const PROX = { novo:"preparo", preparo:"pronto" };
const ROTULO = { novo:"Começar", preparo:"Marcar pronto" };

function escutar() {
  const q = query(collection(db,"pedidos"),
    where("criadoEm",">=",inicioDeHoje()), orderBy("criadoEm","asc"));
  parar = onSnapshot(q, snap => {
    const grupos = { novo:[], preparo:[], pronto:[] };
    snap.forEach(d => {
      const p = { id:d.id, ...d.data() };
      const col = p.status==="preparo" ? "preparo" : p.status==="pronto" ? "pronto" : "novo";
      grupos[col].push(p);
    });
    pintar("novo", grupos.novo);
    pintar("preparo", grupos.preparo);
    pintar("pronto", grupos.pronto);
  }, err => console.error(err));
}

function minutosDesde(ts) {
  if (!ts?.toDate) return "";
  const min = Math.floor((Date.now() - ts.toDate().getTime())/60000);
  return min <= 0 ? "agora" : `${min} min`;
}

function pintar(col, lista) {
  $(`[data-conta-${col}]`).textContent = lista.length;
  const alvo = $(`[data-cards-${col}]`);
  alvo.innerHTML = lista.map(p => {
    const itens = (p.texto||"").split(/\n|•/).map(s=>s.trim()).filter(Boolean)
      .map(l => `<li>${l.replace(/\s*[-—]\s*R\$.*/i,"")}</li>`).join("");
    const atrasado = p.status!=="pronto" && minutosDesde(p.criadoEm).includes("min") && parseInt(minutosDesde(p.criadoEm))>=20;
    return `<article class="kd-card ${atrasado?"kd-atrasado":""}" data-id="${p.id}" data-status="${p.status||"novo"}">
      <div class="kd-card-topo"><b>#${(p.cliente||"Pedido")}</b><span>${minutosDesde(p.criadoEm)}</span></div>
      <ul class="kd-itens">${itens||"<li>Pedido</li>"}</ul>
      ${PROX[p.status||"novo"] ? `<button class="kd-avancar" data-avancar>${ROTULO[p.status||"novo"]}</button>` : `<span class="kd-ok">Pronto ✓</span>`}
    </article>`;
  }).join("") || `<p class="kd-vazio">—</p>`;
  alvo.querySelectorAll("[data-avancar]").forEach(b => b.onclick = async () => {
    const card = b.closest(".kd-card");
    const prox = PROX[card.dataset.status];
    if (!prox) return;
    b.disabled = true;
    try { await updateDoc(doc(db,"pedidos",card.dataset.id), { status: prox }); }
    catch (e) { b.disabled = false; alert("Não consegui atualizar. Verifique a internet."); }
  });
}
