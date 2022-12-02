FROM node:19 as base
WORKDIR /app
COPY package.json /app/
RUN npm install
COPY . .
EXPOSE 3000


FROM base as build
CMD ["npm", "run", "start-dev"]


