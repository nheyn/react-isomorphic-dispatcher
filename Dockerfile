FROM node:5

# Get needed libraries
RUN apt-get update
RUN apt-get install -y libelf1

# Create node user
RUN groupadd node
RUN useradd -m -g node node

# Get react-isomorphic-dispatcher module and example site code
WORKDIR /home/node/react-isomorphic-dispatcher/

COPY .flowconfig ./.flowconfig
COPY flowlib/ ./flowlib/
COPY .babelrc ./.babelrc
COPY package.json ./package.json
COPY src/ ./src/
COPY example/ ./example/

RUN chown node:node ./
RUN chown -R node:node ./*

# Install module code
USER node
RUN npm install

# Run server
WORKDIR /home/node/react-isomorphic-dispatcher/example/
RUN npm install
CMD npm start

EXPOSE 8080