# 💈 Sistema de Gestão para Barbearias

Frontend de uma aplicação web para gerenciamento financeiro e operacional de barbearias, desenvolvida com **Next.js, React e TypeScript**.

O sistema permite que proprietários de barbearias registrem os serviços realizados e acompanhem os resultados por meio de dashboards e relatórios, com autenticação e controle de acesso.

O projeto foi desenvolvido com foco em uma interface **responsiva, simples e intuitiva**, permitindo que o sistema seja utilizado tanto em computadores quanto em dispositivos móveis.

---

## 📸 Preview

> Aplicação disponível em produção:

🔗 https://gestao-front-eight.vercel.app

---

## 🎯 Sobre o projeto

O projeto surgiu a partir da necessidade de transformar o controle manual dos serviços realizados em barbearias em uma solução digital.

A aplicação permite registrar atendimentos, associar serviços realizados e acompanhar informações financeiras através de relatórios.

O frontend é responsável pela interface da aplicação, gerenciamento das interações do usuário, autenticação e comunicação com uma API REST desenvolvida em **Java + Spring Boot**.

A arquitetura foi pensada para permitir a evolução do sistema para diferentes estabelecimentos, utilizando autenticação e isolamento de dados por estabelecimento no backend.

---

## ✨ Funcionalidades

### 🔐 Autenticação

- Login do proprietário da barbearia
- Autenticação utilizando JWT
- Armazenamento da sessão no navegador
- Envio automático do token nas requisições autenticadas
- Proteção das funcionalidades administrativas
- Validação dos campos do formulário de login
- Tratamento de erros durante a autenticação

### 📊 Dashboard

- Visão geral da gestão da barbearia
- Acesso rápido às principais funcionalidades
- Navegação através de sidebar
- Interface adaptada para desktop e dispositivos móveis

### ✂️ Registro de atendimentos

- Cadastro de serviços realizados
- Seleção de múltiplos serviços em um atendimento
- Registro da forma de pagamento
- Campo para observações
- Comunicação com a API para persistência dos dados

### 📈 Relatórios

O sistema possui diferentes períodos para consulta dos dados:

- Relatório diário
- Relatório mensal
- Relatório anual

Os relatórios permitem acompanhar informações relacionadas aos serviços realizados e ao faturamento da barbearia.

### 🧾 Gestão de serviços

- Visualização dos serviços cadastrados
- Cadastro de serviços
- Integração com a API para gerenciamento dos dados

### 📱 Responsividade

A interface foi desenvolvida pensando em diferentes tamanhos de tela:

- Desktop
- Tablet
- Smartphone
- iPhone

Em telas menores, a navegação utiliza um menu lateral adaptado para melhorar a experiência de uso.

### 🔔 Notificações

O sistema utiliza notificações para informar o usuário sobre ações realizadas na aplicação, como:

- Cadastro realizado com sucesso
- Erros nas requisições
- Falhas de autenticação
- Outras operações do sistema

---

# 🛠️ Tecnologias utilizadas

## Frontend

- **Next.js 16**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **Axios**

## Formulários e validações

- **Formik**
- **Yup**

## Autenticação

- **JWT**
- Interceptors do Axios
- LocalStorage

## Backend

O frontend consome uma API REST desenvolvida com:

- **Java**
- **Spring Boot**
- **Spring Security**
- **JWT**
- **JPA / Hibernate**
- **PostgreSQL**
- **Flyway**

## Infraestrutura e deploy

- **Docker**
- **Git**
- **GitHub**
- **GitHub Actions**
- **Vercel**

---

# 🏗️ Arquitetura

A aplicação utiliza uma arquitetura baseada em componentes e separação de responsabilidades.

A estrutura principal do projeto está organizada da seguinte forma:

```text
src/
├── app/
│   ├── login/
│   ├── atendimento/
│   ├── painel/
│   │   ├── atendimento/
│   │   ├── relatorios/
│   │   │   ├── diario/
│   │   │   ├── mensal/
│   │   │   └── anual/
│   │   └── servico/
│   │
│   ├── components/
│   │   ├── Header/
│   │   ├── Footer/
│   │   ├── Sidebar/
│   │   ├── Template/
│   │   └── notification/
│   │
│   └── page.tsx
│
└── resources/
    ├── axios/
    ├── proprietario/
    ├── relatorio/
    ├── servico/
    └── atendimento/