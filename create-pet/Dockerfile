# Etapa build optimizada
FROM node:16 AS build

WORKDIR /app

# Copia solo los archivos de dependencias primero
COPY package*.json ./

RUN npm install

# Copiar el resto solo si hubo cambios
COPY . .

RUN npm run build

# Etapa producción
FROM node:16 AS production

WORKDIR /app

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist6

EXPOSE 3001

CMD ["node", "dist/app.js"]
