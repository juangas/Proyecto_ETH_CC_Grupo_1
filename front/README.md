# Proyecto Equipo 1 - Front

To start the frontend application, you need to follow these steps, always from the front folder:

1. Move to folder corresponding to front
```bash
cd front
```

2. Install all necessary dependencies using

```bash
yarn install
```

3. Start the application using

```bash
yarn dev
```

## Contribution Guidelines

To ensure consistency and maintainability, it's important to follow best practices when contributing to this project. Here are some guidelines:

### Linting and Prettier

To ensure that everyone works with the same formatting style, we recommend using the linter and prettier. These are already installed in the project, so you can use the following commands:

- To format your code, use

```bash
yarn format
```

To check for errors, use

```bash
yarn lint
```

NOTE: you can install eslint and prettier plugins in your code editor.

### Installing Dependencies

To keep track of which dependencies we need and avoid potential issues when installing or updating minor versions, we recommend using the -E flag whenever you install or update a dependency. For example, to install web3:

```bash
yarn add web3@version -E
```

or to install the latest version:

```bash
yarn add web3 -E
```
