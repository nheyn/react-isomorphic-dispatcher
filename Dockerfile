FROM node:5

# Get needed libraries
RUN apt-get update
RUN apt-get install -y libelf1

# Create node user
RUN groupadd node
RUN useradd -m -g node node

# Get react-isomorphic-dispatcher
WORKDIR /home/node/react-isomorphic-dispatcher/

COPY .flowconfig ./.flowconfig
COPY flowlib/ ./flowlib/
COPY .babelrc ./.babelrc
COPY package.json ./package.json
COPY src/ ./src/
COPY example/ ./example/

RUN chown node:node ./
RUN chown -R node:node ./*

# Install Server
USER node

WORKDIR /home/node/react-isomorphic-dispatcher/
RUN npm install

WORKDIR /home/node/react-isomorphic-dispatcher/example/
RUN npm install

# Start Server
CMD npm run start

EXPOSE 8080