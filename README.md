# Ecommerce-application: Sneakers shop

This is the final task of Stage 2 of the Rsschool programming school. The goal is to develop an online store that will help us to consolidate our teamwork skills and learn how to work with frameworks and task boards.

## Table of contents

1. [Description](#description)
1. [Technologies Used](#technologies-used)
1. [Setup Instructions](#setup-instructions)
1. [Scripts in project](#scripts-in-project)
1. [The following people were involved in the project](#the-following-people-were-involved-in-the-project)

## Description

A modern sneaker e-commerce store with a clean and user-friendly interface. Users can:

- Create personal accounts
- Log in and manage their profiles
- Browse a catalog of sneakers
- Filter products by **brand**, **size**, and **price**
- Add items to a **shopping cart**

Built using modern **Single Page Application (SPA)** technologies, the platform ensures a fast and seamless shopping experience without page reloads.

### 🔥 Key Benefits

- 🧭 **Intuitive and friendly UI**
- ⚡ **Fast loading and responsive design**
- 🛠️ **Modern tech stack (SPA)**
- 🛍️ **Powerful product filtering options**

## Technologies Used

- Frontend

  - ⚛️ React - main Frontend library
  - ⚡ Vite - bundler
  - 🇹🇸 Typescript
  - 🎨 Scss
  - ✅ Zod

- Backend

  - 📦 Commercetools

- Utility: Linter & Testing
  - ❗ ESlint
  - 🧹 Lint-staged
  - 🪄 Prettier
  - 🐶 Husky
  - 🧪 Jest

## Setup Instructions

1. Install Node.js v20.11.1

2. Obtain the Project Files: you have two options for obtaining the project files:

- Fork the Repository: If you plan to contribute to the project or make changes to the code, it's recommended to fork the repository. This will create a copy of the repository under your GitHub account. [Fork the repository](https://github.com/etcq/ecommerce-application/fork) to create a copy under your account.

- Download the Repository: If you only intend to use the project locally and don't plan to contribute changes, you can simply download the repository as a ZIP file. [Download the repository](https://github.com/etcq/ecommerce-application/archive/refs/heads/main.zip) as a ZIP file and extract it to your local machine.

3. Clone the Repository (if Forked): if you forked the repository, clone your newly created repo to your local machine using the following command:

```
git clone https://github.com/YOUR-USERNAME/ecommerce-application.git
```

4. Navigate to the Project Directory: once you have obtained the project files (either by forking or downloading), navigate to the project directory:

```
cd ecommerce-application
```

5. To install all dependencies use:

```
npm install
```

Create a .env file in the root directory of the project: refer to the .env.example file as a reference or template for configuring .env file and add the environment variables with your own values.

7. Build the Project:

to build the project, use the following command:

```
npm run build
```

8. Preview the Project: to preview the project, use the following command:

```
npm run preview
```

## Project architecture

- assets - static and styles files
- components - Ract components for creating pages
- core - Interactions with APIs and data storage
- interfaces - interfaces for Project
- pages - page views
- test - for testing files

## Scripts in project

1. `npm run dev` - to run develop mode
2. `npm run build` - to build project in `dist` folder
3. `npm run preview` - to preview project
4. `prepare` - init husky in project
5. `lint` - to lint typescript and react components files with ESlint
6. `lint:fix` - to fix linting issues TS files with ESlint
7. `format` - to lint TS and SCSS files with prettier and stylelint
8. `format:fix` - to fix linting issues TS and SCSS file with prettier and stylelint
9. `test` - to run vitest testing mode
10. `coverage` - to run vitest coverage

## The following people were involved in the project

### Authors

- [aQafresca](https://github.com/aQafresca)
- [turik777](https://github.com/turik777)
- [etcq](https://github.com/etcq)

### Mentors

- [aleksey-drozdov](https://github.com/aleksey-drozdov)
- [micolka](https://github.com/micolka)
