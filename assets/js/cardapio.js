/* =========================================================
   Forno Nobre — Cardápio (dados)
   Criasiteweb

   Cardápio real da pizzaria (Rua Pedro Rípoli, 104 — Barro Branco
   — sua cidade), passado pelo Matheus em 25/09/2026.

   Fica num arquivo só, usado pelo site do cliente (index.html)
   e pela comanda do balcão dentro do painel (painel.html).
   Mudou o preço aqui, muda nos dois lugares.
   ========================================================= */

/* ---------- tamanho ----------
   Broto (1 sabor) e Grande (meio a meio com 2 sabores). */
const TAMANHOS = [
  { id: "broto",  n: "Broto",  d: "4 fatias", sabores: 2 },
  { id: "grande", n: "Grande", d: "8 fatias", sabores: 2 }
];

/* ---------- borda ----------
   Borda de catupiry é grátis em todas as pizzas. Bordas recheadas
   (doces ou catupiry original) custam R$ 10,00 à parte. */
const BORDA_GRATIS = { n: "Borda de catupiry (grátis)", p: 0 };
const BORDA_SEM    = { n: "Sem borda recheada", p: 0 };
const BORDAS_SALGADA = [
  BORDA_GRATIS,
  { n: "Borda recheada — Catupiry original", p: 10.00 },
  BORDA_SEM
];
const BORDAS_DOCE = [
  { n: "Borda recheada — Chocolate",        p: 10.00 },
  { n: "Borda recheada — Chocolate branco", p: 10.00 },
  { n: "Borda recheada — Creme de avelã",   p: 10.00 },
  BORDA_SEM
];

/* ---------- acréscimos da pizza ---------- */
const ADD_PIZZA = [
  { n: "Requeijão (metade)",         p: 7.00 },
  { n: "Requeijão (inteira)",        p: 14.00 },
  { n: "Catupiry original (metade)", p: 9.00 },
  { n: "Catupiry original (inteira)",p: 18.00 }
];

/* acréscimo dos lanches */
const ADD_LANCHE = [
  { n: "Presunto", p: 3.00 },
  { n: "Queijo",   p: 3.00 },
  { n: "Catupiry", p: 3.00 },
  { n: "Cheddar",  p: 3.00 },
  { n: "Bacon",    p: 3.00 }
];

/* ---- regras da casa ----
   Meio a meio grande: cobra o valor do sabor mais caro.
   Meio a meio broto: cobra o valor do sabor mais caro + R$ 1,00.
   "A Moda do Freguês" permite escolher 5 ingredientes, exceto
   carne seca, costela e catupiry original. */
const TAXA_MEIO_A_MEIO_BROTO = 1.00;

/* ---- grupos do cardápio ---- */
const GRUPOS = [
  { id: "promocoes", rotulo: "Promoção",      titulo: "Promoção",       nota: "Promoção por tempo indeterminado, direto do folheto da casa." },
  { id: "salgadas",  rotulo: "Salgadas",     titulo: "Pizzas salgadas", nota: "68 sabores. Toque num sabor pra escolher o tamanho e, se quiser, fazer meio a meio (vale até com sabor doce). Meio a meio cobra o valor do sabor mais caro no Grande, e + R$ 1,00 no Broto. Todas com borda de catupiry grátis." },
  { id: "doces",     rotulo: "Doces",        titulo: "Pizzas doces",   nota: "31 sabores. Meio a meio vale com outro doce ou até com um salgado." },
  { id: "lanches",   rotulo: "Lanches",      titulo: "Lanches",        nota: "Acréscimo de R$ 3,00 cada: presunto, queijo, catupiry, cheddar e bacon." },
  { id: "pasteis",   rotulo: "Pastéis",      titulo: "Pastéis",        nota: "" },
  { id: "pasteisdoces", rotulo: "Pastéis doces", titulo: "Pastéis doces", nota: "" },
  { id: "porcoes",   rotulo: "Porções",      titulo: "Porções",        nota: "" },
  { id: "refrigerantes", rotulo: "Refrigerantes", titulo: "Refrigerantes", nota: "" },
  { id: "cervejas",  rotulo: "Cervejas",     titulo: "Cervejas",       nota: "" },
  { id: "sucos",     rotulo: "Sucos",        titulo: "Sucos",          nota: "" },
  { id: "jarras",    rotulo: "Jarras",       titulo: "Jarras",         nota: "" },
  { id: "bebidas",   rotulo: "Drinks",       titulo: "Drinks e bebidas alcoólicas", nota: "" }
];

/* Ingredientes pra montar "A Moda do Freguês" (item s5), tirados do que
   já é usado nas outras pizzas do cardápio, menos carne seca, costela e
   catupiry original (regra da casa). */
const INGREDIENTES_FREGUES = [
  "Alho", "Aliche", "Atum", "Bacon", "Batata", "Brócolis", "Calabresa",
  "Catupiry", "Cebola", "Champignon", "Cheddar", "Ervilha", "Escarola",
  "Frango", "Gorgonzola", "Manjericão", "Milho", "Mussarela", "Orégano",
  "Ovo", "Palmito", "Parmesão", "Presunto", "Requeijão", "Tomate"
];

