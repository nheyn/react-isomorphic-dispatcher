FROM node:5

# Get needed libraries
RUN apt-get update
RUN apt-get install -y libelf1

# Get react-isomorphic-dispatcher (use -v tag in 'docker run' for development)
WORKDIR /var/
RUN git clone https://github.com/nheyn/react-isomorphic-dispatcher.git

WORKDIR /var/react-isomorphic-dispatcher/
RUN npm install

# Create example server
WORKDIR /var/www/

COPY .babelrc /var/www/.babelrc
COPY browserify.js /var/www/browserify.js
COPY package.json /var/www/package.json
COPY src/ /var/www/src/
#COPY public/ /var/www/public/

RUN npm install --unsafe-perm

CMD npm run start

EXPOSE 80