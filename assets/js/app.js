/* =========================================================
   Forno Nobre — cardápio digital + carrinho + WhatsApp
   Criasiteweb
   ---------------------------------------------------------
   PARA EDITAR: o bloco LOJA abaixo tem tudo que muda.
   Preços e itens vêm do cardápio oficial da lanchonete.
   ========================================================= */

const LOJA = {
  pix: "chave-pix-do-dono@exemplo.com",   // trocar pela chave real do cliente
  freteGratis: 70.00,   // acima disso, entrega grátis (marketing)
  nome: "Forno Nobre",
  /* DEMONSTRAÇÃO: WhatsApp comercial da Criasiteweb.
     Na venda, trocar pelo WhatsApp real da pizzaria. */
  whatsapp: "5511994516869",
  endereco: "Rua Pedro Rípoli, 104 - Barro Branco, sua cidade - SP, 09407-100",
  preparo: "40 a 60 min",              // [CONFIRMAR com o dono]
  /* Folheto da casa: aberto de segunda a segunda, das 18h às 23h30. */
  abre: 17.5,
  fecha: 23.6667, // 23h40
  diasFechados: [],                    // não fecha nenhum dia

  /* =======================================================
     TABELA DE ENTREGA
       5      -> cobra R$ 5,00
       null   -> aparece "a combinar"
     Tabela real do dono, passada pelo Matheus em 25/09/2026.
     ======================================================= */
  entrega: {
    ativa: true,
    raioKm: 17,
    /* Tabela real de bairros e taxa, passada pelo Matheus em 25/09/2026,
       82 bairros no total. */
    cidades: {
      "sua cidade": {
        "Alvorada": 6.00,
        "Ana Rosa (Mercado Fã)": 17.00,
        "Angelino, F. Gianazzi": 5.00,
        "Barro Branco": 6.00,
        "Bertoldo": 6.00,
        "Bosque Santana": 6.00,
        "Centro Alto": 8.00,
        "Centro Baixo": 6.00,
        "Chácara dos Sonhos": 17.00,
        "Clube de Campo": 19.00,
        "Colônia": 6.00,
        "Estância Noblesse": 8.00,
        "Fazenda Matarazzo": 8.00,
        "Iramaia": 8.00,
        "Jardim Aprazível": 17.00,
        "Jardim Bandeirantes": 8.00,
        "Jardim dos Eucaliptos": 8.00,
        "Jardim dos Lagos": 17.00,
        "Jardim Caçula": 15.00,
        "Jardim Esperança": 15.00,
        "Jardim Guanabara": 12.00,
        "Jardim Itacolomi": 8.00,
        "Jardim Luzo": 6.00,
        "Jardim Mirante": 8.00,
        "Jardim Santa Inês": 9.00,
        "Jardim Serrano": 17.00,
        "Jardim São Francisco": 6.00,
        "Jardim União": 8.00,
        "Jardim Valentina": 9.00,
        "Júlio Prestes de Albuquerque S MJ": 9.00,
        "KM 4": 17.00,
        "Lusitano / Luzitano": 8.00,
        "Nossa Senhora de Fátima": 6.00,
        "Ouro Fino (Antes da linha)": 8.00,
        "Ouro Fino (Depois da linha)": 12.00,
        "Ouro Fino (Depois da passarela)": 15.00,
        "Palmeiras": 17.00,
        "Parque Aliança": 12.00,
        "Parque Andréense": 20.00,
        "Parque das Fontes": 6.00,
        "Parque do Governador": 9.00,
        "Pereira Barreto": 7.00,
        "Petrópolis": 6.00,
        "Pilar Velho": 8.00,
        "Planalto Bela Vista": 8.00,
        "Ponte Seca": 8.00,
        "Pouso Alegre": 8.00,
        "Próxima Padaria Neves": 17.00,
        "Quarta Divisão": 10.00,
        "Rancho Alegre": 8.00,
        "Recanto Suíço": 8.00,
        "Represa": 15.00,
        "Roncon": 6.00,
        "Rua 2, 3 e 4 Sítio Maria Joana": 8.00,
        "Rua Chile SMJ": 10.00,
        "Rua dos Canais (Canários)": 20.00,
        "Rua Jangadeiro": 25.00,
        "Santa Clara": 8.00,
        "Santa Luzia": 6.00,
        "Santa Rosa": 6.00,
        "Santana": 6.00,
        "Sol Nascente": 17.00,
        "Soma": 10.00,
        "São Caetaninho": 12.00,
        "São Pedro (Palmeiras)": 17.00,
        "Sítio dos Vianas": 12.00,
        "Sítio Pinheiros": 17.00,
        "Tavolaro": 8.00,
        "Vila Lopes": 12.00,
        "Vila São João": 12.00,
        "Vila Aparecida": 6.00,
        "Vila Conceição": 6.00,
        "Vila Mara": 6.00,
        "Vila Caiçara": 6.00,
        "Vila Suíça": 8.00,
        "Vila Aurora": 8.00,
        "Vila Marquesa": 9.00,
        "Vila Sueli": 9.00,
        "Vila Bocaina": 9.00,
        "Vila Gomes": 12.00,
        "Vila Verde": 10.00,
        "Vila Belmiro": 12.00
      },
      /* Suzano confirmado pelo dono em 25/09/2026: também entregam lá.
         Bairros da região de Palmeiras conferidos por CEP real
         (25/09/2026), todos R$17. Fora desses, o cálculo por distância
         logo abaixo cobre o resto (cidade continua aparecendo mesmo
         sem bairro certo, pra CEP de Suzano preencher a rua sozinho). */
      "Suzano": {
        "Jardim Ana Rosa (Palmeiras)": 17.00,
        "Recreio Rio Bonito": 17.00,
        "Vila Fátima": 17.00,
        "Parque Buenos Aires": 17.00,
        "Jardim Ikeda": 17.00,
        "Jardim Palmeiras": 17.00,
        "Parque Palmeiras": 17.00,
        "Vila Rica": 17.00,
        "Jardim Amazonas": 17.00,
        "Ipelândia": 17.00
      }
    },

    /* =====================================================
       TAXA AUTOMÁTICA POR DISTÂNCIA
       Ligada com raio de 17 km (confirmado pelo dono em
       25/09/2026, cobre Suzano). Serve pra qualquer bairro fora
       da tabela de 82 acima — Suzano inteiro cai aqui, já que
       não tem tabela fixa por bairro de lá ainda.
       ===================================================== */
    porDistancia: {
      ativa: true,
      base: 3,
      ateKm: 2,
      porKm: 1,
      maxKm: 17,
      fator: 1.3
    },

    /* quando não dá para descobrir a distância */
    foraDaLista: null
  },

  /* Impressão de comanda (modo loja em comanda.html).
     false = o pedido no WhatsApp continua igual, e a loja imprime
             colando o texto em comanda.html.
     true  = o pedido leva no fim um link que já abre a comanda pronta
             para a loja imprimir com um toque (o cliente vê esse link). */
  linkComanda: false
};

/* =========================================================
   MODO MESA (página restaurante.html)
   Quando o endereço vem com ?mesa=7, o site vira o cardápio
   de dentro do restaurante: só "No restaurante", sem endereço
   nem forma de pagamento, e o pedido cai direto na comanda
   daquela mesa no painel. É o mesmo app.js do site normal,
   este parâmetro nunca aparece em index.html. */
const MESA_ATUAL = new URLSearchParams(location.search).get("mesa");

/* transforma texto em código para caber no link da comanda */
/* =========================================================
   PROJETO NO SERVIDOR (Firebase)
   ---------------------------------------------------------
   É daqui que o site lê o cardápio ajustado pelo dono e o
   aviso de loja aberta ou fechada. Precisa ser o MESMO
   projeto que está em assets/js/firebase-config.js.

   ⚠️ Enquanto estiver "TROCAR", o site não consulta servidor
   nenhum: o cardápio e o horário valem pelos arquivos. Nunca
   deixar aqui o projeto de outro cliente, senão este site
   passa a mostrar o cardápio do cliente errado.
   ========================================================= */
const PROJETO_SERVIDOR = "forno-nobre-modelo";
const TEM_SERVIDOR = PROJETO_SERVIDOR && PROJETO_SERVIDOR !== "TROCAR";
const urlServidor = doc =>
  `https://firestore.googleapis.com/v1/projects/${PROJETO_SERVIDOR}/databases/(default)/documents/publico/${doc}`;

