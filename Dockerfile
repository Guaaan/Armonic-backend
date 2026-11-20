# # Building layer
# FROM node:18-alpine as development

# # Optional NPM automation (auth) token build argument
# # ARG NPM_TOKEN

# # Optionally authenticate NPM registry
# # RUN npm set //registry.npmjs.org/:_authToken ${NPM_TOKEN}

# WORKDIR /app

# # Copy configuration files
# COPY tsconfig*.json ./
# COPY package*.json ./
# COPY .env ./
# # Install dependencies from package-lock.json, see https://docs.npmjs.com/cli/v7/commands/npm-ci
# RUN npm ci --legacy-peer-deps

# # Copy application sources (.ts, .tsx, js)
# COPY src/ src/

# # Build application (produces dist/ folder)
# RUN npm run build

# # Runtime (production) layer
# FROM node:18-alpine as production

# # Optional NPM automation (auth) token build argument
# # ARG NPM_TOKEN

# # Optionally authenticate NPM registry
# # RUN npm set //registry.npmjs.org/:_authToken ${NPM_TOKEN}

# WORKDIR /app

# # Copy dependencies files
# COPY package*.json ./

# # Install runtime dependecies (without dev/test dependecies)
# RUN npm ci --legacy-peer-deps

# # Copy production build
# COPY --from=development /app/dist/ ./dist/

# # Expose application port
# EXPOSE 3000

# # Start application
# CMD [ "node", "dist/main.js" ]


FROM node:14-alpine

# Establecemos el directorio de trabajo
WORKDIR /usr/src/app

# Copiamos los archivos necesarios para la instalación de paquetes
COPY package*.json ./

# Instalamos los paquetes necesarios
RUN npm install

# Copiamos el resto del código
COPY . .

# Exponemos el puerto de la aplicación
EXPOSE 3000

# Ejecutamos la aplicación
CMD ["npm", "start"]