# NodeVueNux

Atividade prática do ecossistema **Node.js + Vue 3 + Nuxt 4**, estilizada com **Tailwind CSS** e **daisyUI**.

- **Parte A:** reprodução do projeto do vídeo de Nuxt (`HeroLP`, `WindowLP`, página `/example`, módulos `@nuxt/eslint`, `@nuxt/fonts`, `@nuxt/hints`, `@nuxt/icon`, `@nuxt/image` e `@nuxtjs/seo`).
- **Parte B:** nova página `/cadastro` com formulário de cadastro, validação e feedback visual.

## Como rodar

Pré-requisito: [Node.js](https://nodejs.org/) 20 ou superior.

```bash
npm install
npm run dev
```

Acesse http://localhost:3000.

Build de produção:

```bash
npm run build
npm run preview
```

## Rotas

| Rota        | Arquivo                  | Descrição                                   |
| ----------- | ------------------------ | ------------------------------------------- |
| `/`         | `app/pages/index.vue`    | Landing page com o componente `HeroLP`      |
| `/example`  | `app/pages/example.vue`  | Página de exemplo com o componente `WindowLP` |
| `/cadastro` | `app/pages/cadastro.vue` | Formulário de cadastro de novo membro       |

A navegação entre as páginas é feita pela barra de navegação (`AppNavbar`) com `<NuxtLink>`, sem recarregar a página (SPA). O primeiro carregamento é renderizado no servidor (SSR).

## Formulário de cadastro

| Campo                  | Tipo                  | Validação                            |
| ---------------------- | --------------------- | ------------------------------------ |
| Nome completo          | input texto           | obrigatório, nome e sobrenome        |
| E-mail                 | input e-mail          | obrigatório, formato válido          |
| Curso / Área           | select                | obrigatório                          |
| Semestre               | select (1º ao 10º)    | obrigatório                          |
| Interesses             | checkboxes            | pelo menos um                        |
| Mensagem / Bio         | textarea              | máximo de 200 caracteres (contador)  |

Ao clicar em **Cadastrar**: aparece um alerta de sucesso, os dados são exibidos no console (`console.table`), o membro entra na lista "Membros cadastrados" e os campos são limpos. Enquanto o usuário digita, o card de pré-visualização atualiza em tempo real.

Tudo feito com Composition API (`ref`, `reactive`, `computed`) e `v-model`.

## Estrutura

```
app/
├── app.vue              # raiz: <NuxtLayout> + <NuxtPage> + useSeoMeta
├── tailwind.css         # Tailwind + daisyUI
├── components/          # HeroLP, WindowLP, AppNavbar, AppFooter (auto-importados)
├── layouts/default.vue  # navbar + conteúdo + rodapé
└── pages/               # roteamento baseado em arquivos
    ├── index.vue
    ├── example.vue
    └── cadastro.vue
nuxt.config.ts
```
