FROM node:10.6.0
COPY . /home/app
WORKDIR /home/app
COPY package.json ./
RUN yarn install --ignore-engines
EXPOSE 3001
CMD ["npm", "start"]