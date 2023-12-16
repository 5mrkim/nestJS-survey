FROM node:18.14.2 AS builder
RUN mkdir -p /app
WORKDIR /app
ADD . .
RUN mkdir -p video-storage

RUN npm uninstall bcrypt
RUN npm install bcrypt
RUN npm install
ENV TZ=Asia/Seoul
RUN npm run build

CMD npm run typeorm migration:run;npm run start:dev




