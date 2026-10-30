# Navegação

Um app de celular anda entre telas como uma pilha: abrir uma tela a empurra pela direita; voltar a desliza para fora. A StackUI tem três peças:

- `NavigationStack` anima a troca de telas quando o endereço muda.
- `NavigationBar` é o topo de cada tela: o título, o voltar e a barra de ferramentas.
- `TabBar` alterna entre as seções principais do app.

## Andando entre telas

`NavigationStack` não conhece o seu roteador. Passe o endereço atual e uma função que desenha um endereço. Aqui o endereço vem do hash da URL:

@example navigation-stack 420
```tsx
import { NavigationBar, NavigationStack, List, Row, Section } from "@stackui/react";

function Pessoas() {
  return (
    <>
      <NavigationBar title="Pessoas" />
      <List>
        <Section>
          <Row title="Ana" href="#/people/Ana" />
          <Row title="Leo" href="#/people/Leo" />
        </Section>
      </List>
    </>
  );
}

function Pessoa({ nome }: { nome: string }) {
  return <NavigationBar title={nome} backHref="#/people" backLabel="Voltar" />;
}

export function Telas() {
  const endereco = useHash(); // "/people" ou "/people/Ana"
  return (
    <NavigationStack
      location={endereco}
      render={(caminho) => (caminho.split("/")[2] ? <Pessoa nome={caminho.split("/")[2]} /> : <Pessoas />)}
    />
  );
}
```

A transição vem da profundidade do caminho: `/people` → `/people/Ana` empurra, o caminho de volta desliza para fora, e dois caminhos da mesma profundidade se cruzam (trocar de aba). A rolagem de cada endereço fica guardada.

## Com React Router

Passe o endereço ao `<Routes>`, para a tela que sai continuar desenhando a própria rota enquanto desliza, e use o `Link` pela prop `as`:

```tsx
import { Link, Route, Routes, useLocation } from "react-router";
import { NavigationStack, Row } from "@stackui/react";

function Moldura() {
  const { pathname } = useLocation();
  return (
    <NavigationStack
      location={pathname}
      render={(endereco) => (
        <Routes location={endereco}>
          <Route path="/pessoas" element={<Pessoas />} />
          <Route path="/pessoas/:nome" element={<Pessoa />} />
        </Routes>
      )}
    />
  );
}

// Uma linha que navega pelo roteador:
<Row title="Ana" as={Link} to="/pessoas/Ana" />
```

## Abas

Coloque a `TabBar` ao lado da pilha, fora dela, e esconda nas telas filhas:

```tsx
<TabBar
  selection={pathname.split("/")[1]}
  hidden={pathname.split("/").length > 2}
  label="Principal"
  items={[
    { id: "inicio", label: "Início", icon: <IconeCasa />, as: Link, props: { to: "/inicio" } },
    { id: "ajustes", label: "Ajustes", icon: <IconeEngrenagem />, as: Link, props: { to: "/ajustes" } },
  ]}
/>
```

> **Dica:** Deixe espaço no fim das telas para a barra de abas, cerca de 112 px.
