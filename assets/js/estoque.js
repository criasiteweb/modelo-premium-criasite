/* =========================================================
   Forno Nobre — Estoque e ficha técnica
   Criasiteweb. Só a loja acessa (mesmo login do painel).
   Dados no Firestore: estoque/insumos e estoque/fichas.
   ========================================================= */
import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";
import { getFirestore, collection, doc, addDoc, setDoc, getDocs, deleteDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";
import { FIREBASE_CONFIG, CONTA_LOJA } from "./firebase-config.js";

const app = getApps().length ? getApp() : initializeApp(FIREBASE_CONFIG);
const auth = getAuth(app);
const db = getFirestore(app);
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const reais = n => (Number(n)||0).toLocaleString("pt-BR",{style:"currency",currency:"BRL"});

let insumos = [];   // {id, nome, un, custo, qtd}
let fichas = [];    // {id, nome, preco, itens:[{insumoId, qtd}]}

/* ---------- login ---------- */
$("[data-form-login]").addEventListener("submit", async e => {
  e.preventDefault();
  const erro = $("[data-erro]"); erro.hidden = true;
  try { await signInWithEmailAndPassword(auth, CONTA_LOJA, $("[data-senha]").value); }
  catch (err) { erro.textContent = "Senha incorreta. Tente de novo."; erro.hidden = false; }
});
onAuthStateChanged(auth, async user => {
  $("[data-login]").hidden = !!user;
  $("[data-app]").hidden = !user;
  if (user) { await carregar(); render(); }
});

/* ---------- abas ---------- */
$$("[data-aba]").forEach(b => b.addEventListener("click", () => {
  $$("[data-aba]").forEach(x => x.classList.toggle("on", x === b));
  $$("[data-painel]").forEach(p => p.hidden = p.dataset.painel !== b.dataset.aba);
  if (b.dataset.aba === "posicao") renderPosicao();
}));

/* ---------- carregar ---------- */
async function carregar() {
  insumos = []; fichas = [];
  try {
    (await getDocs(collection(db, "estoque_insumos"))).forEach(d => insumos.push({ id: d.id, ...d.data() }));
    (await getDocs(collection(db, "estoque_fichas"))).forEach(d => fichas.push({ id: d.id, ...d.data() }));
  } catch (e) { console.error(e); }
}

/* ---------- insumos ---------- */
$("[data-form-insumo]").addEventListener("submit", async e => {
  e.preventDefault();
  const novo = {
    nome: $("[data-i-nome]").value.trim(),
    un: $("[data-i-un]").value.trim(),
    custo: Number($("[data-i-custo]").value) || 0,
    qtd: Number($("[data-i-qtd]").value) || 0,
    em: serverTimestamp()
  };
  if (!novo.nome) return;
  const ref = await addDoc(collection(db, "estoque_insumos"), novo);
  insumos.push({ id: ref.id, ...novo });
  e.target.reset(); render();
});

function render() {
  const alvo = $("[data-lista-insumos]");
  alvo.innerHTML = insumos.length ? insumos.map(i => `
    <div class="es-item">
      <div><b>${i.nome}</b> <span>${reais(i.custo)} / ${i.un}</span></div>
      <div class="es-item-dir"><span>em estoque: ${i.qtd} ${i.un}</span>
        <button data-del-insumo="${i.id}" aria-label="Apagar">✕</button></div>
    </div>`).join("") : `<p class="es-vazio">Nenhum insumo cadastrado ainda.</p>`;
  $$("[data-del-insumo]").forEach(b => b.onclick = async () => {
    await deleteDoc(doc(db, "estoque_insumos", b.dataset.delInsumo));
    insumos = insumos.filter(i => i.id !== b.dataset.delInsumo); render();
  });
  // atualizar selects da ficha, se abertos
  $$("[data-ing-insumo]").forEach(preencherSelect);
}

/* ---------- fichas ---------- */
function preencherSelect(sel) {
  const atual = sel.value;
  sel.innerHTML = `<option value="">Ingrediente…</option>` +
    insumos.map(i => `<option value="${i.id}">${i.nome} (${i.un})</option>`).join("");
  sel.value = atual;
}
function linhaIngrediente() {
  const div = document.createElement("div");
  div.className = "es-ing";
  div.innerHTML = `<select data-ing-insumo></select>
    <input type="number" step="0.001" placeholder="qtd usada" data-ing-qtd />
    <button type="button" data-rem-ing aria-label="Remover">✕</button>`;
  preencherSelect(div.querySelector("[data-ing-insumo]"));
  div.querySelector("[data-rem-ing]").onclick = () => div.remove();
  return div;
}
$("[data-add-ingrediente]").addEventListener("click", () => {
  $("[data-ficha-itens]").appendChild(linhaIngrediente());
});
$("[data-form-ficha]").addEventListener("submit", async e => {
  e.preventDefault();
  const itens = $$("#x [data-ing-insumo], [data-ficha-itens] .es-ing").map(div => ({
    insumoId: div.querySelector("[data-ing-insumo]").value,
    qtd: Number(div.querySelector("[data-ing-qtd]").value) || 0
  })).filter(x => x.insumoId && x.qtd > 0);
  const nova = {
    nome: $("[data-fc-nome]").value.trim(),
    preco: Number($("[data-fc-preco]").value) || 0,
    itens, em: serverTimestamp()
  };
  if (!nova.nome) return;
  const ref = await addDoc(collection(db, "estoque_fichas"), nova);
  fichas.push({ id: ref.id, ...nova });
  e.target.reset(); $("[data-ficha-itens]").innerHTML = ""; renderFichas();
});
function custoDaFicha(f) {
  return (f.itens || []).reduce((s, it) => {
    const ins = insumos.find(i => i.id === it.insumoId);
    return s + (ins ? ins.custo * it.qtd : 0);
  }, 0);
}
function renderFichas() {
  const alvo = $("[data-lista-fichas]");
  alvo.innerHTML = fichas.length ? fichas.map(f => {
    const custo = custoDaFicha(f);
    const margem = f.preco ? (f.preco - custo) / f.preco * 100 : 0;
    return `<div class="es-item">
      <div><b>${f.nome}</b> <span>venda ${reais(f.preco)}</span></div>
      <div class="es-item-dir">
        <span>custo ${reais(custo)} · margem ${margem.toFixed(0)}%</span>
        <button data-del-ficha="${f.id}" aria-label="Apagar">✕</button></div>
    </div>`;
  }).join("") : `<p class="es-vazio">Nenhuma ficha cadastrada ainda.</p>`;
  $$("[data-del-ficha]").forEach(b => b.onclick = async () => {
    await deleteDoc(doc(db, "estoque_fichas", b.dataset.delFicha));
    fichas = fichas.filter(f => f.id !== b.dataset.delFicha); renderFichas();
  });
}

/* ---------- posição e custo ---------- */
function renderPosicao() {
  const alvo = $("[data-posicao]");
  const valorEstoque = insumos.reduce((s, i) => s + i.custo * i.qtd, 0);
  const linhasFicha = fichas.map(f => {
    const c = custoDaFicha(f); const m = f.preco ? (f.preco - c) / f.preco * 100 : 0;
    return `<tr><td>${f.nome}</td><td>${reais(c)}</td><td>${reais(f.preco)}</td><td>${m.toFixed(0)}%</td></tr>`;
  }).join("");
  alvo.innerHTML = `
    <div class="es-cartao"><span>Valor total parado em estoque</span><b>${reais(valorEstoque)}</b></div>
    <h3>Custo e margem por produto</h3>
    <table class="es-tabela"><thead><tr><th>Produto</th><th>Custo</th><th>Venda</th><th>Margem</th></tr></thead>
      <tbody>${linhasFicha || `<tr><td colspan="4">Nenhuma ficha ainda.</td></tr>`}</tbody></table>`;
}

/* ao abrir a aba fichas, garante uma linha de ingrediente */
document.querySelector('[data-aba="fichas"]').addEventListener("click", () => {
  if (!$("[data-ficha-itens]").children.length) $("[data-ficha-itens]").appendChild(linhaIngrediente());
  renderFichas();
});
