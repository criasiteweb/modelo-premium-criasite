/* =========================================================
   Forno Nobre — login opcional do cliente com o Google
   Criasiteweb

   Nunca obrigatório: quem não quiser logar continua pedindo
   normal, preenchendo o formulário na mão. Quem logar tem os
   dados preenchidos sozinhos da próxima vez, e um histórico
   dos próprios pedidos guardado na conta dele (só ele lê).
   ========================================================= */

import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import {
  getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";
import {
  getFirestore, doc, getDoc, setDoc, collection, addDoc, serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";
import { FIREBASE_CONFIG } from "./firebase-config.js";

/* outros arquivos da mesma página (envio.js, mesa.js) também iniciam o
   Firebase — reaproveita o mesmo app em vez de iniciar de novo */
const app = getApps().length ? getApp() : initializeApp(FIREBASE_CONFIG);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

async function entrar() {
  try { await signInWithPopup(auth, provider); }
  catch (e) {
    console.error("login Google:", e && e.code, e && e.message);
    if (e && e.code === "auth/popup-blocked") {
      alert("O navegador bloqueou a janela de login. Permita pop-ups pra esse site e tente de novo.");
    } else if (e && e.code === "auth/cancelled-popup-request") {
      // usuário clicou duas vezes rápido, ou fechou a janela: não precisa avisar
    } else if (e && e.code === "auth/popup-closed-by-user") {
      // fechou a janela sem terminar: silencioso, não é erro
    } else {
      alert("Não consegui entrar com o Google agora (" + (e && e.code || "erro desconhecido") + "). Tente de novo.");
    }
  }
}
function sair() { signOut(auth); }

async function carregarPerfil(uid) {
  try {
    const d = await getDoc(doc(db, "clientes", uid));
    return d.exists() ? d.data() : null;
  } catch (e) { return null; }
}

/* chamada pelo app.js depois que um pedido é enviado, se o cliente
   estiver logado — guarda os dados pra próxima vez e um resumo no
   histórico dele */
window.salvarPedidoCliente = async function (dados) {
  const uid = window.clienteGoogleUid;
  if (!uid) return;
  try {
    await setDoc(doc(db, "clientes", uid), {
      nome: dados.nome || "", fone: dados.fone || "",
      endereco: dados.endereco || "", numero: dados.numero || "",
      complemento: dados.complemento || "", bairro: dados.bairro || "",
      atualizadoEm: serverTimestamp()
    }, { merge: true });
    await addDoc(collection(db, "clientes", uid, "pedidos"), {
      resumo: (dados.resumo || "").slice(0, 300),
      total: Number(dados.total) || 0,
      criadoEm: serverTimestamp()
    });
  } catch (e) { /* conta salva mesmo sem o histórico não trava o pedido */ }
};

function preencherFormulario(perfil) {
  const f = document.querySelector("[data-checkout]");
  if (!f || !perfil) return;
  if (f.nome && !f.nome.value) f.nome.value = perfil.nome || "";
  if (f.fone && !f.fone.value) f.fone.value = perfil.fone || "";
  if (f.endereco && !f.endereco.value) f.endereco.value = perfil.endereco || "";
  if (f.numero && !f.numero.value) f.numero.value = perfil.numero || "";
  if (f.complemento && !f.complemento.value) f.complemento.value = perfil.complemento || "";
}

onAuthStateChanged(auth, async user => {
  const areaEntrar = document.querySelector("[data-login-google]");
  const areaConta = document.querySelector("[data-conta-google]");
  if (!areaEntrar || !areaConta) return;   // página sem essa área

  if (user) {
    window.clienteGoogleUid = user.uid;
    areaEntrar.hidden = true;
    areaConta.hidden = false;
    const nomeEl = document.querySelector("[data-conta-nome]");
    if (nomeEl) nomeEl.textContent = (user.displayName || user.email || "sua conta").split(" ")[0];
    preencherFormulario(await carregarPerfil(user.uid));
  } else {
    window.clienteGoogleUid = null;
    areaEntrar.hidden = false;
    areaConta.hidden = true;
  }
});

document.addEventListener("click", e => {
  if (e.target.closest("[data-entrar-google]")) entrar();
  if (e.target.closest("[data-sair-google]")) sair();
});
