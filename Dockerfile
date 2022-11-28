FROM node:16.16.0
WORKDIR /var/app
COPY . .
EXPOSE 3000
CMD npm run start