function paraLink(txt) {
  const bytes = new TextEncoder().encode(txt);
  let bin = ""; bytes.forEach(b => bin += String.fromCharCode(b));
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

/* ---- adicionais ---- */
/* ---- adicionais, grupos e itens do cardápio vivem em cardapio.js ---- */

/* O navegador guarda onde a pessoa parou e devolve ali na volta, o que fazia
   o site abrir no meio dos combos. Quem chega pelo link tem que ver o começo.
   Só respeitamos a rolagem quando o próprio endereço aponta para uma seção. */
if ("scrollRestoration" in history) history.scrollRestoration = "manual";
(function comecarNoTopo() {
  const temAncora = location.hash && location.hash.length > 1;
  if (temAncora) return;
  const subir = () => window.scrollTo(0, 0);
  subir();
  window.addEventListener("load", subir, { once: true });
})();

/* ========================= utilidades ========================= */
const $  = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const reais = v => "R$ " + v.toFixed(2).replace(".", ",");

/* ================= apoio da pizza =================
   O tamanho manda no preço. O meio a meio cobra o sabor mais caro,
   que é como toda pizzaria da região trabalha. */
const TAM       = id => TAMANHOS.find(t => t.id === id) || TAMANHOS[0];
const ehPizza   = it => !!(it && it.pz);
const ehCombo   = it => !!(it && it.pzcombo);
const precoSabor = (it, tamId) => ehPizza(it) ? Number((it.t || {})[tamId] || 0) : Number(it.p || 0);
const precoDe    = it => ehPizza(it) ? Number((it.t || {})[TAMANHOS[0].id] || 0) : Number(it.p || 0);
const saboresDoGrupo = g => CARDAPIO.filter(i => i.g === g && i.pz && !i.off);
/* meio a meio livre: salgada com doce também vale, é comum o cliente pedir
   assim (pedido do Matheus, 25/09/2026) */
const todosSaboresPizza = () => CARDAPIO.filter(i => i.pz && !i.off);

function tamEscolhido() {
  if (itemAtual && ehCombo(itemAtual)) return itemAtual.pzcombo;
  const r = $("[data-tam]:checked");
  return r ? r.value : (TAMANHOS[TAMANHOS.length - 1] || TAMANHOS[0]).id;
}
function bordaEscolhida() {
  const sel = $("[data-borda]");
  if (!sel) return null;
  return BORDAS_SALGADA.concat(BORDAS_DOCE).find(b => b.n === sel.value) || null;
}
function nomeDoSabor(id) {
  const s = CARDAPIO.find(i => i.id === id);
  return s ? s.n : "";
}
const CHAVE = "fornonobre:carrinho";
/* Por quanto tempo o carrinho continua guardado no aparelho. Sem isto, quem
   pedia hoje voltava amanhã e encontrava a sacola cheia do pedido antigo. */
const VALIDADE_CARRINHO = 3 * 60 * 60 * 1000;   // 3 horas

let carrinho = [];
try {
  const guardado = JSON.parse(localStorage.getItem(CHAVE) || "null");
  if (Array.isArray(guardado)) {
    carrinho = guardado;                       // formato antigo, sem hora
  } else if (guardado && Array.isArray(guardado.itens)) {
    const velho = Date.now() - (guardado.em || 0) > VALIDADE_CARRINHO;
    carrinho = velho ? [] : guardado.itens;
    if (velho) localStorage.removeItem(CHAVE);
  }
} catch (e) { carrinho = []; }

/* ========================= cardápio =========================
   Cardápio único, uma grade só de sabores (Salgadas e Doces como
   filtro, igual às outras categorias). Tamanho (Broto/Grande) e
   meio a meio são escolhidos dentro do próprio sabor, ao abrir o
   card — é o padrão testado por cardápio digital de pizzaria
   (iFood, Consumer, ClickPede etc.): uma grade só, sem multiplicar
   a navegação por tamanho. Pesquisado e decidido em 25/09/2026. */
function cartaoItem(i) {
  const preco = ehPizza(i) && TAMANHOS.length > 1
    ? `<small>a partir de</small> ${reais(precoDe(i))}`
    : reais(i.p);
  return `
    <button class="item" type="button" data-item="${i.id}">
      <span class="item-foto">
        <img src="${i.foto || `assets/img/fotos/${i.f}.jpg`}" alt="${i.n}" loading="lazy" decoding="async" width="560" height="420" />
        ${i.tag ? `<span class="etiqueta">${i.tag}</span>` : ""}
      </span>
      <span class="item-corpo">
        <span class="item-nome">${i.n}</span>
        ${i.d ? `<span class="item-desc">${i.d}</span>` : ""}
        <span class="item-rodape">
          <span class="item-preco">${preco}</span>
          <span class="item-mais" aria-hidden="true">+</span>
        </span>
      </span>
    </button>`;
}

function montarCardapio() {
  const alvo = $("[data-cardapio]");
  const filtros = $("[data-filtros]");
  const grupos = GRUPOS.filter(g => g.id !== "promocoes");

  filtros.innerHTML =
    `<button type="button" role="tab" aria-selected="true" data-f="todos">Tudo</button>` +
    grupos.map(g => `<button type="button" role="tab" aria-selected="false" data-f="${g.id}">${g.rotulo}</button>`).join("");

  alvo.innerHTML = grupos.map(g => {
    const itens = CARDAPIO.filter(i => i.g === g.id && !i.off);
    return `
      <div class="grupo" data-grupo="${g.id}">
        <div class="grupo-topo">
          <h3>${g.titulo}</h3>
          <span>${itens.length} ${itens.length === 1 ? "opção" : "opções"}</span>
        </div>
        ${g.nota ? `<p class="grupo-nota">${g.nota}</p>` : ""}
        <div class="lista-itens">${itens.map(cartaoItem).join("")}</div>
      </div>`;
  }).join("");

  /* Faixa "Mais vendidos" no topo (marketing). Itens com top:true. */
  const tops = CARDAPIO.filter(i => i.top && !i.off);
  if (tops.length) {
    const faixa = `
      <div class="mais-vendidos">
        <div class="grupo-topo"><h3>🔥 Mais vendidos</h3><span>os queridinhos da casa</span></div>
        <div class="mv-trilho">${tops.map(cartaoItem).join("")}</div>
      </div>`;
    alvo.insertAdjacentHTML("afterbegin", faixa);
  }

  let filtroAtivo = "todos";
  filtros.addEventListener("click", e => {
    const b = e.target.closest("button[data-f]");
    if (!b) return;
    $$("button", filtros).forEach(x => x.setAttribute("aria-selected", String(x === b)));
    filtroAtivo = b.dataset.f;
    $$(".grupo", alvo).forEach(g => { g.hidden = filtroAtivo !== "todos" && g.dataset.grupo !== filtroAtivo; });
    /* depois de filtrar, a página encolhe (grupos escondidos somem),
       então rola até o topo do grupo escolhido pra não sobrar no final
       da página com a posição de rolagem antiga */
    const destino = filtroAtivo === "todos" ? alvo : $(`.grupo[data-grupo="${filtroAtivo}"]`, alvo);
    if (destino) destino.scrollIntoView({ block: "start", behavior: "smooth" });
  });

  alvo.addEventListener("click", e => {
    const b = e.target.closest("[data-item]");
    if (b) abrirModal(b.dataset.item);
  });

  /* filtro acompanha a rolagem: só faz sentido quando "Tudo" está
     selecionado, já que nos outros só uma categoria fica visível */
  if ("IntersectionObserver" in window) {
    const observador = new IntersectionObserver(entradas => {
      if (filtroAtivo !== "todos") return;
      entradas.forEach(e => {
        if (!e.isIntersecting) return;
        const id = e.target.dataset.grupo;
        $$("button", filtros).forEach(x => x.setAttribute("aria-selected", String(x.dataset.f === id)));
      });
    }, { rootMargin: "-100px 0px -72% 0px", threshold: 0 });
    $$(".grupo", alvo).forEach(g => observador.observe(g));
  }
}

/* ================= blocos da montagem da pizza ================= */
function blocoTamanhos(it) {
  const padrao = (TAMANHOS[TAMANHOS.length - 1] || TAMANHOS[0]).id;
  return `<div class="extras-bloco">
    <p class="extras-titulo">Escolha o tamanho</p>
    <div class="tamanhos">
      ${TAMANHOS.map(t => `
        <label class="tam">
          <input type="radio" name="tamanho" data-tam value="${t.id}" ${t.id === padrao ? "checked" : ""} />
          <span class="tam-corpo">
            ${t.tag ? `<em>${t.tag}</em>` : ""}
            <b>${t.n}</b>
            <small>${t.d}</small>
            <i>${reais((it.t || {})[t.id] || 0)}</i>
            <u>${t.sabores > 1 ? `até ${t.sabores} sabores` : "1 sabor"}</u>
          </span>
        </label>`).join("")}
    </div>
  </div>`;
}

function blocoSabores(it) {
  const t = TAM(tamEscolhido());
  if (t.sabores < 2) {
    return `<div class="extras-bloco">
      <p class="extras-titulo">Sabor</p>
      <p class="extras-ajuda">Pizza ${t.n} inteira, 1 sabor só: <b>${it.n}</b>.</p>
    </div>`;
  }
  const lista = todosSaboresPizza().filter(s => s.id !== it.id);
  const salgadas = lista.filter(s => s.g === "salgadas");
  const doces = lista.filter(s => s.g === "doces");
  const opcoesSabor = `
    <option value="">Não quero, só ${it.n}</option>
    ${salgadas.length ? `<optgroup label="Pizza salgada">
      ${salgadas.map(s => `<option value="${s.id}">${s.n} — ${reais(s.t[t.id])}</option>`).join("")}
    </optgroup>` : ""}
    ${doces.length ? `<optgroup label="Pizza doce">
      ${doces.map(s => `<option value="${s.id}">${s.n} — ${reais(s.t[t.id])}</option>`).join("")}
    </optgroup>` : ""}`;
  return `<div class="extras-bloco">
    <p class="extras-titulo">Meio a meio</p>
    <p class="extras-ajuda">O tamanho ${t.n} aceita até ${t.sabores} sabores. Você paga o preço do sabor mais caro, sem taxa nenhuma a mais.</p>
    <div class="sabor-fixo"><b>1º sabor</b><span>${it.n}</span></div>
    ${Array.from({ length: t.sabores - 1 }, (_, k) => `
      <label class="escolha">${k + 2}º sabor <small>(opcional)</small>
        <select data-sabor>${opcoesSabor}</select>
      </label>`).join("")}
  </div>`;
}

function blocoComboSabores(it) {
  const t = TAM(it.pzcombo);
  const quantas = it.combo2 ? 2 : 1;
  /* quando a promoção vale só para alguns sabores, a lista respeita isso */
  const lista = it.sabores && it.sabores.length
    ? CARDAPIO.filter(i => i.pz && !i.off && it.sabores.includes(i.id))
    : CARDAPIO.filter(i => i.pz && !i.off);
  let h = "";
  for (let n = 0; n < quantas; n++) {
    h += `<div class="extras-bloco">
      <p class="extras-titulo">${quantas > 1 ? `${n + 1}ª pizza` : "Escolha os sabores"} · ${t.n}</p>
      ${Array.from({ length: t.sabores }, (_, k) => `
        <label class="escolha">${k === 0 ? "Sabor" : `${k + 1}º sabor <small>(opcional)</small>`}
          <select data-sabor-combo data-pizza="${n}">
            ${k === 0 ? "" : `<option value="">Não quero</option>`}
            ${lista.map(s => `<option value="${s.id}">${s.n}</option>`).join("")}
          </select>
        </label>`).join("")}
    </div>`;
  }
  return h;
}

/* borda doce (chocolate etc.) só faz sentido em pizza doce; a pizza
   salgada oferece a recheada de catupiry original */
function blocoBorda(it) {
  const lista = it && it.g === "doces" ? BORDAS_DOCE : BORDAS_SALGADA;
  return `<div class="extras-bloco">
    <label class="escolha">Borda recheada <small>(opcional)</small>
      <select data-borda>
        ${lista.map(b => `<option value="${b.n}">${b.n}${b.p ? ` — + ${reais(b.p)}` : ""}</option>`).join("")}
      </select>
    </label>
  </div>`;
}

/* ========================= modal do item ========================= */
let itemAtual = null, qtdAtual = 1;

function abrirModal(id) {
  const it = CARDAPIO.find(i => i.id === id);
  if (!it) return;
  itemAtual = it; qtdAtual = 1;

  const mf = $("[data-modal-foto]");
  mf.src = it.foto || `assets/img/fotos/${it.f}.jpg`;
  mf.alt = it.n;
  $("[data-modal-cat]").textContent = GRUPOS.find(g => g.id === it.g).titulo;
  $("[data-modal-nome]").textContent = it.n;
  const desc = $("[data-modal-desc]");
  desc.textContent = it.d || "";
  desc.hidden = !it.d;
  $("[data-modal-obs]").value = "";
  $("[data-modal-qtd]").textContent = "1";

  const extras = $("[data-modal-extras]");
  let html = "";

  if (ehPizza(it)) {
    if (TAMANHOS.length > 1) html += blocoTamanhos(it);
    if (it.escolherIngredientes) {
      html += `<div class="extras-bloco">
        <p class="extras-titulo">Escolha ${it.escolherIngredientes} ingredientes</p>
        <p class="extras-ajuda" data-freg-contador>Marque exatamente ${it.escolherIngredientes}.</p>
        <div class="extras-lista">
          ${INGREDIENTES_FREGUES.map(i => `
            <label class="extra">
              <input type="checkbox" data-ingrediente value="${i}" />
              <span>${i}</span>
            </label>`).join("")}
        </div>
      </div>`;
    } else {
      html += `<div data-sabores></div>`;
    }
    html += blocoBorda(it);
  }
  if (ehCombo(it)) {
    html += blocoComboSabores(it);
    html += blocoBorda(it);
  }
  if (it.opcoes) {
    html += `<div class="extras-bloco">
      <label class="escolha">Escolha
        <select data-opcao required>${it.opcoes.map(o => `<option>${o}</option>`).join("")}</select>
      </label>
    </div>`;
  }
  if (it.escolhas) {
    html += `<div class="extras-bloco">
      <p class="extras-titulo">Escolha os ${it.escolhas} lanches</p>
      ${Array.from({ length: it.escolhas }, (_, k) => `
        <label class="escolha">Lanche ${k + 1}
          <select data-escolha>${OPC_COMBO.map(o => `<option>${o}</option>`).join("")}</select>
        </label>`).join("")}
    </div>`;
  }
  if (it.add) {
    const lista = it.add === "lanche" ? ADD_LANCHE : ADD_PIZZA;
    html += `<div class="extras-bloco">
      <p class="extras-titulo">Adicionais (opcional)</p>
      <div class="extras-lista">
        ${lista.map(a => `
          <label class="extra">
            <input type="checkbox" data-add value="${a.n}" data-preco="${a.p}" />
            <span>${a.n}</span><b>+ ${reais(a.p)}</b>
          </label>`).join("")}
      </div>
    </div>`;
  }
  extras.innerHTML = html;

  $("[data-modal]").hidden = false;
  document.body.classList.add("travado");
  atualizarModal();
}

function precoModal() {
  if (!itemAtual) return 0;
  const adds = $$("[data-add]:checked").reduce((s, c) => s + Number(c.dataset.preco), 0);
  let base;

  if (ehPizza(itemAtual)) {
    const tam = tamEscolhido();
    base = precoSabor(itemAtual, tam);
    /* meio a meio: vale o sabor mais caro. No broto, meio a meio
       soma R$ 1,00 a mais (regra da casa). */
    let temSegundoSabor = false;
    $$("[data-sabor]").forEach(sel => {
      if (!sel.value) return;
      temSegundoSabor = true;
      const outro = CARDAPIO.find(i => i.id === sel.value);
      if (outro) base = Math.max(base, precoSabor(outro, tam));
    });
    if (tam === "broto" && temSegundoSabor) base += TAXA_MEIO_A_MEIO_BROTO;
  } else {
    base = Number(itemAtual.p || 0);
  }

  const borda = bordaEscolhida();
  if (borda) base += borda.p;

  return (base + adds) * qtdAtual;
}

function atualizarModal() {
  /* trocou o tamanho: a lista de sabores muda junto (broto não tem meio a meio) */
  if (itemAtual && ehPizza(itemAtual)) {
    const alvo = $("[data-sabores]");
    const tam = tamEscolhido();
    if (alvo && alvo.dataset.tam !== tam) {
      const antes = $$("[data-sabor]").map(s => s.value);
      alvo.innerHTML = blocoSabores(itemAtual);
      alvo.dataset.tam = tam;
      $$("[data-sabor]").forEach((s, k) => {
        if (antes[k] && [...s.options].some(o => o.value === antes[k])) s.value = antes[k];
      });
    }
  }
  if (itemAtual && itemAtual.escolherIngredientes) {
    const max = itemAtual.escolherIngredientes;
    const marcados = $$("[data-ingrediente]:checked");
    $$("[data-ingrediente]").forEach(c => { c.disabled = !c.checked && marcados.length >= max; });
    const contador = $("[data-freg-contador]");
    if (contador) contador.textContent = `${marcados.length} de ${max} marcados.`;
  }

  $("[data-modal-total]").textContent = reais(precoModal());
  $("[data-modal-qtd]").textContent = String(qtdAtual);
}
function fecharModal() {
  $("[data-modal]").hidden = true;
  itemAtual = null;
  if (!$("[data-carrinho]").dataset.aberto) document.body.classList.remove("travado");
}

/* =========================================================
   CUPOM DE DESCONTO
   ========================================================= */
let cupomAtivo = null;

function acharCupom(codigo) {
  const c = String(codigo || "").trim().toUpperCase();
  if (!c) return null;
  return (typeof CUPONS !== "undefined" ? CUPONS : []).find(x => x.codigo.toUpperCase() === c) || null;
}

/* Quanto o cupom tira deste pedido, já conferindo o valor mínimo. */
function descontoAtual() {
  const vazio = { tipo: null, valor: 0, rotulo: "" };
  if (!cupomAtivo) return vazio;
  const sub = subtotal();
  if (sub < (cupomAtivo.minimo || 0)) return vazio;

  if (cupomAtivo.tipo === "percentual") {
    return { tipo: "percentual", valor: Math.round(sub * cupomAtivo.valor) / 100,
             rotulo: `Cupom ${cupomAtivo.codigo} (${cupomAtivo.valor}%)` };
  }
  if (cupomAtivo.tipo === "valor") {
    return { tipo: "valor", valor: Math.min(cupomAtivo.valor, sub),
             rotulo: `Cupom ${cupomAtivo.codigo}` };
  }
  if (cupomAtivo.tipo === "frete") {
    const t = tipoEscolhido() === "Entrega" ? taxaEntrega() : 0;
    const taxa = (typeof t === "number") ? t : 0;
    return { tipo: "frete", valor: taxa, rotulo: `Cupom ${cupomAtivo.codigo} (entrega grátis)` };
  }
  return vazio;
}

function aplicarCupom() {
  const campo = $("[data-campo-cupom]");
  const aviso = $("[data-cupom-aviso]");
  if (!campo || !aviso) return;
  const c = acharCupom(campo.value);

  if (!c) {
    cupomAtivo = null;
    aviso.hidden = false; aviso.dataset.erro = "true";
    aviso.textContent = "Cupom não encontrado. Confira as letras e tente de novo.";
  } else if (subtotal() < (c.minimo || 0)) {
    cupomAtivo = null;
    aviso.hidden = false; aviso.dataset.erro = "true";
    aviso.textContent = `Esse cupom vale para pedidos a partir de ${reais(c.minimo)}. Falta ${reais(c.minimo - subtotal())}.`;
  } else {
    cupomAtivo = c;
    aviso.hidden = false; delete aviso.dataset.erro;
    aviso.textContent = `Cupom aplicado: ${c.texto}`;
  }
  pintarCarrinho();
}

function pintarDesconto() {
  const linha = $("[data-linha-desconto]");
  if (!linha) return;
  const d = descontoAtual();
  linha.hidden = !(d.valor > 0);
  if (d.valor > 0) {
    $("[data-desconto-rot]").textContent = d.rotulo;
    $("[data-desconto-valor]").textContent = "− " + reais(d.valor);
  }
}

/* =========================================================
   CARTÃO FIDELIDADE
   ========================================================= */
const CHAVE_FID = "fornonobre:fidelidade";

function lerFid() {
  try {
    const f = JSON.parse(localStorage.getItem(CHAVE_FID) || "null");
    if (f && typeof f.pedidos === "number") return f;
  } catch (e) {}
  return { fone: "", pedidos: 0, premios: 0 };
}
function salvarFid(f) { try { localStorage.setItem(CHAVE_FID, JSON.stringify(f)); } catch (e) {} }

function pintarFidelidade() {
  const alvo = $("[data-selos]");
  if (!alvo || typeof FIDELIDADE === "undefined" || !FIDELIDADE.ativa) return;
  const f = lerFid();
  const feitos = f.pedidos % FIDELIDADE.meta;
  alvo.innerHTML = Array.from({ length: FIDELIDADE.meta }, (_, k) =>
    `<span class="selo-fid ${k < feitos ? "cheio" : ""}" aria-hidden="true">${k < feitos ? "★" : ""}</span>`).join("");
  const conta = $("[data-fid-conta]");
  if (conta) {
    conta.textContent = feitos === 0 && f.pedidos > 0
      ? `Cartão completo! No próximo pedido avise que você tem direito a ${FIDELIDADE.premio}.`
      : `${feitos} de ${FIDELIDADE.meta} pedidos. Faltam ${FIDELIDADE.meta - feitos} para ganhar ${FIDELIDADE.premio}.`;
  }
}

/* Soma um selo depois que o pedido foi enviado.
   Devolve true quando este pedido fechou o cartão. */
function somarFidelidade(fone) {
  if (typeof FIDELIDADE === "undefined" || !FIDELIDADE.ativa) return false;
  const f = lerFid();
  /* outro cliente usando o mesmo aparelho começa o cartão dele do zero */
  if (f.fone && f.fone !== fone) { f.pedidos = 0; f.premios = 0; }
  f.fone = fone;
  f.pedidos += 1;
  const fechou = f.pedidos % FIDELIDADE.meta === 0;
  if (fechou) f.premios += 1;
  salvarFid(f);
  pintarFidelidade();
  return fechou;
}

/* ========================= carrinho ========================= */
function salvar() {
  try {
    if (!carrinho.length) { localStorage.removeItem(CHAVE); return; }
    localStorage.setItem(CHAVE, JSON.stringify({ itens: carrinho, em: Date.now() }));
  } catch (e) {}
}

/* depois de enviar, a sacola some: o pedido já foi para o WhatsApp */
function esvaziarDepoisDoEnvio() {
  carrinho = [];
  try { localStorage.removeItem(CHAVE); } catch (e) {}
  pintarCarrinho();
  const f = $("[data-checkout]") || document.querySelector("form");
  if (f && f.reset) {
    const nome = f.nome ? f.nome.value : "";
    const fone = f.fone ? f.fone.value : "";
    f.reset();
    /* nome e telefone ficam: é a mesma pessoa pedindo de novo */
    if (f.nome) f.nome.value = nome;
    if (f.fone) f.fone.value = fone;
  }
  abrirCarrinho(false);
}

function adicionarDoModal() {
  if (!itemAtual) return;

  if (itemAtual.escolherIngredientes) {
    const marcados = $$("[data-ingrediente]:checked");
    if (marcados.length !== itemAtual.escolherIngredientes) {
      alert(`Marque exatamente ${itemAtual.escolherIngredientes} ingredientes (você marcou ${marcados.length}).`);
      return;
    }
  }

  const adds = $$("[data-add]:checked").map(c => ({ n: c.value, p: Number(c.dataset.preco) }));
  const escolhas = [];
  let nome = itemAtual.n;

  if (ehPizza(itemAtual)) {
    const t = TAM(tamEscolhido());
    if (itemAtual.escolherIngredientes) {
      const ingredientes = $$("[data-ingrediente]:checked").map(c => c.value);
      nome = `Pizza ${t.n} · ${itemAtual.n.replace(/^\d+\s*·\s*/, "")}`;
      escolhas.push(ingredientes.join(", "));
    } else {
      const ids = [itemAtual.id];
      $$("[data-sabor]").forEach(s => { if (s.value && !ids.includes(s.value)) ids.push(s.value); });
      nome = `Pizza ${t.n} · ${ids.map(nomeDoSabor).join(" / ")}`;
      if (ids.length > 1) escolhas.push(`${ids.length} sabores`);
    }
  } else if (ehCombo(itemAtual)) {
    const t = TAM(itemAtual.pzcombo);
    const porPizza = {};
    $$("[data-sabor-combo]").forEach(s => {
      if (!s.value) return;
      const n = s.dataset.pizza;
      porPizza[n] = porPizza[n] || [];
      if (!porPizza[n].includes(s.value)) porPizza[n].push(s.value);
    });
    Object.keys(porPizza).forEach(n => {
      const nomes = porPizza[n].map(nomeDoSabor).join(" / ");
      escolhas.push(`${itemAtual.combo2 ? `${Number(n) + 1}ª pizza ${t.n}` : `Pizza ${t.n}`}: ${nomes}`);
    });
  } else {
    const opcao = $("[data-opcao]");
    if (opcao) nome = `${itemAtual.n} · ${opcao.value}`;
    $$("[data-escolha]").forEach(s => escolhas.push(s.value));
  }

  if (ehPizza(itemAtual) || ehCombo(itemAtual)) {
    const massa = $("[data-massa]:checked");
    if (massa) escolhas.push(`Massa ${massa.value.toLowerCase()}`);
    const borda = bordaEscolhida();
    if (borda && borda.p > 0) escolhas.push(`Borda de ${borda.n.toLowerCase()}`);
  }

  const obs = $("[data-modal-obs]").value.trim();
  const unit = precoModal() / qtdAtual;

  const assinatura = JSON.stringify([itemAtual.id, nome, adds.map(a => a.n), escolhas, obs]);
  const igual = carrinho.find(l => l.assinatura === assinatura);
  if (igual) igual.q += qtdAtual;
  else carrinho.push({ assinatura, id: itemAtual.id, n: nome, unit, q: qtdAtual, adds, escolhas, obs });

  salvar(); pintarCarrinho(); fecharModal(); pulsar();
}

function pulsar() {
  $$("[data-contador]").forEach(el => {
    el.animate([{ transform: "scale(1)" }, { transform: "scale(1.45)" }, { transform: "scale(1)" }], { duration: 340, easing: "ease-out" });
  });
}

const subtotal = () => carrinho.reduce((s, l) => s + l.unit * l.q, 0);
const totalItens = () => carrinho.reduce((s, l) => s + l.q, 0);

function pintarCarrinho() {
  const alvo = $("[data-itens]");
  if (!carrinho.length) {
    alvo.innerHTML = `<div class="vazio"><span>🍕</span><p>Seu carrinho está vazio.<br />Escolha uma pizza no cardápio.</p></div>`;
  } else {
    alvo.innerHTML = carrinho.map((l, i) => {
      const detalhes = [
        l.escolhas.length ? l.escolhas.join(" · ") : "",
        l.adds.length ? "Adicionais: " + l.adds.map(a => a.n).join(", ") : "",
        l.obs ? "Obs: " + l.obs : ""
      ].filter(Boolean).join("<br />");
      return `<div class="ci">
        <div>
          <div class="ci-nome">${l.n}</div>
          ${detalhes ? `<div class="ci-extra">${detalhes}</div>` : ""}
        </div>
        <div class="ci-preco">${reais(l.unit * l.q)}</div>
        <div class="ci-acoes">
          <button type="button" data-menos="${i}" aria-label="Diminuir">−</button>
          <b>${l.q}</b>
          <button type="button" data-mais="${i}" aria-label="Aumentar">+</button>
          <button type="button" class="ci-remover" data-remover="${i}">remover</button>
        </div>
      </div>`;
    }).join("");
  }
  const t = subtotal();
  $("[data-subtotal]").textContent = reais(t);
  (function(){
    const el = document.querySelector("[data-frete]");
    const meta = LOJA.freteGratis || 0;
    if (!el || !meta || t <= 0) { if (el) el.hidden = true; return; }
    el.hidden = false;
    const falta = Math.max(0, meta - t);
    const pct = Math.min(100, t / meta * 100);
    el.innerHTML = falta > 0
      ? `<div class="fm-txt">Faltam <b>${reais(falta)}</b> para <b>frete grátis</b></div><div class="fm-bar"><i style="width:${pct}%"></i></div>`
      : `<div class="fm-ok">Você ganhou <b>frete grátis</b></div>`;
  })();
  pintarDesconto();
  $("[data-total-flutuante]").textContent = reais(t);
  if (typeof atualizarTaxa === "function") atualizarTaxa();
  $$("[data-contador]").forEach(el => el.textContent = String(totalItens()));
  $("[data-flutuante]").hidden = totalItens() === 0;
}

function abrirCarrinho(abrir) {
  const c = $("[data-carrinho]");
  if (abrir) { c.dataset.aberto = "true"; c.setAttribute("aria-hidden", "false"); $("[data-veu]").hidden = false; document.body.classList.add("travado"); }
  else { delete c.dataset.aberto; c.setAttribute("aria-hidden", "true"); $("[data-veu]").hidden = true; if ($("[data-modal]").hidden) document.body.classList.remove("travado"); }
}

/* ========================= checkout ========================= */
function soDigitos(s) { return (s || "").replace(/\D/g, ""); }
function formatarFone(v) {
  const d = soDigitos(v).slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}


/* =========================================================
   Taxa de entrega por bairro
   A tabela fica em LOJA.entrega (no topo deste arquivo).
   ========================================================= */
const SEM_LISTA = "__outro__";




/* =========================================================
   Taxa automática por distância
   Descobre onde fica o endereço do cliente (OpenStreetMap,
   grátis e sem cadastro) e calcula a taxa pelo km rodado.
   Assim qualquer bairro é atendido, não só os da lista.
   ========================================================= */
const LOJA_COORD = { lat: -23.703558, lon: -46.396248 };   // pino do Google Maps da Forno Nobre
let distanciaKm = null;       // última distância calculada
let buscaDistancia = null;

function kmEntre(a, b) {
  const R = 6371, rad = g => g * Math.PI / 180;
  const dLat = rad(b.lat - a.lat), dLon = rad(b.lon - a.lon);
  const x = Math.sin(dLat / 2) ** 2 +
            Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(x));
}

