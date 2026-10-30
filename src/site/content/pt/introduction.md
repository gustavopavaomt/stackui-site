# Introdução

StackUI é um conjunto de componentes React para criar aplicativos PWA com cara e jeito de app nativo no iOS e no Android: telas que deslizam, folhas que fecham arrastando, listas agrupadas, avisos, seletores e listas de milhares de linhas que não travam.

Você escreve React como sempre. A StackUI entrega as peças de um app de celular já desenhadas, animadas e acessíveis, para que um app instalado pelo navegador pareça em casa ao lado dos apps da loja.

## Como usar esta documentação

Comece pelo **Básico**, em ordem: cada página continua a anterior, de instalar o pacote até um app completo. Depois use **Componentes** como referência: cada componente tem um exemplo rodando, o código para copiar e a lista de props.

> **Dica:** Todos os exemplos destas páginas estão rodando. Toque, arraste, digite. O que você vê é o código ao lado, funcionando.

## O que você precisa

- React 19 (`react` e `react-dom`). É a única dependência.
- Qualquer empacotador que importe CSS, como Vite ou Next.js.
- Qualquer roteador, ou nenhum. A StackUI não importa nenhum.

## Sua primeira tela

Esta é uma tela completa. As próximas páginas explicam cada parte.

@example first-screen 360
```tsx
import { useState } from "react";
import { List, NavigationBar, Row, Section, Toggle } from "@stackui/react";

export function Ajustes() {
  const [avisos, setAvisos] = useState(true);
  return (
    <>
      <NavigationBar title="Ajustes" />
      <List>
        <Section header="Geral" footer="Você pode mudar isso quando quiser.">
          <Row title="Notificações"
            accessory={<Toggle isOn={avisos} onChange={setAvisos} label="Notificações" />} />
          <Row title="Idioma" value="Português" href="/idioma" />
        </Section>
      </List>
    </>
  );
}
```

Agora, [instale a StackUI](/docs/installation) no seu projeto.
