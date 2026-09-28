# NodeVueNux

Aplicação de estudo do ecossistema **Node.js + Vue 3 + Nuxt**, estilizada com **Tailwind CSS** e **daisyUI**.

## Páginas

| Rota        | Descrição                                                            |
| ----------- | -------------------------------------------------------------------- |
| `/`         | Página inicial (hero + cards de apresentação da stack)               |
| `/sobre`    | Explicação da estrutura de diretórios do Nuxt                        |
| `/cadastro` | Formulário de cadastro de novo membro com validação e feedback visual |

### Formulário de cadastro (`app/pages/cadastro.vue`)

- **Nome completo** – obrigatório, exige nome e sobrenome
- **E-mail** – obrigatório, valida formato
- **Curso / Área** – select
- **Semestre** – select (1º ao 10º)
- **Interesses** – checkboxes (pelo menos um)
- **Bio** – textarea com limite de 200 caracteres e contador
- **Cadastrar** – mostra alerta de sucesso, registra os dados no console (`console.table`), adiciona o membro na lista lateral e limpa os campos

Tudo feito com Composition API (`ref`, `reactive`, `computed`) e `v-model`. Há também uma pré-visualização que atualiza em tempo real enquanto o formulário é preenchido.

## Como rodar

Pré-requisito: [Node.js](https://nodejs.org/) 20 ou superior.

```bash
npm install
npm run dev
```

Acesse http://localhost:3000.

### Build de produção

```bash
npm run build
npm run preview
```

## Estrutura

```
app/
├── app.vue              # raiz: <NuxtLayout> + <NuxtPage>
├── assets/css/main.css  # Tailwind + daisyUI
├── components/          # AppNavbar, AppFooter, FeatureCard (auto-importados)
├── layouts/default.vue  # navbar + conteúdo + rodapé
└── pages/               # roteamento baseado em arquivos
    ├── index.vue
    ├── sobre.vue
    └── cadastro.vue
nuxt.config.ts
```