function taxaPorKm(km) {
  const c = LOJA.entrega.porDistancia;
  if (!c || !c.ativa || km == null) return null;
  if (km > c.maxKm) return "fora";
  const v = c.base + Math.max(0, km - c.ateKm) * c.porKm;
  return Math.round(v * 2) / 2;            // arredonda para R$ 0,50
}

function pedirDistancia() {
  clearTimeout(buscaDistancia);
  buscaDistancia = setTimeout(calcularDistancia, 900);
}

async function calcularDistancia() {
  if (tipoEscolhido() !== "Entrega") return;
  const rua = document.querySelector("[name=endereco]").value.trim();
  const num = document.querySelector("[name=numero]").value.trim();
  const bairro = bairroEscolhido();
  const cidade = $("[data-cidade]").value;
  if (rua.length < 4 || !cidade) return;

  /* Tenta do mais específico para o mais genérico. O bairro fica FORA da
     busca: o nome que os Correios usam muitas vezes não é o mesmo do mapa,
     e quando não bate o mapa não devolve nada. */
  const tentativas = [
    `${rua}${num ? ", " + num : ""}, ${cidade}, SP, Brasil`,
    `${rua}, ${cidade}, SP, Brasil`,
    bairro ? `${bairro}, ${cidade}, SP, Brasil` : null
  ].filter(Boolean);

  for (const busca of tentativas) {
    try {
      const r = await fetch("https://nominatim.openstreetmap.org/search?format=json&limit=1&q=" +
                            encodeURIComponent(busca));
      const lista = await r.json();
      if (Array.isArray(lista) && lista.length) {
        const reta = kmEntre(LOJA_COORD, { lat: +lista[0].lat, lon: +lista[0].lon });
        distanciaKm = reta * (LOJA.entrega.porDistancia.fator || 1);
        atualizarTaxa();
        return;
      }
    } catch (e) {
      distanciaKm = null; atualizarTaxa(); return;   // sem internet: cai na tabela
    }
  }
  distanciaKm = null;          // nem o bairro o mapa conhece
  atualizarTaxa();
}

