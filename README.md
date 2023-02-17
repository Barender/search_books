# Book Search

This application allows users to search for books based on input entered into a search box. The results are displayed in a table.

## Prerequisites

- Node.js (v16.12.0 or higher)
- npm or yarn (8.19.2)

## Dependencies

This application relies on the following dependencies:

- @emotion/react
- @emotion/styled
- @mui/material
- @mui/x-data-grid
- axios
- react
- react-dom

## Development Dependencies

This application relies on the following development dependencies:

- @types/react
- @types/react-dom
- @vitejs/plugin-basic-ssl
- @vitejs/plugin-react
- typescript
- vite

## Installation

- Clone or download the repository
- Run npm install or yarn to install the dependencies
- Create a new file called .env.local in the root of the project
- use .env.sample for more details
- Run npm run dev or yarn dev to start the development server

## Commands

- Run on development mode

```bash
# development
yarn dev

# build
yarn build

# production mode
yarn start
```

## Deployment

Run npm run build or yarn build to create a production-ready build. The built files can then be deployed to any hosting service that supports Node.js.

## Note

.env.local is not version controlled and will be ignored by git.
Do not store sensitive data in this file.
