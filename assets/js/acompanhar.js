/* Acompanhar pedido — o cliente vê o status ao vivo pelo link ?id=... */
import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getFirestore, doc, onSnapshot } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";
import { FIREBASE_CONFIG } from "./firebase-config.js";
const app = getApps().length ? getApp() : initializeApp(FIREBASE_CONFIG);
const db = getFirestore(app);
const $ = s => document.querySelector(s);
const id = new URLSearchParams(location.search).get("id");

if (!id) {
  $("[data-sub]").textContent = "Abra o link de acompanhamento que aparece depois de fazer o pedido.";
} else {
  onSnapshot(doc(db, "pedidos", id), snap => {
    if (!snap.exists()) { $("[data-sub]").textContent = "Pedido não encontrado."; return; }
    const p = snap.data();
    const st = p.status === "preparo" ? "preparo" : p.status === "pronto" ? "pronto" : "novo";
    $("[data-linha]").hidden = false;
    $("[data-card]").hidden = false;
    const textos = {
      novo: "Seu pedido foi recebido pela loja 🎉",
      preparo: "Sua comida está sendo preparada 🔥",
      pronto: "Seu pedido está pronto! 🛵"
    };
    $("[data-sub]").textContent = textos[st];
    // acende os passos
    const ordem = ["novo","preparo","pronto"];
    const atual = ordem.indexOf(st);
    document.querySelectorAll("[data-passo]").forEach((el,i) => el.classList.toggle("on", i <= atual));
    if ($("[data-barra]")) $("[data-barra]").style.width = atual >= 1 ? "100%" : "0";
    if ($("[data-barra2]")) $("[data-barra2]").style.width = atual >= 2 ? "100%" : "0";
    $("[data-card]").innerHTML = `<div class="ac-itens">${(p.texto||"").split(/\n|•/).map(s=>s.trim()).filter(Boolean).map(l=>`<div>${l.replace(/\s*[-—]\s*R\$.*/i,"")}</div>`).join("")}</div>`;
  }, () => { $("[data-sub]").textContent = "Não consegui acompanhar agora. Tente recarregar."; });
}
