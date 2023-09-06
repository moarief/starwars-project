FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN corepack prepare pnpm@latest --activate

COPY . /app
WORKDIR /app

#COPY package.json ./

#ENV NEXT_TELEMETRY_DISABLED 1

# Update npm | Install pnpm | Set PNPM_HOME | Install global packages
#RUN npm i -g npm@latest; \
# # Install pnpm
# npm install -g pnpm; \
# pnpm --version; \
# pnpm setup; \
# mkdir -p /usr/local/share/pnpm &&\
# export PNPM_HOME="/usr/local/share/pnpm" &&\
# export PATH="$PNPM_HOME:$PATH"; \
# pnpm bin -g &&\
# # Install dependencies
# pnpm add -g pm2 &&\
# pnpm add -g @nestjs/cli &&\
# pnpm install

FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

#COPY . .

#CMD ["pnpm", "run", "dev"]


FROM base
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist
EXPOSE 3000

ENV PORT 3000
CMD [ "pnpm", "run", "start" ]