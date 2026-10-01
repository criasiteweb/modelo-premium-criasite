/* =========================================================
   Forno Nobre — envio do pedido da mesa (restaurante.html)
   Criasiteweb

   Cada pedido feito pelo cliente na mesa vira um documento em
   "pedidos_mesa". O painel escuta essa fila, soma os itens na
   comanda daquela mesa (aba Balcão) e marca como importado.
   Não passa pelo WhatsApp e não pede forma de pagamento aqui:
   a conta é fechada depois, com o garçom.
   ========================================================= */

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp }
  from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";
import { FIREBASE_CONFIG } from "./firebase-config.js";

const db = getFirestore(initializeApp(FIREBASE_CONFIG));

const limitar = (s, n) => String(s == null ? "" : s).slice(0, n);
const esperar = ms => new Promise(r => setTimeout(r, ms));

window.enviarPedidoMesa = async function (dados, tentativa = 1) {
  try {
    const itens = (dados.itens || []).slice(0, 100).map(i => ({
      nome: limitar(i.nome, 120),
      qtd: Number(i.qtd) || 1,
      preco: Number(i.preco) || 0,
      escolhas: limitar((i.escolhas || []).join(" · "), 300),
      adds: limitar((i.adds || []).join(", "), 200),
      obs: limitar(i.obs, 200)
    }));
    await addDoc(collection(db, "pedidos_mesa"), {
      mesa: Number(dados.mesa),
      cliente: limitar(dados.cliente, 80),
      itens,
      total: Number(dados.total) || 0,
      status: "novo",
      criadoEm: serverTimestamp()
    });
    return true;
  } catch (err) {
    if (tentativa < 3) {
      await esperar(tentativa * 1200);
      return window.enviarPedidoMesa(dados, tentativa + 1);
    }
    console.warn("Pedido da mesa não chegou ao painel:", err);
    return false;
  }
};
