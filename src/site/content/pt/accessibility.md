# Acessibilidade

A StackUI usa a coisa de verdade: botões são botões, links são links, uma folha é um diálogo modal, um seletor segmentado é um grupo de rádios. Leitores de tela, teclados e acionadores funcionam sem código a mais.

## O que você ganha

- Folhas e alertas prendem o foco, fecham com Esc e devolvem o foco a quem os abriu.
- Botões só com ícone recebem um `label` que o leitor de tela anuncia.
- Chaves, seletores e contadores anunciam o próprio estado.
- Toda animação respeita a opção **Reduzir movimento**.
- As áreas de toque têm pelo menos 44 pontos, como pedem as diretrizes das plataformas.

## O que você faz

- Dê um `label` a todo `ToolbarButton`, `Toggle`, `Picker` e `Stepper`.
- Escreva um `alt` para imagens com significado, e `alt=""` para as decorativas.
- Traduza os textos padrão (`closeLabel`, `loadingLabel`…) quando o app não for em inglês.

> **Nota:** A cor nunca é o único sinal. Um `Badge` sempre tem palavras, e um erro sempre tem mensagem.
