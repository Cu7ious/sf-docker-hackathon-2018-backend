# Start with Node
FROM node:9.0.0

# Make working directory
RUN mkdir -p /usr/src/app

COPY . /usr/src/app

# Install Yarn, because lolnpm
#RUN curl -o- -L https://yarnpkg.com/install.sh | bash

# Make yarn available to SH, and thus your compose file
#ENV PATH="/root/.yarn/bin:${PATH}"

# Install Node Monitor
RUN npm install -g nodemon

# All operations that are run from on this image will assume
# this to be the directory the commands are run from
WORKDIR /usr/src/app/

# Install npm dependencies
#RUN yarn install
RUN sudo npm install

# Run dev-server.sh -f
#CMD ['yarn run', 'start']
CMD NODE_ENV=development nodemon --inspect src/ --ignore 'frontend'
