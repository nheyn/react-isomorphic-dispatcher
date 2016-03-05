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

RUN chown node:node ./
RUN chown -R node:node ./*

# Run type check
USER node
RUN npm install
CMD npm run check