# Modelo de sistema de pedidos — base da Criasiteweb

Guardado em 21/09/2026, a partir do sistema pronto e entregue da Lanchonete
Rei Burgão (Suzano/SP). **Esta pasta é o ponto de partida de qualquer programa
novo que o Matheus pedir.** Não se mexe nela para atender cliente: copia-se
para uma pasta nova com o nome do cliente e trabalha-se na cópia.

## O que já vem pronto aqui

**Site do cliente (a página que o comprador vê)**
- Cardápio com foto em todos os itens, preço e descrição.
- Carrinho com quantidade, observação por item e cálculo de troco.
- Checkout que manda o pedido para o WhatsApp da loja e, ao mesmo tempo,
  para o painel do dono.
- Taxa de entrega por bairro, mais cálculo por distância quando o bairro não
  está na lista.
- Endereço preenchido pelo CEP.
- Selo de aberto/fechado pelo horário, e bloqueio do envio quando fechado.
- Botões de mapa (Google Maps e Waze) apontando para o endereço escrito.
- Carrinho que se esvazia depois do envio e vale 3 horas se não for enviado.
- Funciona mesmo com o servidor fora do ar: o cardápio continua aparecendo.

**Painel do dono (a tela de trabalho do balcão)**
- Pedidos chegando ao vivo, com alerta sonoro alto e aviso no título da aba.
- Abas de fluxo: novo, em preparo, saiu para entrega, concluído.
- Botão de avisar o cliente pelo WhatsApp em cada etapa.
- Comandas de balcão, várias abertas ao mesmo tempo, com forma de pagamento
  e troco.
- Impressão em papel de 80 mm, em uma página só.
- Caixa do dia, histórico e relatório do mês (faturamento, motoboy,
  mercadoria, sobra limpa).
- Calendário que vira o ano sozinho, sem precisar de programação.
- Abrir e fechar a loja na mão.
- Edição do cardápio pelo próprio dono (preço, descrição, itens).
- Troca de senha pelo dono.
- Login protegido.

**Blindagens já feitas (não refazer do zero)**
- Consulta ao servidor a cada 5 minutos e só com a aba à vista, para não
  estourar a cota do plano gratuito.
- Envio do pedido tenta 3 vezes se a internet oscilar.
- Aviso "SEM INTERNET" no painel, com reconexão automática.
- Faixa amarela quando o navegador bloqueia o som do alerta.
- Faixa vermelha com botão de recarregar se alguma coisa travar a tela.
- Memória do aparelho cheia: limpa o descartável e avisa, em vez de perder
  comanda em silêncio.

## O que trocar em cada cliente novo

1. **Dados da loja** — nome, WhatsApp, endereço, horário de abrir e fechar,
   dias fechados e tempo de preparo. Tudo junto, no começo do arquivo
   `assets/js/app.js`, no bloco `LOJA`.
2. **Coordenada da loja** — no mesmo arquivo, `LOJA_COORD`, usada para
   calcular a distância da entrega.
3. **Tabela de taxas por bairro** — dentro do bloco `LOJA`, em `entrega`.
4. **Cardápio** — `assets/js/cardapio.js` (o dono também edita pelo painel).
5. **Fotos** — `assets/img/fotos/`, mais `logo.png`, `favicon.png` e
   `compartilhar.jpg`. **Apagar as fotos do Rei Burgão** e pôr as do cliente.
6. **Cores e identidade** — `assets/css/estilo.css`.
7. **Conta do servidor** — `assets/js/firebase-config.js`, `firebase.json` e
   `firestore.rules`: cada cliente tem o seu próprio espaço.
8. **Apagar o histórico de teste** antes de entregar, pela opção de preparar
   o sistema no fim do painel.
9. **Crédito no rodapé** — "Criado por Criasiteweb", agora com link para o
   site da empresa.
10. **Documentação** — reescrever `LEIA-ME.md` e começar um `DECISOES.md`
    novo, com as ordens daquele cliente.

## Como o Rei Burgão ficou (referência)

Os arquivos `LEIA-ME.md` e `DECISOES.md` que estão nesta pasta são os do Rei
Burgão. Servem de exemplo do padrão de anotação: cada ordem do Matheus vira
decisão travada, com data, e não se mexe no que já foi aprovado.

Site no ar: https://criasiteweb.github.io/reiburgao/
Painel: https://criasiteweb.github.io/reiburgao/painel.html
