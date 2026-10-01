/* =========================================================
   Forno Nobre — Pix que confirma sozinho
   Criasiteweb

   O site NÃO guarda chave nenhuma do Mercado Pago. Ele só
   pede ao cofre (função protegida no Cloudflare) que gere a
   cobrança e depois pergunta se já caiu.

   Regra da casa: isto é um ganho, nunca um ponto de falha.
   Se o cofre não responder, o cliente volta para o Pix na mão,
   com a chave e o comprovante no WhatsApp, exatamente como antes.
   ========================================================= */

const COFRE = "https://cofre-pix.criasitesite.workers.dev";

/* de quanto em quanto tempo perguntamos se o Pix caiu, e por quanto tempo */
const INTERVALO = 4000;        /* 4 segundos */
const DESISTIR_EM = 10 * 60 * 1000;  /* 10 minutos */

const esperar = ms => new Promise(r => setTimeout(r, ms));
const dinheiro = v => (Number(v) || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

/* monta a tela do Pix dentro da caixa que já existe no carrinho */
function telaPix(caixa, { copiaECola, qrCodeImagem, valor }) {
  caixa.innerHTML = `
    <div class="pix-topo">Pague o Pix para confirmar o pedido</div>
    ${qrCodeImagem ? `<img class="pix-qr" src="${qrCodeImagem}" alt="QR Code do Pix" />` : ""}
    <div class="pix-chave"><code data-pix-codigo>${copiaECola || ""}</code>
      <button type="button" class="pix-copiar" data-pix-copiar>Copiar</button></div>
    <small>Abra o aplicativo do seu banco, escolha Pix copia e cola e pague
      ${dinheiro(valor)}. Assim que cair, o pedido é enviado sozinho.</small>
    <p class="pix-aguardando" data-pix-aviso role="status" aria-live="polite">
      Aguardando o pagamento…</p>
    <button type="button" class="botao" data-pix-desistir>Pagar de outro jeito</button>
  `;
  const btn = caixa.querySelector("[data-pix-copiar]");
  btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(copiaECola || "");
      btn.textContent = "Copiado!";
      setTimeout(() => btn.textContent = "Copiar", 1500);
    } catch (e) { btn.textContent = "Copie na mão"; }
  });
}

/* devolve a caixa ao estado antigo, com a chave do dono e o comprovante */
function telaManual(caixa, chave) {
  caixa.innerHTML = `
    <div class="pix-topo">Pague no Pix e agilize seu pedido</div>
    <div class="pix-chave"><code>${chave || ""}</code>
      <button type="button" class="pix-copiar" data-pix-copiar>Copiar</button></div>
    <small>Depois de pagar, mande o comprovante no WhatsApp junto com o pedido.</small>
  `;
  const btn = caixa.querySelector("[data-pix-copiar]");
  if (btn) btn.addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(chave || ""); btn.textContent = "Copiado!"; }
    catch (e) { btn.textContent = "Copie na mão"; }
  });
}

/* Gera a cobrança e fica perguntando até cair.
   Devolve "pago", "desistiu" ou "indisponivel". */
window.cobrarPixAutomatico = async function (valor, pedidoRef) {
  const caixa = document.querySelector("[data-pix-box]");
  if (!caixa) return "indisponivel";

  const chaveAntiga = (typeof LOJA !== "undefined" && LOJA.pix) ? LOJA.pix : "";
  caixa.hidden = false;

  let cobranca;
  try {
    const r = await fetch(COFRE + "/cobranca", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ valor, pedidoId: pedidoRef })
    });
    cobranca = await r.json();
    if (!r.ok || !cobranca.copiaECola) throw new Error("cofre sem copia e cola");
  } catch (err) {
    console.warn("Pix automático fora do ar, voltando para o Pix na mão:", err);
    telaManual(caixa, chaveAntiga);
    return "indisponivel";
  }

  telaPix(caixa, { ...cobranca, valor });
  caixa.scrollIntoView({ block: "center", behavior: "smooth" });

  let desistiu = false;
  caixa.querySelector("[data-pix-desistir]").addEventListener("click", () => { desistiu = true; });

  const aviso = caixa.querySelector("[data-pix-aviso]");
  const comecou = Date.now();

  while (!desistiu && Date.now() - comecou < DESISTIR_EM) {
    await esperar(INTERVALO);
    if (desistiu) break;
    /* aba escondida não consulta, para não gastar à toa */
    if (document.visibilityState !== "visible") continue;
    try {
      const r = await fetch(COFRE + "/status?txid=" + encodeURIComponent(cobranca.txid));
      const d = await r.json();
      if (d.pago) {
        aviso.textContent = "Pagamento confirmado. Enviando seu pedido…";
        aviso.dataset.pago = "true";
        return "pago";
      }
    } catch (err) {
      /* uma falha de rede no meio não derruba nada: tenta de novo no próximo giro */
    }
  }

  if (desistiu) {
    telaManual(caixa, chaveAntiga);
    return "desistiu";
  }
  aviso.textContent = "O tempo do Pix acabou. Gere o pedido de novo ou pague de outro jeito.";
  return "desistiu";
};
