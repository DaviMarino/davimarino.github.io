# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


# Atualizar o projeto

npm run deploy

# Arquitetura

public/
├── image/           # As imagens estaticas
└── video/           # Os videos estaticos
src/
├── constants/       # Cores, temas e configurações fixas
├── data/            # Seus dados (JSONs, listas de projetos)
├── components/      # Blocos de Lego (botões, gráficos, cards)
│   ├── charts/      # Gráficos específicos
│   ├── layout/      # Navbar, Footer
│   └── sections/    # Seções inteiras (Hero, Skills)
├── pages/           # As "telas" da aplicação
└── App.jsx          # O Maestro que rege tudo


# Compatibilidade Windows e Linux

# 1. Remove a pasta node_modules inteira (o -rf força a remoção recursiva)
rm -rf node_modules

# 2. Reinstala todas as dependências. 
# O npm vai baixar os binários novamente e atribuir as permissões corretas para o Fedora automaticamente.
npm install

# 4. Tente rodar o projeto novamente
npm run dev