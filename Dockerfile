FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json* ./
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi
COPY . .
# The links and the operator's details are baked in at build time.
ARG VITE_APP_URL
ARG VITE_REPO_URL
ARG VITE_CONTACT_EMAIL
ARG VITE_OPERATOR_NAME
ARG VITE_OPERATOR_ADDRESS
ARG VITE_OPERATOR_UID
RUN npm run build

FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY security-headers.conf.inc /etc/nginx/security-headers.conf.inc
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://127.0.0.1/ >/dev/null || exit 1
