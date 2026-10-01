# Pizzaria modelo — decisões travadas

Cada linha aqui foi pedida pelo Matheus e **não muda sem ordem dele**.

Última revisão: 23/09/2026

## Para que serve

Modelo de demonstração de pizzaria, para vender de porta em porta no comércio.
A pizzaria Nonna Rosa é fictícia. Quando fechar uma pizzaria de verdade, copia-se
esta pasta e trocam-se os dados, nunca se trabalha em cima do modelo.

## Como vende

- **Valor único, sem mensalidade.** Site por R$ 750, ferramenta (painel do dono)
  por R$ 1.000, os dois por R$ 1.750. Entrada de 50% antes de começar e entrega
  em 5 dias.
- O sistema é do comércio. Se ele parar de falar com a Criasiteweb, continua
  funcionando. É o oposto do que fazem Cliente Fiel, Pedidosite e Wabiz.

## Regras travadas

- **WhatsApp de todos os modelos é o da Criasiteweb: (11) 99451-6869.** Número
  pessoal não entra em modelo. Ordem do Matheus em 23/09/2026.
- **Meio a meio não tem taxa.** Cobra-se o preço do sabor mais caro, na mesma
  tela do tamanho, sem categoria separada. É justamente onde os concorrentes
  atrapalham o cliente.
- **Foto grande em todo item.** As fotos atuais são provisórias, de banco de
  imagem gratuito, e serão trocadas pelas que o Matheus está preparando.
- **Nada de mensalidade embutida.** Página publicada de graça e servidor no
  plano gratuito.

## Ligação com o servidor

O site só conversa com o servidor quando `PROJETO_SERVIDOR`, no começo de
`assets/js/app.js`, deixa de ser `TROCAR`.

Isso foi criado em 23/09/2026 por causa de um defeito encontrado no modelo base:
o endereço do servidor do Rei Burgão estava fixo dentro do programa, e a cópia
da pizzaria começou a mostrar **o cardápio real do Rei Burgão** (bebidas
desligadas pelo dono e preço de suco editado por ele apareceram no site da
pizzaria). Ficou isolado, e o mesmo conserto precisa ser feito na pasta do
modelo base, o que depende de ordem do Matheus.

## Pendências

1. Criar o espaço no servidor (Firebase) para o painel funcionar na demonstração.
2. Trocar as fotos pelas que o Matheus está editando.
3. Trocar o cardápio de exemplo pelo que ele vai passar.
4. Publicar o site num endereço para abrir no celular.
5. Corrigir o mesmo defeito do servidor na pasta do modelo base.