/* ---- CEP preenche endereço sozinho (ViaCEP) ---- */
function formatarCep(v) {
  const d = soDigitos(v).slice(0, 8);
  return d.length > 5 ? d.slice(0, 5) + "-" + d.slice(5) : d;
}

function avisoCep(texto, achou) {
  const el = $("[data-busca-cep]");
  if (!el) return;
  el.hidden = !texto;
  el.textContent = texto;
  el.dataset.achou = achou ? "sim" : "nao";
}

async function buscarCep() {
  const campo = document.querySelector("[name=cep]");
  if (!campo) return;
  const d = soDigitos(campo.value);
  if (d.length !== 8) { avisoCep("", false); return; }

  avisoCep("Buscando o endereço…", false);
  try {
    const r = await fetch(`https://viacep.com.br/ws/${d}/json/`);
    const e = await r.json();
    if (e.erro) { avisoCep("CEP não encontrado — preencha os campos abaixo.", false); return; }

    /* a rua sempre preenche, atende a cidade ou não — só o cálculo da
       taxa que depende disso. Bug antigo: travava tudo (nem a rua saía)
       quando a cidade do CEP não batia com a tabela. */
    const cidades = Object.keys(LOJA.entrega.cidades);
    const cidade = cidades.find(c => c.toLowerCase() === String(e.localidade).toLowerCase());

    const rua = document.querySelector("[name=endereco]");
    if (e.logradouro) { rua.value = e.logradouro; ultimaBusca = (cidade || e.localidade) + "|" + e.logradouro.toLowerCase(); }

    if (cidade) {
      $("[data-cidade]").value = cidade;
      preencherBairros();
      if (e.bairro) aplicarBairro(e.bairro);
      avisoCep(`${e.logradouro || "Endereço"} — ${e.bairro || ""}, ${e.localidade}`.replace(" — ,", " —"), true);
      pedirDistancia();        // já calcula a taxa com o endereço que veio do CEP
    } else {
      avisoCep(`Endereço preenchido, mas confirme se entregamos em ${e.localidade} pelo WhatsApp.`, false);
    }
    if (e.logradouro) document.querySelector("[name=numero]").focus();
  } catch (err) {
    avisoCep("", false);   // sem internet: o cliente preenche na mão
  }
}

