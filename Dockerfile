FROM node:18-alpine
WORKDIR /app
COPY ./ /app/
RUN npm install
RUN npm install react-icons --save
RUN npm run build
COPY . .
EXPOSE 5173
CMD [ "npm", "run", "dev" ]
