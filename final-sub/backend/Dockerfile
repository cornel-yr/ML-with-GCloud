FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

EXPOSE 8080

ENV PORT=8080

ENV MODEL_URL=https://storage.googleapis.com/submissionmlgc-cornelius-yuli-rosdianto/submissions-model/model.json

CMD ["npm", "start"]