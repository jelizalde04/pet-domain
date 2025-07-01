# Usa una imagen oficial de Node.js ligera
FROM node:16-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de dependencias primero para cachear npm install
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos del proyecto
COPY . .

# Ejecuta el build que limpia dist, hace bundle y copia archivos/carpetas
RUN npm run build

# Expone el puerto donde corre tu app
EXPOSE 3001

# Comando para correr la app empaquetada
CMD ["node", "dist/app.js"]
