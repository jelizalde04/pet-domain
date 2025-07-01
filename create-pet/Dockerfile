# Etapa 1: Build
FROM node:16 AS build

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos solo package.json y package-lock.json para aprovechar cache de npm install
COPY package*.json ./

# Instalamos dependencias
RUN npm install

# Copiamos el resto de los archivos fuente (incluye código y scripts de build)
COPY . .

# Ejecutamos el build
# Este paso genera la carpeta dist con el código compilado
# Cada vez que se corre, sobrescribe la carpeta dist (sin necesidad de eliminarla manualmente)
RUN npm run build

# (Opcional) Listamos la carpeta dist para verificar contenido (puedes borrar esta línea después)
RUN ls -la dist

# Etapa 2: Producción
FROM node:16 AS production

WORKDIR /app

# Copiamos node_modules desde la etapa build para no reinstalar dependencias
COPY --from=build /app/node_modules ./node_modules

# Copiamos la carpeta dist generada desde la etapa build
COPY --from=build /app/dist ./dist

# Exponemos el puerto que usa la aplicación
EXPOSE 3001

# Ejecutamos la aplicación apuntando al archivo principal dentro de dist
CMD ["node", "dist/app.js"]