/* ---- itens ----
   pz: true   -> é pizza (abre meio a meio, borda e massa)
   t:         -> preço por tamanho (broto/grande)
   p:         -> preço fixo (lanches, pastéis, porções, bebidas, promoção)
   f:         -> nome do arquivo da foto em assets/img/fotos/
*/
const CARDAPIO = [
  { id:"promo50", g:"promocoes", n:"Pizza Grande por R$ 55,00", d:"Escolha entre Baiana, Brócolis, Calabresa, Mussarela, Presuntão e Princesa I. Meio a meio entre esses sabores também vale, e a borda de catupiry continua grátis.", p:55.00, pzcombo:"grande", sabores:["s11","s14","s17","s45","s52","s53"], tag:"Promoção", f:"promo-50" },
  { id:"s1", g:"salgadas", n:"01 · Alho", d:"Mussarela, alho frito e orégano.", pz:true, t:{broto:29.00, grande:56.00}, add:"pizza", f:"sem-foto" },
  { id:"s2", g:"salgadas", n:"02 · Aliche", d:"Mussarela e aliche.", pz:true, t:{broto:29.50, grande:57.00}, add:"pizza", f:"sem-foto" },
  { id:"s3", g:"salgadas", n:"03 · A Moda da Casa", d:"Escarola, presunto, palmito, ervilha, bacon, parmesão e mussarela.", pz:true, t:{broto:32.00, grande:62.00}, add:"pizza", f:"sem-foto" },
  { id:"s4", g:"salgadas", n:"04 · A Moda do Chefe", d:"Calabresa, presunto, ervilha, bacon, mussarela e palmito.", pz:true, t:{broto:32.00, grande:62.00}, add:"pizza", f:"sem-foto" },
  { id:"s5", g:"salgadas", n:"05 · A Moda do Freguês", d:"5 ingredientes à escolha, exceto carne seca, costela e catupiry original.", pz:true, t:{broto:34.50, grande:67.00}, add:"pizza", f:"sem-foto", escolherIngredientes:5 },
  { id:"s6", g:"salgadas", n:"06 · A Moda do Jack", d:"Escarola, bacon, parmesão, gorgonzola, alho e manjericão.", pz:true, t:{broto:30.50, grande:59.00}, add:"pizza", f:"sem-foto" },
  { id:"s7", g:"salgadas", n:"07 · Atum I", d:"Atum e cebola.", pz:true, t:{broto:30.50, grande:59.00}, add:"pizza", f:"sem-foto" },
  { id:"s8", g:"salgadas", n:"08 · Atum II", d:"Atum, cebola e mussarela.", pz:true, t:{broto:31.50, grande:61.00}, add:"pizza", f:"sem-foto" },
  { id:"s9", g:"salgadas", n:"09 · Bacon", d:"Mussarela, bacon e cebola.", pz:true, t:{broto:30.50, grande:59.00}, add:"pizza", f:"sem-foto" },
  { id:"s10", g:"salgadas", n:"10 · Baiacatu", d:"Calabresa moída, cebola, pimenta e catupiry.", pz:true, t:{broto:29.50, grande:57.00}, add:"pizza", f:"sem-foto" },
  { id:"s11", g:"salgadas", n:"11 · Baiana", d:"Calabresa moída, ovos e pimenta.", pz:true, t:{broto:28.50, grande:55.00}, add:"pizza", f:"sem-foto" },
  { id:"s12", g:"salgadas", n:"12 · Batata I", d:"Presunto picado, batata frita, cheddar e parmesão.", pz:true, t:{broto:31.50, grande:63.00}, add:"pizza", f:"salgada-s12" },
  { id:"s13", g:"salgadas", n:"13 · Batata II", d:"Batata, bacon, parmesão e requeijão.", pz:true, t:{broto:33.50, grande:65.00}, add:"pizza", f:"sem-foto" },
  { id:"s14", g:"salgadas", n:"14 · Brócolis", d:"Brócolis refogado, bacon e mussarela.", pz:true, t:{broto:28.50, grande:55.00}, add:"pizza", f:"sem-foto" },
  { id:"s15", g:"salgadas", n:"15 · Brócolis Cremoso", d:"Brócolis, bacon e requeijão.", pz:true, t:{broto:31.50, grande:61.00}, add:"pizza", f:"sem-foto" },
  { id:"s16", g:"salgadas", n:"16 · Caipira", d:"Frango, bacon, milho e mussarela.", pz:true, t:{broto:32.00, grande:62.00}, add:"pizza", f:"salgada-s16" },
  { id:"s17", g:"salgadas", n:"17 · Calabresa", d:"Calabresa fatiada e cebola.", pz:true, t:{broto:28.50, grande:55.00}, add:"pizza", f:"salgada-s17", tag:"Mais pedida" },
  { id:"s18", g:"salgadas", n:"18 · Calacatu", d:"Calabresa, cebola e catupiry.", pz:true, t:{broto:29.50, grande:57.00}, add:"pizza", f:"sem-foto" },
  { id:"s19", g:"salgadas", n:"19 · Calamussa", d:"Calabresa, mussarela e cebola.", pz:true, t:{broto:29.50, grande:57.00}, add:"pizza", f:"salgada-s19" },
  { id:"s20", g:"salgadas", n:"20 · Carne Seca I", d:"Carne seca, milho e catupiry.", pz:true, t:{broto:33.50, grande:65.00}, add:"pizza", f:"sem-foto" },
  { id:"s21", g:"salgadas", n:"21 · Carne Seca II", d:"Carne seca, milho e mussarela.", pz:true, t:{broto:33.50, grande:65.00}, add:"pizza", f:"sem-foto" },
  { id:"s22", g:"salgadas", n:"22 · Costela", d:"Costela, barbecue, bacon e mussarela.", pz:true, t:{broto:33.50, grande:65.00}, add:"pizza", f:"salgada-s22" },
  { id:"s23", g:"salgadas", n:"23 · Costela 2", d:"Costela desfiada, cebola roxa, pimenta biquinho, mussarela, requeijão e barbecue.", pz:true, t:{broto:36.00, grande:70.00}, add:"pizza", f:"sem-foto" },
  { id:"s24", g:"salgadas", n:"24 · Dogão", d:"Mussarela, salsicha, milho, ervilha, batata palha, cheddar e catupiry.", pz:true, t:{broto:32.50, grande:63.00}, add:"pizza", f:"sem-foto" },
  { id:"s25", g:"salgadas", n:"25 · Doritos I", d:"Carne moída, cheddar e Doritos.", pz:true, t:{broto:31.00, grande:60.00}, add:"pizza", f:"sem-foto" },
  { id:"s26", g:"salgadas", n:"26 · Doritos II", d:"Carne moída, cheddar, Doritos e pimenta.", pz:true, t:{broto:31.00, grande:60.00}, add:"pizza", f:"sem-foto" },
  { id:"s27", g:"salgadas", n:"27 · Frango Crocante", d:"Frango desfiado, cheddar e batata palha.", pz:true, t:{broto:31.00, grande:60.00}, add:"pizza", f:"salgada-s27" },
  { id:"s28", g:"salgadas", n:"28 · Frango I", d:"Frango desfiado, cebola e catupiry.", pz:true, t:{broto:29.00, grande:56.00}, add:"pizza", f:"salgada-s28", tag:"Campeã" },
  { id:"s29", g:"salgadas", n:"29 · Frango II", d:"Frango desfiado, cebola e mussarela.", pz:true, t:{broto:29.00, grande:56.00}, add:"pizza", f:"sem-foto" },
  { id:"s30", g:"salgadas", n:"30 · Frango III", d:"Frango desfiado, cebola, catupiry e mussarela.", pz:true, t:{broto:30.50, grande:59.00}, add:"pizza", f:"sem-foto" },
  { id:"s31", g:"salgadas", n:"31 · Frango IV", d:"Frango, cebola e requeijão.", pz:true, t:{broto:33.50, grande:65.00}, add:"pizza", f:"sem-foto" },
  { id:"s32", g:"salgadas", n:"32 · Francesa", d:"Presunto, champignon e mussarela.", pz:true, t:{broto:29.50, grande:57.00}, add:"pizza", f:"sem-foto" },
  { id:"s33", g:"salgadas", n:"33 · Florença", d:"Carne moída à bolonhesa e catupiry.", pz:true, t:{broto:30.50, grande:59.00}, add:"pizza", f:"sem-foto" },
  { id:"s34", g:"salgadas", n:"34 · Gorgonzola", d:"Mussarela e gorgonzola.", pz:true, t:{broto:30.50, grande:59.00}, add:"pizza", f:"sem-foto" },
  { id:"s35", g:"salgadas", n:"35 · Italiana", d:"Calabresa, cebola, mussarela e bacon.", pz:true, t:{broto:31.50, grande:61.00}, add:"pizza", f:"sem-foto" },
  { id:"s36", g:"salgadas", n:"36 · Japonesa", d:"Atum, aliche, cebola e mussarela.", pz:true, t:{broto:32.00, grande:62.00}, add:"pizza", f:"sem-foto" },
  { id:"s37", g:"salgadas", n:"37 · Jardim", d:"Palmito, cebola e mussarela.", pz:true, t:{broto:31.50, grande:61.00}, add:"pizza", f:"sem-foto" },
  { id:"s38", g:"salgadas", n:"38 · Lasanha", d:"Presunto, carne moída à bolonhesa, milho e mussarela.", pz:true, t:{broto:32.00, grande:62.00}, add:"pizza", f:"sem-foto" },
  { id:"s39", g:"salgadas", n:"39 · Lombo I", d:"Lombo, cebola e catupiry.", pz:true, t:{broto:31.50, grande:61.00}, add:"pizza", f:"sem-foto" },
  { id:"s40", g:"salgadas", n:"40 · Lombo II", d:"Lombo, cebola e mussarela.", pz:true, t:{broto:31.50, grande:61.00}, add:"pizza", f:"sem-foto" },
  { id:"s41", g:"salgadas", n:"41 · Mista", d:"Presunto, calabresa, cebola e mussarela.", pz:true, t:{broto:31.50, grande:61.00}, add:"pizza", f:"sem-foto" },
  { id:"s42", g:"salgadas", n:"42 · Margherita", d:"Mussarela, tomate, molho e manjericão.", pz:true, t:{broto:29.50, grande:57.00}, add:"pizza", f:"sem-foto" },
  { id:"s43", g:"salgadas", n:"43 · Milho I", d:"Milho e catupiry.", pz:true, t:{broto:31.00, grande:60.00}, add:"pizza", f:"sem-foto" },
  { id:"s44", g:"salgadas", n:"44 · Milho II", d:"Milho e mussarela.", pz:true, t:{broto:31.00, grande:60.00}, add:"pizza", f:"sem-foto" },
  { id:"s45", g:"salgadas", n:"45 · Mussarela", d:"Mussarela e tomate.", pz:true, t:{broto:28.50, grande:55.00}, add:"pizza", f:"salgada-s45" },
  { id:"s46", g:"salgadas", n:"46 · Mussarela Crocante", d:"Batata palha, bacon e mussarela.", pz:true, t:{broto:31.50, grande:61.00}, add:"pizza", f:"salgada-s46" },
  { id:"s47", g:"salgadas", n:"47 · Namorados", d:"Mussarela, palmito, champignon e catupiry.", pz:true, t:{broto:31.50, grande:61.00}, add:"pizza", f:"sem-foto" },
  { id:"s48", g:"salgadas", n:"48 · Napolitana", d:"Mussarela, tomate, molho e parmesão.", pz:true, t:{broto:29.50, grande:57.00}, add:"pizza", f:"salgada-s48" },
  { id:"s49", g:"salgadas", n:"49 · Pepperoni", d:"Mussarela e pepperoni.", pz:true, t:{broto:33.50, grande:65.00}, add:"pizza", f:"sem-foto" },
  { id:"s50", g:"salgadas", n:"50 · Peruana", d:"Atum, cebola, ervilha e mussarela.", pz:true, t:{broto:32.00, grande:62.00}, add:"pizza", f:"sem-foto" },
  { id:"s51", g:"salgadas", n:"51 · Pipinela", d:"Mussarela, lombo, champignon e bacon.", pz:true, t:{broto:32.00, grande:62.00}, add:"pizza", f:"sem-foto" },
  { id:"s52", g:"salgadas", n:"52 · Presuntão", d:"Presunto picado com mussarela.", pz:true, t:{broto:28.50, grande:55.00}, add:"pizza", f:"sem-foto" },
  { id:"s53", g:"salgadas", n:"53 · Princesa I", d:"Escarola, bacon e catupiry.", pz:true, t:{broto:28.50, grande:55.00}, add:"pizza", f:"sem-foto" },
  { id:"s54", g:"salgadas", n:"54 · Princesa II", d:"Escarola, bacon, aliche e mussarela.", pz:true, t:{broto:29.00, grande:56.00}, add:"pizza", f:"sem-foto" },
  { id:"s55", g:"salgadas", n:"55 · Ponto Chic", d:"Presunto, tomate e mussarela.", pz:true, t:{broto:29.50, grande:57.00}, add:"pizza", f:"salgada-s55" },
  { id:"s56", g:"salgadas", n:"56 · Portuguesa", d:"Presunto, ervilha, ovo, milho, cebola e mussarela.", pz:true, t:{broto:29.50, grande:57.00}, add:"pizza", f:"sem-foto" },
  { id:"s57", g:"salgadas", n:"57 · 2 Queijos", d:"Mussarela e catupiry.", pz:true, t:{broto:29.50, grande:57.00}, add:"pizza", f:"sem-foto" },
  { id:"s58", g:"salgadas", n:"58 · 3 Queijos", d:"Mussarela, parmesão e provolone.", pz:true, t:{broto:30.00, grande:58.00}, add:"pizza", f:"sem-foto" },
  { id:"s59", g:"salgadas", n:"59 · 4 Queijos", d:"Mussarela, parmesão, provolone e catupiry.", pz:true, t:{broto:30.50, grande:59.00}, add:"pizza", f:"salgada-s59" },
  { id:"s60", g:"salgadas", n:"60 · 5 Queijos", d:"Mussarela, parmesão, provolone, catupiry e gorgonzola.", pz:true, t:{broto:31.00, grande:60.00}, add:"pizza", f:"sem-foto" },
  { id:"s61", g:"salgadas", n:"61 · Rúcula", d:"Rúcula, mussarela e tomate.", pz:true, t:{broto:30.50, grande:59.00}, add:"pizza", f:"sem-foto" },
  { id:"s62", g:"salgadas", n:"62 · Toscana", d:"Calabresa, tomate e mussarela.", pz:true, t:{broto:29.50, grande:57.00}, add:"pizza", f:"sem-foto" },
  { id:"s63", g:"salgadas", n:"63 · Troiana", d:"Mussarela, lombo, bacon, parmesão e catupiry.", pz:true, t:{broto:32.00, grande:62.00}, add:"pizza", f:"salgada-s63" },
  { id:"s64", g:"salgadas", n:"64 · Troiana 2", d:"Mussarela, lombo, bacon, parmesão e requeijão.", pz:true, t:{broto:34.00, grande:66.00}, add:"pizza", f:"salgada-s64" },
  { id:"s65", g:"salgadas", n:"65 · Vegetariana", d:"Escarola, milho, ervilha, champignon e mussarela.", pz:true, t:{broto:30.00, grande:58.00}, add:"pizza", f:"sem-foto" },
  { id:"s66", g:"salgadas", n:"66 · Veneza", d:"Presunto picado, milho, palmito, bacon e mussarela.", pz:true, t:{broto:32.00, grande:62.00}, add:"pizza", f:"sem-foto" },
  { id:"s67", g:"salgadas", n:"67 · Forno Nobre", d:"Mussarela, lombo, champignon, bacon, milho e catupiry.", pz:true, t:{broto:32.00, grande:62.00}, add:"pizza", f:"sem-foto" },
  { id:"s68", g:"salgadas", n:"68 · Volkolver", d:"Presunto, milho, bacon, cheddar, frango, batata palha e mussarela.", pz:true, t:{broto:33.50, grande:65.00}, add:"pizza", f:"sem-foto" },
  { id:"d1", g:"doces", n:"01 · Abacaxi 1", d:"Abacaxi, leite condensado e canela.", pz:true, t:{broto:28.00, grande:54.00}, f:"doce-d1" },
  { id:"d2", g:"doces", n:"02 · Abacaxi 2", d:"Abacaxi e doce de leite.", pz:true, t:{broto:28.00, grande:54.00}, f:"doce-d2" },
  { id:"d3", g:"doces", n:"03 · Banana", d:"Catupiry, banana, canela e leite condensado.", pz:true, t:{broto:26.00, grande:50.00}, f:"doce-d3" },
  { id:"d4", g:"doces", n:"04 · Banana Nevada", d:"Banana, chocolate branco e canela.", pz:true, t:{broto:28.00, grande:54.00}, f:"doce-d4" },
  { id:"d5", g:"doces", n:"05 · Banoff", d:"Banana, doce de leite e marshmallow.", pz:true, t:{broto:28.00, grande:54.00}, f:"doce-d5" },
  { id:"d6", g:"doces", n:"06 · Beijinho", d:"Beijinho.", pz:true, t:{broto:27.00, grande:52.00}, f:"doce-d6" },
  { id:"d7", g:"doces", n:"07 · Brigadeiro", d:"Chocolate granulado.", pz:true, t:{broto:27.00, grande:52.00}, f:"doce-d7" },
  { id:"d8", g:"doces", n:"08 · Chocobol I", d:"Chocolate ao leite.", pz:true, t:{broto:27.00, grande:52.00}, f:"doce-d8" },
  { id:"d9", g:"doces", n:"09 · Chocobol II", d:"Chocolate branco.", pz:true, t:{broto:28.00, grande:54.00}, f:"doce-d9" },
  { id:"d10", g:"doces", n:"10 · Chocolate", d:"Chocolate.", pz:true, t:{broto:26.00, grande:50.00}, f:"doce-d10" },
  { id:"d11", g:"doces", n:"11 · Chocolate Branco", d:"Chocolate branco.", pz:true, t:{broto:27.50, grande:53.00}, f:"doce-d11" },
  { id:"d12", g:"doces", n:"12 · Confete I", d:"Chocolate ao leite.", pz:true, t:{broto:27.00, grande:52.00}, f:"doce-d12" },
  { id:"d13", g:"doces", n:"13 · Confete II", d:"Chocolate branco.", pz:true, t:{broto:28.00, grande:54.00}, f:"doce-d13" },
  { id:"d14", g:"doces", n:"14 · Creme de Avelã", d:"Creme de avelã.", pz:true, t:{broto:27.00, grande:52.00}, f:"doce-d14" },
  { id:"d15", g:"doces", n:"15 · Floresta Negra", d:"Chocolate granulado e cereja.", pz:true, t:{broto:28.00, grande:54.00}, f:"doce-d15" },
  { id:"d16", g:"doces", n:"16 · Kit Kat", d:"Kit Kat.", pz:true, t:{broto:30.00, grande:58.00}, f:"doce-d16" },
  { id:"d17", g:"doces", n:"17 · Maracujá", d:"Chocolate branco e maracujá.", pz:true, t:{broto:29.50, grande:57.00}, f:"doce-d17" },
  { id:"d18", g:"doces", n:"18 · Mineira", d:"Doce de leite e mussarela.", pz:true, t:{broto:28.00, grande:54.00}, add:"pizza", f:"doce-d18" },
  { id:"d19", g:"doces", n:"19 · Morango", d:"Morango e chocolate.", pz:true, t:{broto:29.00, grande:56.00}, f:"doce-d19" },
  { id:"d20", g:"doces", n:"20 · Ouro Branco I", d:"Chocolate ao leite e Ouro Branco.", pz:true, t:{broto:28.50, grande:55.00}, f:"doce-d20" },
  { id:"d21", g:"doces", n:"21 · Ouro Branco II", d:"Chocolate branco e Ouro Branco.", pz:true, t:{broto:28.50, grande:55.00}, f:"doce-d21" },
  { id:"d22", g:"doces", n:"22 · Ovomaltine", d:"Chocolate e Ovomaltine.", pz:true, t:{broto:28.50, grande:55.00}, f:"doce-d22" },
  { id:"d23", g:"doces", n:"23 · Paçoca I", d:"Doce de leite e paçoca.", pz:true, t:{broto:27.00, grande:52.00}, f:"doce-d23" },
  { id:"d24", g:"doces", n:"24 · Paçoca II", d:"Chocolate e paçoca.", pz:true, t:{broto:28.00, grande:54.00}, f:"doce-d24" },
  { id:"d25", g:"doces", n:"25 · Prestígio", d:"Chocolate com coco.", pz:true, t:{broto:27.00, grande:52.00}, f:"doce-d25" },
  { id:"d26", g:"doces", n:"26 · Queijadinha", d:"Mussarela, coco ralado e leite condensado.", pz:true, t:{broto:28.00, grande:54.00}, add:"pizza", f:"doce-d26" },
  { id:"d27", g:"doces", n:"27 · Romeu e Julieta I", d:"Goiabada e mussarela.", pz:true, t:{broto:27.00, grande:52.00}, add:"pizza", f:"doce-d27" },
  { id:"d28", g:"doces", n:"28 · Sedução", d:"Banana e chocolate.", pz:true, t:{broto:28.00, grande:54.00}, f:"doce-d28" },
  { id:"d29", g:"doces", n:"29 · Sonho de Valsa I", d:"Chocolate ao leite.", pz:true, t:{broto:28.50, grande:55.00}, f:"doce-d29" },
  { id:"d30", g:"doces", n:"30 · Sonho de Valsa II", d:"Chocolate branco.", pz:true, t:{broto:28.50, grande:55.00}, f:"doce-d30" },
  { id:"d31", g:"doces", n:"31 · Uva", d:"Chocolate e uva.", pz:true, t:{broto:28.50, grande:55.00}, f:"doce-d31" },
  { id:"l1", g:"lanches", n:"Hambúrguer", d:"Hambúrguer, cebola, maionese, ketchup e mostarda.", p:19.50, add:"lanche", f:"lanche-hamburguer" },
  { id:"l2", g:"lanches", n:"X-Burguer", d:"Hambúrguer, queijo, cebola, maionese, ketchup e mostarda.", p:20.50, add:"lanche", f:"lanche-burguer" },
  { id:"l3", g:"lanches", n:"X-Salada", d:"Hambúrguer, queijo, alface, tomate, cebola, maionese, ketchup e mostarda.", p:22.50, add:"lanche", f:"lanche-salada" },
  { id:"l4", g:"lanches", n:"X-Egg Bacon", d:"Hambúrguer, ovo, bacon, cebola, maionese, ketchup e mostarda.", p:23.50, add:"lanche", f:"lanche-egg" },
  { id:"l5", g:"lanches", n:"X-Egg", d:"Hambúrguer, ovo, queijo, cebola, maionese, ketchup e mostarda.", p:22.50, add:"lanche", f:"lanche-egg" },
  { id:"l6", g:"lanches", n:"X-Egg Salada", d:"Hambúrguer, ovo, queijo, alface, tomate, cebola, maionese, ketchup e mostarda.", p:23.50, add:"lanche", f:"lanche-egg-bacon" },
  { id:"l7", g:"lanches", n:"X-Bacon", d:"Hambúrguer, queijo, bacon, cebola, maionese, ketchup e mostarda.", p:22.50, add:"lanche", f:"lanche-bacon" },
  { id:"l8", g:"lanches", n:"X-Bacon Salada", d:"Hambúrguer, bacon, queijo, alface, tomate, cebola, maionese, ketchup e mostarda.", p:23.50, add:"lanche", f:"lanche-bacon" },
  { id:"l9", g:"lanches", n:"X-Bacon Egg Salada", d:"Hambúrguer, ovo, bacon, queijo, alface, tomate, cebola, maionese, ketchup e mostarda.", p:25.00, add:"lanche", f:"lanche-egg-bacon" },
  { id:"l10", g:"lanches", n:"X-Tudo", d:"Hambúrguer, bacon, ovo, presunto, queijo, alface, tomate, cebola, maionese, ketchup e mostarda.", p:26.50, add:"lanche", f:"lanche-tudo" },
  { id:"pa1", g:"pasteis", n:"Carne", d:"", p:13.00, f:"pastel-real" },
  { id:"pa2", g:"pasteis", n:"Queijo", d:"", p:13.00, f:"pastel-real" },
  { id:"pa3", g:"pasteis", n:"Frango com Catupiry", d:"", p:13.00, f:"pastel-real" },
  { id:"pa4", g:"pasteis", n:"Calabresa", d:"", p:13.00, f:"pastel-real" },
  { id:"pa5", g:"pasteis", n:"Bauru", d:"", p:13.00, f:"pastel-real" },
  { id:"pa6", g:"pasteis", n:"Pizza", d:"", p:13.00, f:"pastel-real" },
  { id:"pa7", g:"pasteis", n:"Carne, Queijo e Ovo", d:"", p:15.00, f:"pastel-real" },
  { id:"pa8", g:"pasteis", n:"Portuguesa", d:"Presunto, ovo, milho, ervilha e mussarela.", p:17.00, f:"pastel-real" },
  { id:"pd1", g:"pasteisdoces", n:"Chocolate", d:"", p:14.00, f:"pastel-real" },
  { id:"pd2", g:"pasteisdoces", n:"Creme de Avelã", d:"", p:14.00, f:"pastel-real" },
  { id:"pd3", g:"pasteisdoces", n:"Sonho de Valsa", d:"", p:15.00, f:"pastel-real" },
  { id:"pd4", g:"pasteisdoces", n:"Ouro Branco", d:"", p:15.00, f:"pastel-real" },
  { id:"po1", g:"porcoes", n:"Anéis de Cebola", d:"", p:30.00, f:"porcao-po1" },
  { id:"po2", g:"porcoes", n:"Azeitona", d:"", p:25.00, f:"porcao-po2" },
  { id:"po3", g:"porcoes", n:"Batata Frita", d:"", p:30.00, f:"porcao-po3" },
  { id:"po4", g:"porcoes", n:"Batata Frita com Cheddar e Bacon", d:"", p:37.00, f:"porcao-po4" },
  { id:"po5", g:"porcoes", n:"Calabresa", d:"", p:35.00, f:"porcao-po5" },
  { id:"po6", g:"porcoes", n:"Frango Frito", d:"", p:35.00, f:"porcao-po6" },
  { id:"po7", g:"porcoes", n:"Provolone", d:"", p:35.00, f:"porcao-po7" },
  { id:"po8", g:"porcoes", n:"Mega Porção", d:"Frango à passarinho, calabresa acebolada, fritas com cheddar e bacon e anéis de cebola.", p:100.00, f:"porcao-po8" },
  { id:"b1", g:"bebidas", n:"Amarula", d:"", p:15.00, f:"bebida-b1" },
  { id:"b2", g:"bebidas", n:"Bombeirinho 51 ou Velho Barreiro", d:"", p:6.00, f:"bebida-b2" },
  { id:"b3", g:"bebidas", n:"Caipirinha Vodka", d:"", p:12.00, f:"bebida-b3" },
  { id:"b4", g:"bebidas", n:"Caipirinha Smirnoff", d:"", p:18.00, f:"bebida-b4" },
  { id:"b5", g:"bebidas", n:"Caipirinha de Vinho", d:"", p:15.00, f:"bebida-b5" },
  { id:"b6", g:"bebidas", n:"Caipirinha 51 ou Velho Barreiro", d:"", p:8.50, f:"bebida-b6" },
  { id:"b7", g:"bebidas", n:"Campari", d:"", p:10.00, f:"bebida-b7" },
  { id:"b8", g:"bebidas", n:"Catuaba", d:"", p:6.00, f:"bebida-b8" },
  { id:"b9", g:"bebidas", n:"Conhaque Dreher", d:"", p:6.00, f:"bebida-b9" },
  { id:"b10", g:"bebidas", n:"Conhaque Dreher com Cacau", d:"", p:6.00, f:"bebida-b10" },
  { id:"b11", g:"bebidas", n:"Conhaque Domeq", d:"", p:8.00, f:"bebida-b11" },
  { id:"b12", g:"bebidas", n:"Conhaque Dreher Mel e Limão", d:"", p:6.00, f:"sem-foto" },
  { id:"b13", g:"bebidas", n:"Contini", d:"", p:6.00, f:"bebida-b13" },
  { id:"b14", g:"bebidas", n:"Cynar", d:"", p:6.00, f:"bebida-b14" },
  { id:"b15", g:"bebidas", n:"Espanhola", d:"", p:15.00, f:"sem-foto" },
  { id:"b16", g:"bebidas", n:"Empremidinha Vodka", d:"", p:10.00, f:"sem-foto" },
  { id:"b17", g:"bebidas", n:"Empremidinha Smirnoff", d:"", p:12.00, f:"sem-foto" },
  { id:"b18", g:"bebidas", n:"Empremidinha 51 ou Velho Barreiro", d:"", p:6.00, f:"sem-foto" },
  { id:"b19", g:"bebidas", n:"Kariri com Mel e Limão", d:"", p:6.00, f:"sem-foto" },
  { id:"b20", g:"bebidas", n:"Maria Mole", d:"", p:6.00, f:"sem-foto" },
  { id:"b21", g:"bebidas", n:"Menta", d:"", p:6.00, f:"bebida-b21" },
  { id:"b22", g:"bebidas", n:"Martini", d:"", p:7.00, f:"bebida-b22" },
  { id:"b23", g:"bebidas", n:"Montila", d:"", p:8.00, f:"bebida-b23" },
  { id:"b24", g:"bebidas", n:"Pinga 51 ou Velho Barreiro", d:"", p:4.00, f:"bebida-b24" },
  { id:"b25", g:"bebidas", n:"Paratudo", d:"", p:5.00, f:"sem-foto" },
  { id:"b26", g:"bebidas", n:"São Francisco", d:"", p:6.00, f:"bebida-b26" },
  { id:"b27", g:"bebidas", n:"Vinho Taça", d:"", p:10.00, f:"bebida-b27" },
  { id:"b28", g:"bebidas", n:"Vinho ½ Litro", d:"", p:17.00, f:"sem-foto" },
  { id:"b29", g:"bebidas", n:"Vinho Litro", d:"", p:34.00, f:"bebida-b29" },
  { id:"b30", g:"bebidas", n:"Vodka", d:"", p:7.00, f:"bebida-b30" },
  { id:"b31", g:"bebidas", n:"Vodka Smirnoff", d:"", p:9.00, f:"sem-foto" },
  { id:"b32", g:"bebidas", n:"Ypioca", d:"", p:5.00, f:"bebida-b32" },
  { id:"b33", g:"bebidas", n:"Steinhaeger", d:"", p:7.00, f:"bebida-b33" },

  /* ---- bebidas novas (25/09/2026), ACRESCENTADAS às de cima, não substituem ---- */
  { id:"refri1", g:"refrigerantes", n:"Refrigerante lata", d:"", p:8.00, f:"refri1",
    opcoes:["Coca-Cola","Fanta Uva","Fanta Laranja","Soda","Guaraná"] },
  { id:"refri2", g:"refrigerantes", n:"Coca-Cola 2 litros", d:"", p:19.00, f:"refri2" },
  { id:"refri3", g:"refrigerantes", n:"Coca-Cola 1 litro", d:"", p:12.00, f:"refri3" },
  { id:"refri4", g:"refrigerantes", n:"Tubaína garrafa KS 600 ml", d:"", p:7.00, f:"refri-tubaina" },
  { id:"refri5", g:"refrigerantes", n:"Fanta 2 litros", d:"", p:15.00, f:"refri5" },
  { id:"refri6", g:"refrigerantes", n:"Guaraná Antarctica 2 litros", d:"", p:15.00, f:"refri6" },
  { id:"refri7", g:"refrigerantes", n:"Dolly 2 litros", d:"", p:10.00, f:"refri7" },
  { id:"refri8", g:"refrigerantes", n:"H2O", d:"", p:10.00, f:"refri8" },
  { id:"refri9", g:"refrigerantes", n:"Água com gás", d:"", p:5.00, f:"refri9" },
  { id:"refri10", g:"refrigerantes", n:"Água sem gás", d:"", p:4.00, f:"sem-foto" },
  { id:"refri11", g:"refrigerantes", n:"Schweppes Citrus lata", d:"", p:8.00, f:"refri11" },
  { id:"refri12", g:"refrigerantes", n:"Schweppes Tônica lata", d:"", p:8.00, f:"refri12" },

  { id:"cerv1", g:"cervejas", n:"Brahma Duplo Malte — garrafa 600 ml", d:"", p:12.00, f:"cerv1" },
  { id:"cerv2", g:"cervejas", n:"Skol — garrafa 600 ml", d:"", p:12.00, f:"cerv2" },
  { id:"cerv3", g:"cervejas", n:"Heineken — garrafa 600 ml", d:"", p:18.00, f:"cerv3" },
  { id:"cerv4", g:"cervejas", n:"Original — garrafa 600 ml", d:"", p:15.00, f:"cerv4" },
  { id:"cerv5", g:"cervejas", n:"Skol — lata", d:"", p:8.00, f:"cerv5" },
  { id:"cerv6", g:"cervejas", n:"Brahma Duplo Malte — lata", d:"", p:8.00, f:"cerv6" },
  { id:"cerv7", g:"cervejas", n:"Heineken — lata", d:"", p:9.00, f:"cerv7" },

  { id:"suco1", g:"sucos", n:"Suco natural com água", d:"", p:9.00, f:"suco1",
    opcoes:["Abacaxi","Abacaxi com hortelã","Acerola","Goiaba","Laranja","Manga","Maracujá","Morango"] },
  { id:"suco2", g:"sucos", n:"Suco natural com leite", d:"", p:10.00, f:"suco2",
    opcoes:["Abacaxi","Abacaxi com hortelã","Acerola","Goiaba","Laranja","Manga","Maracujá","Morango"] },
  { id:"suco3", g:"sucos", n:"Laranja natural", d:"", p:10.00, f:"suco3" },

  { id:"jarra1", g:"jarras", n:"Jarra 500 ml", d:"", p:15.00, f:"jarra1",
    opcoes:["Abacaxi","Abacaxi com hortelã","Acerola","Goiaba","Laranja","Manga","Maracujá","Morango"] },
  { id:"jarra2", g:"jarras", n:"Jarra 1 litro", d:"", p:25.00, f:"jarra2",
    opcoes:["Abacaxi","Abacaxi com hortelã","Acerola","Goiaba","Laranja","Manga","Maracujá","Morango"] },
];

/* ---- cupons ----
   Aguardando o Matheus confirmar se continuam valendo com o
   cardápio novo. Mantidos como estavam até ele decidir. */
const CUPONS = [
  { codigo: "PRIMEIRA",      tipo: "valor",      valor: 8,  minimo: 50 },
  { codigo: "ENTREGAGRATIS", tipo: "frete",      valor: 0,  minimo: 90 }
];

/* ---- fidelidade ----
   Tirado do site por pedido do Matheus em 25/09/2026 (ideia guardada
   pro futuro, não fica ativo na Forno Nobre por enquanto). */
const FIDELIDADE = { ativa: false, meta: 10, premio: "Uma pizza broto grátis" };

/* ---- taxas de entrega por bairro ----
   Tabela real passada pelo Matheus em 25/09/2026. */
const TAXAS_ENTREGA_BAIRRO = {
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
  "Vila Belmiro": 12.00,
};