/* ---- sugestão de bairro a partir da rua (ViaCEP, grátis e sem cadastro) ---- */
let buscaAgendada = null;
let ultimaBusca = "";

function avisoBusca(texto, achou) {
  const el = $("[data-busca-bairro]");
  if (!el) return;
  el.hidden = !texto;
  el.textContent = texto;
  el.dataset.achou = achou ? "sim" : "nao";
}

function pedirBairro() {
  clearTimeout(buscaAgendada);
  buscaAgendada = setTimeout(buscarBairro, 600);   // espera parar de digitar
}

async function buscarBairro() {
  const campoRua = document.querySelector("[name=endereco]");
  const selCidade = $("[data-cidade]");
  if (!campoRua || !selCidade) return;

  const rua = campoRua.value.trim().replace(/^(rua|r\.|av\.?|avenida|travessa|tv\.?)\s+/i, "");
  const cidade = selCidade.value;
  if (rua.length < 4) { avisoBusca("", false); return; }

  const chave = cidade + "|" + rua.toLowerCase();
  if (chave === ultimaBusca) return;
  ultimaBusca = chave;

  avisoBusca("Procurando o bairro…", false);
  try {
    const r = await fetch(`https://viacep.com.br/ws/SP/${encodeURIComponent(cidade)}/${encodeURIComponent(rua)}/json/`);
    const lista = await r.json();
    if (!Array.isArray(lista) || !lista.length) {
      avisoBusca("Não achei essa rua — escolha o bairro na lista abaixo.", false);
      return;
    }
    /* bairros distintos que aquela rua atravessa */
    const bairros = [...new Set(lista.map(x => x.bairro).filter(Boolean))];
    if (!bairros.length) { avisoBusca("", false); return; }

    aplicarBairro(bairros[0]);
    avisoBusca(bairros.length === 1
      ? `Bairro encontrado: ${bairros[0]}`
      : `Essa rua passa por ${bairros.length} bairros — confira se é ${bairros[0]}.`, true);
  } catch (e) {
    avisoBusca("", false);   // sem internet para consultar: o cliente escolhe na mão
  }
}

/* marca o bairro no seletor; se não estiver na tabela, acrescenta */
function aplicarBairro(nome) {
  const sel = $("[data-bairro]");
  if (!sel) return;
  const igual = [...sel.options].find(o =>
    o.value.toLowerCase() === String(nome).toLowerCase());
  if (igual) { sel.value = igual.value; }
  else {
    const op = document.createElement("option");
    op.value = nome; op.textContent = nome; op.dataset.deFora = "sim";
    sel.insertBefore(op, sel.options[sel.options.length - 1]);
    sel.value = nome;
  }
  $("[data-campo-outro]").hidden = sel.value !== SEM_LISTA;
  atualizarTaxa();
}


/* =========================================================
   Vitrine dos combos — promoção à parte, fora do cardápio
   ========================================================= */
function montarCombos() {
  const alvo = $("[data-vitrine-combos]");
  if (!alvo) return;
  const promo = CARDAPIO.filter(i => i.g === "promocoes" && !i.off);
  if (!promo.length) { const sec = document.getElementById("combos"); if (sec) sec.hidden = true; return; }
  const menor = Math.min(...promo.map(c => c.p));

  alvo.innerHTML = promo.map(c => `
      <button class="combo-card" type="button" data-item="${c.id}">
        <span class="combo-foto">
          <img src="${c.foto || `assets/img/fotos/${c.f}.jpg`}" alt="${c.n}" loading="lazy" decoding="async" width="560" height="420" />
          ${c.tag ? `<span class="combo-selo">${c.tag}</span>` : ""}
        </span>
        <span class="combo-corpo">
          <span class="combo-tipo">Promoção</span>
          <span class="combo-nome">${c.n}</span>
          <span class="combo-inclui">${c.d || ""}</span>
          <span class="combo-rodape">
            <span class="combo-preco">${reais(c.p)}</span>
            <span class="combo-unit">monte os sabores</span>
          </span>
        </span>
      </button>`).join("");

  const ap = $("[data-combo-apartir]");
  if (ap) ap.textContent = reais(menor);
}

function montarEntrega() {
  const selCidade = $("[data-cidade]");
  const selBairro = $("[data-bairro]");
  if (!selCidade || !selBairro || !LOJA.entrega || !LOJA.entrega.ativa) return;

  const cidades = Object.keys(LOJA.entrega.cidades);
  selCidade.innerHTML = cidades.map(c => `<option value="${c}">${c}</option>`).join("");
  preencherBairros();

  selCidade.addEventListener("change", () => {
    preencherBairros(); ultimaBusca = ""; buscarBairro(); atualizarTaxa();
  });
  selBairro.addEventListener("change", () => {
    $("[data-campo-outro]").hidden = selBairro.value !== SEM_LISTA;
    pedirDistancia();
    atualizarTaxa();
  });
  atualizarTaxa();
}

function preencherBairros() {
  const cidade = $("[data-cidade]").value;
  const bairros = Object.keys(LOJA.entrega.cidades[cidade] || {});
  $("[data-bairro]").innerHTML =
    bairros.map(b => `<option value="${b}">${b}</option>`).join("") +
    `<option value="${SEM_LISTA}">Meu bairro não está na lista</option>`;
  $("[data-campo-outro]").hidden = true;
}

/* devolve o valor da taxa, ou null quando é "a combinar" */
/* Devolve o valor da taxa, "fora" quando passa do raio, ou null
   quando ainda não dá para saber ("a combinar").
   Ordem: a tabela de bairros manda; sem ela, vale a distância. */
