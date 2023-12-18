FROM node:18.15.0

WORKDIR /usr/src/app
COPY . .

RUN npm install
RUN npm rebuild bcrypt --build-from-source

# Uygulamayı başlatın
CMD ["npm", "start"]
