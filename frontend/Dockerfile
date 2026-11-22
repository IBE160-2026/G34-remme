FROM node:26-slim

WORKDIR /app/frontend
ENV NEXT_TELEMETRY_DISABLED=1

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

EXPOSE 3000
CMD ["npx", "next", "dev", "-p", "3000", "-H", "0.0.0.0"]
