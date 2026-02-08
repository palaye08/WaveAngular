# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copier les fichiers de configuration
COPY package*.json ./

# Installer les dépendances avec retry
RUN npm config set fetch-timeout 600000 && \
    npm config set fetch-retry-maxtimeout 600000 && \
    npm install --legacy-peer-deps || \
    npm install --legacy-peer-deps || \
    npm install --legacy-peer-deps

# Copier le code source
COPY . .

# Construire l'application en mode production
RUN npm run build -- --configuration=production

# Stage 2: Runtime
FROM node:20-alpine

WORKDIR /app

# Installer Express
RUN npm install express@4.18.2

# Copier les fichiers buildés depuis le builder
COPY --from=builder /app/dist/goldenfly/browser ./dist

# Copier le serveur Node.js
COPY server.js ./

# Exposer le port
EXPOSE 3000

# Démarrer le serveur
CMD ["node", "server.js"]