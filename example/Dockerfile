FROM node:5

# Get needed libraries
RUN apt-get update
RUN apt-get install -y libelf1

# Create node user
RUN groupadd node
RUN useradd -m -g node node

# Get react-isomorphic-dispatcher
WORKDIR /home/node/
RUN git clone https://github.com/nheyn/react-isomorphic-dispatcher.git
RUN chown node:node ./react-isomorphic-dispatcher
RUN chown -R node:node ./react-isomorphic-dispatcher/*

# Get example site source
WORKDIR /home/node/react-isomorphic-dispatcher-example
RUN chown node:node .

COPY .babelrc ./.babelrc
COPY browserify.js ./browserify.js
COPY package.json ./package.json
COPY src/ ./src/
RUN chown -R node:node ./*

# Start Server
USER node
RUN (cd ~/react-isomorphic-dispatcher && npm install)
RUN npm install
CMD npm run start

EXPOSE 8080