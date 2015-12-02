FROM node:4

## BECAUSE using Github instead of npm for isomorphic-dispatcher ##
RUN npm install -g babel@5
## BECAUSE using Github instead of npm for isomorphic-dispatcher ##

COPY ./example/ /var/www/example/
COPY ./src/ /var/www/react-isomorphic-dispatcher/src/
COPY ./package.json /var/www/react-isomorphic-dispatcher/package.json

WORKDIR /var/www/example
RUN npm install --unsafe-perm

## BECAUSE using Github instead of npm for isomorphic-dispatcher ##
RUN babel node_modules/isomorphic-dispatcher/src/ -d node_modules/isomorphic-dispatcher/lib/
## BECAUSE using Github instead of npm for isomorphic-dispatcher ##

CMD node index.js

EXPOSE 80