function taxaEntrega() {
  if (!LOJA.entrega || !LOJA.entrega.ativa) return null;
  if (tipoEscolhido() !== "Entrega") return 0;

  const sel = $("[data-bairro]");
  const bairro = sel ? sel.value : "";
  if (bairro && bairro !== SEM_LISTA) {
    const cidade = $("[data-cidade]").value;
    const v = (LOJA.entrega.cidades[cidade] || {})[bairro];
    if (typeof v === "number") return v;      // preço combinado com o dono
  }
  const porKm = taxaPorKm(distanciaKm);       // qualquer outro endereço
  if (porKm !== null) return porKm;
  return LOJA.entrega.foraDaLista;
}

function bairroEscolhido() {
  const sel = $("[data-bairro]");
  if (!sel) return "";
  if (sel.value === SEM_LISTA) {
    const campo = document.querySelector("[name=bairroOutro]");
    return campo ? campo.value.trim() : "";
  }
  return sel.value;
}

function tipoEscolhido() {
  const m = document.querySelector("[name=tipo]:checked");
  return m && m.value === "Entrega" ? "Entrega" : "Retirada";
}

function atualizarTaxa() {
  const entrega = tipoEscolhido() === "Entrega";
  const taxa = taxaEntrega();
  const linhaTaxa  = $("[data-linha-taxa]");
  const linhaGeral = $("[data-linha-geral]");
  const pendente   = $("[data-pendente]");
  const aviso      = $("[data-aviso-entrega]");
  if (!linhaTaxa) return;

  pintarDesconto();
  const temDesconto = descontoAtual().valor > 0;
  linhaTaxa.hidden  = !entrega;
  linhaGeral.hidden = !(entrega || temDesconto);
  if (!entrega && temDesconto) $("[data-total-geral]").textContent = reais(totalDoPedido());
  if (pendente) pendente.hidden = !(entrega && taxa === null);

  if (!entrega) { atualizarTotais(); return; }

  const foraDoRaio = taxa === "fora";
  const valor = (typeof taxa === "number") ? taxa : null;

  $("[data-taxa-valor]").textContent =
    foraDoRaio ? "fora da área" : valor === null ? "a combinar" : reais(valor);
  $("[data-total-geral]").textContent = reais(totalDoPedido());
  if (pendente) pendente.hidden = !(entrega && valor === null && !foraDoRaio);

  if (aviso) {
    if (foraDoRaio) {
      aviso.hidden = false;
      aviso.textContent = `Esse endereço fica a cerca de ${distanciaKm.toFixed(1)} km da loja, ` +
        `acima do raio de ${LOJA.entrega.porDistancia.maxKm} km que atendemos. ` +
        `Mande o pedido assim mesmo se quiser — a loja confirma pelo WhatsApp.`;
    } else if (valor !== null && distanciaKm !== null &&
               !(LOJA.entrega.cidades[$("[data-cidade]").value] || {})[$("[data-bairro]").value]) {
      aviso.hidden = false;
      aviso.textContent = `Taxa calculada pela distância: cerca de ${distanciaKm.toFixed(1)} km até a loja.`;
    } else {
      aviso.hidden = true;
    }
  }
  atualizarTotais();
}

/* o rodapé do carrinho também precisa refletir a taxa */
/* Total que o cliente paga: itens + entrega − desconto do cupom. */
function totalDoPedido() {
  const entrega = tipoEscolhido() === "Entrega";
  const t = entrega ? taxaEntrega() : 0;
  const taxa = (typeof t === "number") ? t : 0;
  const d = descontoAtual();
  return Math.max(0, subtotal() + taxa - d.valor);
}

function atualizarTotais() {
  const flut = $("[data-total-flutuante]");
  if (flut) flut.textContent = reais(totalDoPedido());
}

async function enviarPedido(e) {
  e.preventDefault();
  const f = e.target;
  const st = $("[data-status]");
  const erro = (campo, msg) => {
    st.textContent = msg; st.dataset.erro = "true";
    if (campo) { campo.setAttribute("aria-invalid", "true"); campo.focus(); campo.scrollIntoView({ block: "center", behavior: "smooth" }); }
    return false;
  };
  $$("input,select", f).forEach(c => c.removeAttribute("aria-invalid"));

  if (!carrinho.length) return erro(null, "Adicione pelo menos um item do cardápio.");
  if (!lojaAbertaAgora().aberto) {
    travarEnvio();
    return avisoStatus(motivoFechado());
  }

  /* ---- modo mesa: sem WhatsApp, sem endereço, sem pagamento ----
     manda pra fila da mesa (pedidos_mesa) e a comanda soma no painel */
  if (MESA_ATUAL) return enviarPedidoDaMesa(f, st);

  if (!f.nome.value.trim()) return erro(f.nome, "Diga seu nome para a gente te chamar.");
  if (soDigitos(f.fone.value).length < 10) return erro(f.fone, "Confira o número do WhatsApp com DDD.");

  const modo = f.tipo.value;
  const tipo = modo;
  if (tipo === "Entrega") {
    if (!f.endereco.value.trim()) return erro(f.endereco, "Diga o nome da rua para entregarmos.");
    if (!f.numero.value.trim())   return erro(f.numero, "Falta o número da casa ou do prédio.");
    if (!bairroEscolhido())       return erro(f.bairro, "Escolha o bairro da entrega.");
  }

  const linhas = carrinho.map(l => {
    const partes = [`• ${l.q}x ${l.n} — ${reais(l.unit * l.q)}`];
    if (l.escolhas.length) partes.push(`   ${l.escolhas.join(" · ")}`);
    if (l.adds.length) partes.push(`   Adicionais: ${l.adds.map(a => a.n).join(", ")}`);
    if (l.obs) partes.push(`   Obs: ${l.obs}`);
    return partes.join("\n");
  });

  const desconto = descontoAtual();
  const fechouCartao = somarFidelidade(soDigitos(f.fone.value));
  const taxaBruta = tipo === "Entrega" ? taxaEntrega() : 0;
  const taxa = (typeof taxaBruta === "number") ? taxaBruta : null;
  const enderecoCheio = [
    `${f.endereco.value.trim()}, ${f.numero.value.trim()}`,
    f.complemento.value.trim(),
    `${bairroEscolhido()} — ${$("[data-cidade]").value}`
  ].filter(Boolean).join(" — ");

  /* ---- Pix que confirma sozinho ----
     Só entra quando o cliente escolheu Pix e o total já é conhecido
     (entrega com taxa a combinar não tem valor fechado para cobrar).
     Se o cofre estiver fora do ar, o pedido segue pelo caminho antigo,
     com a chave na tela e o comprovante no WhatsApp: nunca trava. */
  let pagamentoTexto = f.pagamento.value
    + (f.pagamento.value === "Dinheiro" && f.troco.value.trim() ? ` (troco para ${f.troco.value.trim()})` : "");

  if (f.pagamento.value === "Pix" && window.cobrarPixAutomatico
      && (tipo !== "Entrega" || taxa !== null)) {
    st.dataset.erro = "false";
    st.textContent = "Gerando o Pix…";
    const resultado = await window.cobrarPixAutomatico(totalDoPedido(), "pedido-" + Date.now());
    if (resultado === "pago") {
      pagamentoTexto = "Pix PAGO pelo site";
    } else if (resultado === "desistiu") {
      st.textContent = "Pedido não enviado. Pague o Pix ou escolha outra forma de pagamento.";
      st.dataset.erro = "true";
      return;
    }
    /* "indisponivel" cai aqui e segue o fluxo antigo, sem travar o cliente */
  }

  const msg = [
    `*PEDIDO — ${LOJA.nome}*`,
    "",
    ...linhas,
    "",
    `*Subtotal: ${reais(subtotal())}*`,
    tipo === "Entrega" ? `*Taxa de entrega: ${taxa === null ? "a combinar" : reais(taxa)}*` : "",
    desconto.valor > 0 ? `*Desconto: − ${reais(desconto.valor)}* (${desconto.rotulo})` : "",
    (tipo !== "Entrega" || taxa !== null) ? `*Total: ${reais(totalDoPedido())}*` : "",
    "",
    `*Cliente:* ${f.nome.value.trim()}`,
    `*WhatsApp:* ${formatarFone(f.fone.value)}`,
    `*Como receber:* ${tipo}`,
    tipo === "Entrega" ? `*Endereço:* ${enderecoCheio}` : "",
    `*Pagamento:* ${pagamentoTexto}`,
    f.obs.value.trim() ? `*Observações:* ${f.obs.value.trim()}` : "",
    fechouCartao ? `*CARTÃO FIDELIDADE COMPLETO* — o cliente tem direito a ${FIDELIDADE.premio}.` : "",
    (f.agendar && f.agendar.checked && f.agendaQuando.value.trim()) ? `*AGENDADO PARA:* ${f.agendaQuando.value.trim()}` : "",
    "",
    "_Pedido enviado pelo site._"
  ].filter(l => l !== "").join("\n");

  const texto = LOJA.linkComanda
    ? msg + "\n🖨️ Comanda: " + location.href.replace(/[^/]*$/, "") + "comanda.html#p=" + paraLink(msg)
    : msg;

  /* manda uma cópia para o painel da loja (painel.html), que apita
     no balcão e imprime. Se falhar, o WhatsApp abaixo segue normal. */
  if (window.enviarParaPainel) {
    await window.enviarParaPainel({
      texto: msg,
      cliente: f.nome.value.trim(),
      fone: formatarFone(f.fone.value),
      tipo,
      endereco: tipo === "Entrega" ? enderecoCheio : "",
      pagamento: pagamentoTexto,
      total: totalDoPedido(),
      taxa: taxa || 0,
      itens: carrinho.reduce((s, l) => s + l.q, 0)
    });
  }

  st.dataset.erro = "false";
  st.textContent = "Abrindo o WhatsApp com seu pedido…";
  window.open(`https://wa.me/${LOJA.whatsapp}?text=${encodeURIComponent(texto)}`, "_blank", "noopener");

  /* se o cliente logou com o Google, guarda os dados e o histórico dele
     (opcional, nunca trava quem não logou) */
  if (window.salvarPedidoCliente) {
    window.salvarPedidoCliente({
      nome: f.nome.value.trim(), fone: formatarFone(f.fone.value),
      endereco: f.endereco ? f.endereco.value.trim() : "",
      numero: f.numero ? f.numero.value.trim() : "",
      complemento: f.complemento ? f.complemento.value.trim() : "",
      bairro: bairroEscolhido() || "",
      resumo: `${tipo} · ${carrinho.reduce((s, l) => s + l.q, 0)} itens`,
      total: totalDoPedido()
    });
  }

  /* confirmação na própria tela, para o cliente não ficar sem resposta
     caso o WhatsApp demore a abrir ou o navegador bloqueie a janela */
  mostrarConfirmacao(f.nome.value.trim());
  esvaziarDepoisDoEnvio();
}

