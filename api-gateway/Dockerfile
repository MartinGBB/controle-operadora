FROM node:20-alpine

# 2. Cria a pasta de trabalho dentro do container
WORKDIR /usr/src/app

# 3. Copia os arquivos de dependência para pasta nova no container
COPY package*.json ./

# 4. Instala as dependências
RUN npm install

# 5. Copia o resto do código fonte
COPY . .

# 6. Compila o projeto (Gera a pasta dist)
RUN npm run build

# 7. Comando para iniciar o servidor
CMD ["npm", "run", "start:prod"]
