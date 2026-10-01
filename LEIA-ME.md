# Pizzaria Nonna Rosa — modelo de demonstração da Criasiteweb

Site e sistema de pedidos completos, montados em cima do modelo base
(o sistema do Rei Burgão), adaptados para pizzaria. Serve para o Matheus
mostrar de porta em porta o que a Criasiteweb entrega, e vira a base de
qualquer pizzaria que fechar.

A pizzaria é fictícia. Nome, endereço e avaliações são de exemplo. O
WhatsApp é o do Matheus de propósito: o pedido de demonstração cai no
celular dele na frente do dono da loja.

## O que este modelo faz a mais que o de lanchonete

- **Tamanho por pizza:** broto, média, grande e família, cada um com o
  seu preço, definido sabor por sabor.
- **Meio a meio de verdade:** na mesma tela, sem categoria separada. O
  preço cobrado é o do sabor mais caro, que é como a região trabalha.
  Broto aceita 1 sabor, média e grande aceitam 2, família aceita 3.
- **Borda recheada e massa** (tradicional ou fina) como opção paga.
- **Promoções** com preço fechado, em que o cliente escolhe os sabores
  na hora do pedido.
- **Cupom de desconto:** por porcentagem, por valor em reais ou entrega
  grátis, com valor mínimo de pedido. Quando falta pouco para o cupom
  valer, o site avisa quanto falta, o que empurra o pedido para cima.
- **Cartão de fidelidade com selos:** a cada pedido feito pelo site o
  cliente ganha um selo, e ao completar o cartão o pedido já sai avisando
  a loja de que ele tem direito ao prêmio.
- **Balcão com pizza por tamanho:** no painel, cada sabor vira um botão
  por tamanho, então o atendente clica em "Calabresa Grande" e o preço
  entra certo, sem digitar nada.

## O que já vinha pronto do modelo base

Cardápio com foto, carrinho, taxa por bairro e por distância, endereço
pelo CEP, selo de aberto e fechado pelo horário, pedido indo para o
WhatsApp e para o painel ao mesmo tempo, painel do dono com pedido ao
vivo e som, comanda de balcão, impressão em 80 mm, caixa do dia,
relatório do mês e edição do cardápio pelo próprio dono.

## O que falta para o painel funcionar

O painel do dono precisa de um espaço próprio no servidor, criado de
graça no Firebase com uma conta Google. Enquanto isso não for feito:

- O site funciona normalmente e o pedido chega no WhatsApp.
- O painel não recebe pedido nenhum.

São dois lugares para trocar quando o espaço for criado:

1. `assets/js/firebase-config.js` — as chaves do projeto.
2. `assets/js/app.js` — a linha `const PROJETO_SERVIDOR = "TROCAR";`,
   que precisa receber o mesmo nome de projeto.

**Atenção:** enquanto estiver escrito `TROCAR`, o site não consulta
servidor nenhum, de propósito. Nunca deixar aí o projeto de outro
cliente, senão este site passa a mostrar o cardápio do cliente errado.

## Onde mudar as coisas

| O que | Onde |
|---|---|
| Nome, WhatsApp, endereço, horário, taxas por bairro | começo de `assets/js/app.js`, bloco `LOJA` |
| Coordenada da loja (cálculo de distância) | `assets/js/app.js`, `LOJA_COORD` |
| Tamanhos, bordas, massas, adicionais | começo de `assets/js/cardapio.js` |
| Sabores e preços | `assets/js/cardapio.js`, bloco `CARDAPIO` |
| Cupons | `assets/js/cardapio.js`, bloco `CUPONS` |
| Cartão fidelidade (meta e prêmio) | `assets/js/cardapio.js`, bloco `FIDELIDADE` |
| Fotos | `assets/img/fotos/` |
| Cores e fontes | `assets/css/estilo.css` |
| Textos da página | `index.html` |

## Cupons que já vêm cadastrados

- `NONNA10` — 10% de desconto em pedidos a partir de R$ 60,00.
- `PRIMEIRA` — R$ 8,00 de desconto em pedidos a partir de R$ 50,00.
- `ENTREGAGRATIS` — entrega grátis em pedidos a partir de R$ 90,00.