/* pedido da mesa: sem pagamento aqui, a conta é fechada no restaurante
   pelo Balcão do painel, que já soma tudo o que a mesa pediu */
function enviarPedidoDaMesa(f, st) {
  const itens = carrinho.map(l => ({
    nome: l.n,
    qtd: l.q,
    preco: l.unit,
    escolhas: l.escolhas || [],
    adds: (l.adds || []).map(a => a.n),
    obs: l.obs || ""
  }));

  if (!window.enviarPedidoMesa) return avisoStatus("Não consegui enviar agora. Chame o garçom.");

  st.dataset.erro = "false";
  st.textContent = "Enviando para a cozinha…";

  window.enviarPedidoMesa({
    mesa: Number(MESA_ATUAL),
    cliente: (f.nome ? f.nome.value.trim() : "") || "",
    itens,
    total: totalDoPedido()
  }).then(ok => {
    if (!ok) return avisoStatus("Não consegui enviar agora. Chame o garçom.");
    if (window.salvarPedidoCliente) {
      window.salvarPedidoCliente({
        nome: f.nome ? f.nome.value.trim() : "",
        resumo: `Mesa ${MESA_ATUAL} · ${carrinho.reduce((s, l) => s + l.q, 0)} itens`,
        total: totalDoPedido()
      });
    }
    mostrarConfirmacao(f.nome ? f.nome.value.trim() : "", true);
    esvaziarDepoisDoEnvio();
  });
}

function mostrarConfirmacao(nome, modoMesa) {
  if (modoMesa) {
    const caixa = document.createElement("div");
    caixa.className = "confirmado";
    caixa.innerHTML = `
      <div class="confirmado-cartao" role="dialog" aria-live="polite">
        <div class="confirmado-selo">✓</div>
        <h3>Pedido enviado${nome ? ", " + nome.split(" ")[0] : ""}!</h3>
        <p>Já chegou na cozinha, mesa <strong>${MESA_ATUAL}</strong>. Você pode continuar
           pedindo quantas vezes quiser — a conta fecha só no final, com o garçom.</p>
        <button type="button" class="confirmado-fechar">Fechar</button>
      </div>`;
    document.body.appendChild(caixa);
    const sair = () => caixa.remove();
    caixa.querySelector(".confirmado-fechar").addEventListener("click", sair);
    caixa.addEventListener("click", e => { if (e.target === caixa) sair(); });
    return;
  }
  const caixa = document.createElement("div");
  caixa.className = "confirmado";
  caixa.innerHTML = `
    <div class="confirmado-cartao" role="dialog" aria-live="polite">
      <div class="confirmado-selo">✓</div>
      <h3>Pedido enviado${nome ? ", " + nome.split(" ")[0] : ""}!</h3>
      <p>Seu pedido já chegou no balcão do <strong>${LOJA.nome}</strong>.
         Em instantes a gente confirma por WhatsApp com o tempo de preparo.</p>
      <p class="confirmado-dica">Não abriu o WhatsApp? Toque no botão abaixo.</p>
      <a class="confirmado-btn" href="https://wa.me/${LOJA.whatsapp}" target="_blank" rel="noopener">Abrir o WhatsApp da loja</a>
      ${window.ultimoPedidoId ? `<a class="confirmado-btn confirmado-acompanhar" href="acompanhar.html?id=${window.ultimoPedidoId}">📍 Acompanhar meu pedido</a>` : ""}
      <button type="button" class="confirmado-fechar">Fechar</button>
    </div>`;
  document.body.appendChild(caixa);
  const sair = () => caixa.remove();
  caixa.querySelector(".confirmado-fechar").addEventListener("click", sair);
  caixa.addEventListener("click", e => { if (e.target === caixa) sair(); });
}

function avisoStatus(msg) {
  const st = $("[data-status]");
  if (st) { st.textContent = msg; st.dataset.erro = "true"; }
  return false;
}

/* ========================= status aberto / fechado =========================
   O horário manda, mas a loja pode abrir ou fechar na mão pelo painel.
   O estado é lido do servidor; se não der, vale o horário. */
let lojaNoManual = null;   // true = aberta na mão, false = fechada na mão

/* está aberta agora? o botão do painel manda; sem ele, vale o horário */
function lojaAbertaAgora() {
  const agora = new Date();
  const h = agora.getHours() + agora.getMinutes() / 60;
  const fechadoHoje = LOJA.diasFechados.includes(agora.getDay());
  const peloHorario = !fechadoHoje && (h >= LOJA.abre && h < LOJA.fecha);
  return {
    aberto: lojaNoManual === null ? peloHorario : lojaNoManual,
    fechadoHoje,
    naMao: lojaNoManual === false
  };
}

/* transforma 17.5 em "17h30", 23.6667 em "23h40" */
function horaFormatada(h) {
  const hi = Math.floor(h);
  const min = Math.round((h - hi) * 60);
  return min ? `${hi}h${String(min).padStart(2, "0")}` : `${hi}h`;
}

/* por que não dá para pedir agora, em uma frase curta e sem travessão */
function motivoFechado() {
  const e = lojaAbertaAgora();
  if (e.naMao) return "A loja está fechada no momento. Volte mais tarde.";
  if (e.fechadoHoje) return `Hoje a loja não abre. Voltamos às ${horaFormatada(LOJA.abre)}.`;
  return `Estamos fechados agora. Abrimos às ${horaFormatada(LOJA.abre)}.`;
}

/* liga e desliga o botão de enviar conforme a loja */
function travarEnvio() {
  const botao = $("[data-enviar]");
  if (!botao) return;
  const { aberto } = lojaAbertaAgora();
  botao.disabled = !aberto;
  botao.dataset.fechado = String(!aberto);
  botao.textContent = aberto ? (MESA_ATUAL ? "Enviar para a cozinha" : "Enviar pedido no WhatsApp") : motivoFechado();
}

function statusLoja() {
  const selo = $("[data-status-selo]");
  const txt = $("[data-status-texto]");
  const agora = new Date();
  const h = agora.getHours() + agora.getMinutes() / 60;
  const fechadoHoje = LOJA.diasFechados.includes(agora.getDay());
  const peloHorario = !fechadoHoje && (h >= LOJA.abre && h < LOJA.fecha);
  const aberto = lojaNoManual === null ? peloHorario : lojaNoManual;
  travarEnvio();
  if (!selo || !txt) return;   // restaurante.html não tem esse selo na tela

  selo.dataset.aberto = String(aberto);
  txt.textContent = aberto
    ? "Aberto agora"
    : lojaNoManual === false ? "Fechado no momento"
    : fechadoHoje ? `Fechado hoje. Abre às ${horaFormatada(LOJA.abre)}`
    : `Fechado. Abre às ${horaFormatada(LOJA.abre)}`;
}

/* ---- ajustes do cardápio feitos pelo dono no painel ----
   Preço, esgotado, nome, descrição e foto. Vêm por cima do cardápio do
   arquivo; se o servidor falhar, o arquivo continua valendo. */
async function lerCardapioAjustado() {
  if (!TEM_SERVIDOR) return;
  const url = urlServidor("cardapio");
  try {
    const r = await fetch(url, { cache: "no-store" });
    if (!r.ok) return;
    const d = await r.json();
    const itens = d && d.fields && d.fields.itens && d.fields.itens.mapValue;
    if (!itens || !itens.fields) return;

    let mudou = false;
    Object.keys(itens.fields).forEach(id => {
      const campos = (itens.fields[id].mapValue || {}).fields || {};
      const alvo = CARDAPIO.find(x => x.id === id);
      if (!alvo) return;
      if (campos.p && campos.p.doubleValue != null) { alvo.p = Number(campos.p.doubleValue); mudou = true; }
      if (campos.p && campos.p.integerValue != null) { alvo.p = Number(campos.p.integerValue); mudou = true; }
      if (campos.n && campos.n.stringValue) { alvo.n = campos.n.stringValue; mudou = true; }
      if (campos.d && campos.d.stringValue != null) { alvo.d = campos.d.stringValue; mudou = true; }
      if (campos.f && campos.f.stringValue) { alvo.f = campos.f.stringValue; mudou = true; }
      if (campos.foto && campos.foto.stringValue) { alvo.foto = campos.foto.stringValue; mudou = true; }
      alvo.off = !!(campos.off && campos.off.booleanValue);
      if (alvo.off) mudou = true;
    });

    guardarNoAparelho("cardapio", itens.fields);
    if (mudou && typeof montarCardapio === "function") montarCardapio();
  } catch (e) {
    /* servidor fora: usa a última versão boa guardada no aparelho, e na
       falta dela os preços do arquivo. O cardápio nunca some. */
    const guardado = lerDoAparelho("cardapio", 24 * 60 * 60 * 1000);
    if (!guardado) return;
    let mudou = false;
    Object.keys(guardado).forEach(id => {
      const campos = (guardado[id].mapValue || {}).fields || {};
      const alvo = CARDAPIO.find(x => x.id === id);
      if (!alvo) return;
      if (campos.p && campos.p.doubleValue != null) { alvo.p = Number(campos.p.doubleValue); mudou = true; }
      if (campos.n && campos.n.stringValue) { alvo.n = campos.n.stringValue; mudou = true; }
      if (campos.foto && campos.foto.stringValue) { alvo.foto = campos.foto.stringValue; mudou = true; }
      alvo.off = !!(campos.off && campos.off.booleanValue);
      if (alvo.off) mudou = true;
    });
    if (mudou && typeof montarCardapio === "function") montarCardapio();
  }
}

