# Dockerfile

FROM node:8-alpine AS build

ADD . /src
WORKDIR /src
RUN npm install
# RUN npm run lint
# RUN npm run test
# RUN npm run build
RUN npm prune --production

FROM node:8-alpine

ENV PORT=3001
EXPOSE $PORT

ENV DIR=/usr/src/service
WORKDIR $DIR

# RUN apk add --update --no-cache curl

COPY --from=build /src/package.json package.json
COPY --from=build /src/package-lock.json package-lock.json
COPY --from=build /src/app app
COPY --from=build /src/config config
COPY --from=build /src/node_modules node_modules
COPY --from=build /src/public public
COPY --from=build /src/server.js server.js

CMD ["npm", "start"]
