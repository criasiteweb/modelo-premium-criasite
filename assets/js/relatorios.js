/* =========================================================
   Forno Nobre — Relatórios do dono
   Lê os pedidos do servidor e calcula faturamento, ticket médio,
   horário de pico, produtos mais vendidos e o resumo da semana.
   Só a loja acessa.
   ========================================================= */
import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";
import { getFirestore, collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";
import { FIREBASE_CONFIG, CONTA_LOJA } from "./firebase-config.js";

const app = getApps().length ? getApp() : initializeApp(FIREBASE_CONFIG);
const auth = getAuth(app);
const db = getFirestore(app);
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const reais = n => (Number(n)||0).toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
const DIAS = ["domingo","segunda","terça","quarta","quinta","sexta","sábado"];

let pedidos = [];   // {total, itens, texto, data}
let periodo = 7;

$("[data-form-login]").addEventListener("submit", async e => {
  e.preventDefault();
  const erro = $("[data-erro]"); erro.hidden = true;
  try { await signInWithEmailAndPassword(auth, CONTA_LOJA, $("[data-senha]").value); }
  catch { erro.textContent = "Senha incorreta."; erro.hidden = false; }
});
onAuthStateChanged(auth, async user => {
  $("[data-login]").hidden = !!user;
  $("[data-app]").hidden = !user;
  if (user) { await carregar(); render(); }
});
$$("[data-per]").forEach(b => b.addEventListener("click", () => {
  $$("[data-per]").forEach(x => x.classList.toggle("on", x === b));
  periodo = Number(b.dataset.per); render();
}));

async function carregar() {
  pedidos = [];
  try {
    const snap = await getDocs(query(collection(db, "pedidos"), orderBy("criadoEm", "desc")));
    snap.forEach(d => {
      const p = d.data();
      const data = p.criadoEm?.toDate ? p.criadoEm.toDate() : new Date();
      pedidos.push({ total: Number(p.total)||0, itens: Number(p.itens)||0, texto: p.texto||"", data });
    });
  } catch (e) { console.error(e); }
}

function filtrados() {
  if (!periodo) return pedidos;
  const limite = Date.now() - periodo*24*3600*1000;
  return pedidos.filter(p => p.data.getTime() >= limite);
}

/* extrai nomes de produtos do texto do pedido (linhas "1x Nome") */
function contarProdutos(lista) {
  const conta = {};
  lista.forEach(p => {
    const linhas = (p.texto||"").split(/\n|•/).map(s => s.trim()).filter(Boolean);
    linhas.forEach(l => {
      const m = l.match(/(\d+)\s*x\s*(.+)/i);
      if (m) {
        const q = Number(m[1])||1;
        let nome = m[2].replace(/\s*[-—]\s*R\$.*/i,"").replace(/R\$\s*[\d.,]+/g,"").trim();
        nome = nome.replace(/\s{2,}/g," ").slice(0,40);
        if (nome && nome.length > 2) conta[nome] = (conta[nome]||0) + q;
      }
    });
  });
  return Object.entries(conta).sort((a,b)=>b[1]-a[1]).slice(0,8);
}

function render() {
  const lista = filtrados();
  const fat = lista.reduce((s,p)=>s+p.total,0);
  const qtd = lista.length;
  const ticket = qtd ? fat/qtd : 0;
  $("[data-fat]").textContent = reais(fat);
  $("[data-qtd]").textContent = String(qtd);
  $("[data-ticket]").textContent = reais(ticket);

  // melhor dia da semana
  const porDiaSemana = [0,0,0,0,0,0,0];
  lista.forEach(p => porDiaSemana[p.data.getDay()] += p.total);
  const melhorIdx = porDiaSemana.indexOf(Math.max(...porDiaSemana));
  $("[data-melhordia]").textContent = qtd ? DIAS[melhorIdx] : "—";

  // mais vendidos
  const tops = contarProdutos(lista);
  $("[data-mais-vendidos]").innerHTML = tops.length
    ? tops.map(([n,q],i)=>`<div class="es-item"><div><b>${i+1}º ${n}</b></div><div class="es-item-dir"><span>${q} vendas</span></div></div>`).join("")
    : `<p class="es-vazio">Ainda não há pedidos suficientes nesse período.</p>`;

  // horário de pico (barras por hora)
  const horas = new Array(24).fill(0);
  lista.forEach(p => horas[p.data.getHours()]++);
  const max = Math.max(1, ...horas);
  const faixa = horas.map((v,h)=> v>0 ? `
    <div class="rel-hora"><span class="rh-label">${String(h).padStart(2,"0")}h</span>
      <div class="rh-bar"><i style="width:${v/max*100}%"></i></div>
      <span class="rh-num">${v}</span></div>` : "").join("");
  $("[data-horas]").innerHTML = faixa || `<p class="es-vazio">Sem dados de horário ainda.</p>`;
  const picoH = horas.indexOf(Math.max(...horas));

  // resumo da semana
  const sem = (()=>{ const l=pedidos.filter(p=>p.data.getTime()>=Date.now()-7*864e5);
    const f=l.reduce((s,p)=>s+p.total,0); const t=l.length?f/l.length:0;
    const tp=contarProdutos(l)[0];
    return `Resultado da semana — Forno Nobre\n`+
      `Pedidos: ${l.length}\n`+
      `Faturamento: ${reais(f)}\n`+
      `Ticket médio: ${reais(t)}\n`+
      (tp?`Mais vendido: ${tp[0]} (${tp[1]}x)\n`:``)+
      `Horário de pico: ${String(picoH).padStart(2,"0")}h`;
  })();
  $("[data-resumo-semana]").textContent = sem;
}

$("[data-copiar-semana]").addEventListener("click", async e => {
  try { await navigator.clipboard.writeText($("[data-resumo-semana]").textContent);
    e.target.textContent="Copiado!"; setTimeout(()=>e.target.textContent="Copiar resumo",1500); }
  catch { e.target.textContent="Selecione e copie"; }
});
