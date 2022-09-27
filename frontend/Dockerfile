FROM node:18

ARG VITE_API_URL
ARG VITE_API_PORT

WORKDIR /home

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install

COPY . .

ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_API_PORT=${VITE_API_PORT}

RUN echo "VITE_API_URL=${VITE_API_URL}" >> .env
RUN echo "VITE_API_PORT=${VITE_API_PORT}" >> .env

CMD npm run dev -- --host 0.0.0.0