/* lê o interruptor da loja no servidor (leitura pública, sem biblioteca) */
/* guarda a última resposta boa do servidor, para o site continuar certo
   mesmo se o servidor ficar fora do ar na próxima consulta */
function guardarNoAparelho(chave, valor) {
  try { localStorage.setItem("reiburgao:" + chave, JSON.stringify({ v: valor, em: Date.now() })); } catch (e) {}
}
function lerDoAparelho(chave, validadeMs) {
  try {
    const g = JSON.parse(localStorage.getItem("reiburgao:" + chave) || "null");
    if (g && Date.now() - g.em < validadeMs) return g.v;
  } catch (e) {}
  return null;
}

async function lerEstadoLoja() {
  if (!TEM_SERVIDOR) return;
  const url = urlServidor("loja");
  try {
    const r = await fetch(url, { cache: "no-store" });
    if (!r.ok) return;
    const d = await r.json();
    const v = d && d.fields && d.fields.aberta;
    const dia = d && d.fields && d.fields.dia && d.fields.dia.stringValue;
    const ag = new Date();
    const hojeTxt = ag.getFullYear() + "-" + String(ag.getMonth() + 1).padStart(2, "0") +
      "-" + String(ag.getDate()).padStart(2, "0");
    /* O botão do painel vale para abrir OU fechar fora do horário, mas só
       no dia em que foi usado: no dia seguinte o site volta sozinho a
       seguir o horário normal, para ninguém esquecer a loja aberta de
       madrugada nem fechada na hora do movimento. */
    lojaNoManual = (dia === hojeTxt && v) ? v.booleanValue !== false : null;
    guardarNoAparelho("loja", { manual: lojaNoManual, dia: hojeTxt });
    travarEnvio();
  } catch (e) {
    /* servidor fora do ar: vale a última resposta boa de hoje, e na falta
       dela o horário normal. O site nunca fica quebrado por causa disso. */
    const ag = new Date();
    const hojeTxt = ag.getFullYear() + "-" + String(ag.getMonth() + 1).padStart(2, "0") +
      "-" + String(ag.getDate()).padStart(2, "0");
    const guardado = lerDoAparelho("loja", 12 * 60 * 60 * 1000);
    lojaNoManual = (guardado && guardado.dia === hojeTxt) ? guardado.manual : null;
    travarEnvio();
  }
  statusLoja();
}

/* ========================= efeitos ========================= */
function efeitos() {
  const topo = $("[data-topo]");
  const barra = $(".barra-progresso i");
  const onScroll = () => {
    topo.dataset.fixo = String(window.scrollY > 24);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    barra.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + "%";
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const io = new IntersectionObserver(es => {
    es.forEach(en => { if (en.isIntersecting) { en.target.classList.add("visivel"); io.unobserve(en.target); } });
  }, { threshold: .12, rootMargin: "0px 0px -8% 0px" });
  $$("[data-surge]").forEach(el => io.observe(el));
}

/* ========================= ligação ========================= */
document.addEventListener("DOMContentLoaded", () => {
  montarCardapio();
  pintarCarrinho();
  statusLoja();
  lerEstadoLoja();
  lerCardapioAjustado();
  setInterval(statusLoja, 60000);   // só relógio, não consulta nada

  /* As consultas ao servidor só acontecem com a aba à vista. Aba esquecida
     aberta a noite toda não fica consumindo a cota do plano gratuito, que é
     o que poderia derrubar o sistema num dia de movimento. */
  const consultarServidor = () => {
    if (document.visibilityState !== "visible") return;
    lerEstadoLoja();
    lerCardapioAjustado();
  };
  setInterval(consultarServidor, 300000);        // 5 minutos
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") consultarServidor();
  });
  efeitos();

  $$("[data-abrir-carrinho]").forEach(b => b.addEventListener("click", () => abrirCarrinho(true)));
  $("[data-fechar-carrinho]").addEventListener("click", () => abrirCarrinho(false));
  $("[data-veu]").addEventListener("click", () => abrirCarrinho(false));

  montarCombos();
  pintarFidelidade();

  const btCupom = $("[data-aplicar-cupom]");
  if (btCupom) btCupom.addEventListener("click", aplicarCupom);
  const cpCupom = $("[data-campo-cupom]");
  if (cpCupom) cpCupom.addEventListener("keydown", e => {
    if (e.key === "Enter") { e.preventDefault(); aplicarCupom(); }
  });
  $("[data-vitrine-combos]").addEventListener("click", e => {
    const b = e.target.closest("[data-item]");
    if (b) abrirModal(b.dataset.item);
  });

  $("[data-itens]").addEventListener("click", e => {
    const mais = e.target.closest("[data-mais]"), menos = e.target.closest("[data-menos]"), rem = e.target.closest("[data-remover]");
    if (mais) carrinho[+mais.dataset.mais].q++;
    else if (menos) { const i = +menos.dataset.menos; if (--carrinho[i].q <= 0) carrinho.splice(i, 1); }
    else if (rem) carrinho.splice(+rem.dataset.remover, 1);
    else return;
    salvar(); pintarCarrinho();
  });

  $("[data-fechar-modal]").addEventListener("click", fecharModal);
  $("[data-modal]").addEventListener("click", e => { if (e.target === $("[data-modal]")) fecharModal(); });
  $$("[data-qtd]").forEach(b => b.addEventListener("click", () => {
    qtdAtual = Math.max(1, Math.min(30, qtdAtual + Number(b.dataset.qtd)));
    atualizarModal();
  }));
  $("[data-modal-add]").addEventListener("click", adicionarDoModal);
  $("[data-modal-extras]").addEventListener("change", atualizarModal);

  document.addEventListener("keydown", e => {
    if (e.key !== "Escape") return;
    if (!$("[data-modal]").hidden) fecharModal();
    else abrirCarrinho(false);
  });

  const form = $("[data-checkout]");
  form.addEventListener("submit", enviarPedido);
  form.fone.addEventListener("input", e => { e.target.value = formatarFone(e.target.value); });
  const campos = $("[data-campos-entrega]"), troco = $("[data-campo-troco]");
  $$('input[name="tipo"]', form).forEach(r => r.addEventListener("change", () => {
    const modo = form.tipo.value;                    // Entrega | Retirada no balcão | No restaurante
    const entrega = modo === "Entrega";
    const mesa = modo === "No restaurante";
    campos.hidden = !entrega;
    $("[data-caixa-retirada]").hidden = entrega || mesa;
    $("[data-caixa-mesa]").hidden = !mesa;
    $(".aviso-taxa").hidden = !entrega;
    const opcCartao = [...form.pagamento.options].find(o => o.value.startsWith("Cartão"));
    if (opcCartao) {
      opcCartao.value = opcCartao.textContent =
        entrega ? "Cartão na entrega" : "Cartão";
    }
    atualizarTaxa();
  }));
  document.querySelector("[name=bairroOutro]").addEventListener("input", atualizarTaxa);
  document.querySelector("[name=endereco]").addEventListener("input", () => { pedirBairro(); pedirDistancia(); });
  document.querySelector("[name=numero]").addEventListener("input", pedirDistancia);
  const campoCep = document.querySelector("[name=cep]");
  campoCep.addEventListener("input", e => {
    e.target.value = formatarCep(e.target.value);
    if (soDigitos(e.target.value).length === 8) buscarCep();
  });
  montarEntrega();
  const prep = $("[data-preparo]");
  if (prep && LOJA.preparo) {
    prep.hidden = false;
    prep.textContent = `⏱️ Fica pronto em cerca de ${LOJA.preparo}`;
  }
  form.pagamento.addEventListener("change", () => { troco.hidden = form.pagamento.value !== "Dinheiro"; });

  /* QR Code do balcão (?modo=balcao): já abre com "Retirada no balcão"
     marcado, pra quem está pedindo no local sem precisar escolher */
  if (new URLSearchParams(location.search).get("modo") === "balcao") {
    const r = document.querySelector('input[name="tipo"][value="Retirada no balcão"]');
    if (r) { r.checked = true; r.dispatchEvent(new Event("change", { bubbles: true })); }
  }
});

/* ---- Pix na hora ---- */
(function(){
  const form = document.querySelector("[data-checkout]");
  const box = document.querySelector("[data-pix-box]");
  const chaveEl = document.querySelector("[data-pix-chave]");
  const btn = document.querySelector("[data-pix-copiar]");
  if(!form || !box) return;
  if(chaveEl) chaveEl.textContent = (typeof LOJA!=="undefined" && LOJA.pix) ? LOJA.pix : "";
  const toggle = () => { box.hidden = form.pagamento.value !== "Pix"; };
  form.pagamento.addEventListener("change", toggle); toggle();
  if(btn) btn.addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(LOJA.pix||""); btn.textContent="Copiado!"; setTimeout(()=>btn.textContent="Copiar",1500); }
    catch(e){ btn.textContent="Copie manualmente"; }
  });
})();

/* ---- Agendar pedido ---- */
(function(){
  const form = document.querySelector("[data-checkout]");
  if(!form || !form.agendar) return;
  const campo = form.querySelector("[data-agenda-quando]");
  form.agendar.addEventListener("change", ()=>{ campo.hidden = !form.agendar.checked; if(form.agendar.checked) campo.focus(); });
})();
