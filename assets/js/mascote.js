/* Mascote animado — Cria Site. Arquivo isolado, não interfere no resto. */
const masc=document.querySelector("[data-mascote]");
const balao=document.querySelector("[data-balao]");
if(masc){
  const frases=["Bora pedir?","Tá com fome?","Monta sua pizza","Borda grátis hoje"];
  let i=0;
  const mostra=()=>{masc.classList.add("mostrar");setTimeout(()=>masc.classList.remove("mostrar"),3200);};
  setTimeout(mostra,2500);
  setInterval(()=>{i=(i+1)%frases.length;if(balao)balao.textContent=frases[i];mostra();},12000);
  masc.addEventListener("click",()=>{
    (document.querySelector("[data-cardapio]")||document.querySelector("main"))
      ?.scrollIntoView({behavior:"smooth",block:"start"});
  });
}
