# Production (CI)
FROM docker-proxy.services.atlassian.com/sox/atlassian/atlassian-frontend:latest
# Local (use this one when validating new images during an upgrade)
# FROM docker.atl-paas.net/sox/atlassian/atlassian-frontend:latest

# Replace shell with bash so we can source files
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# Make sure apt is up to date
RUN apt-get update --fix-missing
RUN apt-get install -y curl
RUN apt-get install -y build-essential libssl-dev


# Install Python to avoid issues with node-gyp
# We need to install it from the source code
# as it is not possible to install Python3.6 in a node 12 image.
RUN apt-get update && apt-get upgrade -y &&\
    apt-get install -y wget \
    build-essential zlib1g-dev libncurses5-dev libgdbm-dev libnss3-dev libssl-dev libreadline-dev libffi-dev

RUN wget https://www.python.org/ftp/python/3.8.0/Python-3.8.0.tgz &&\
    tar -xf Python-3.8.0.tgz &&\
    cd Python-3.8.0 &&\
    ./configure --enable-optimizations &&\
    make -j8 &&\
    make altinstall

RUN update-alternatives --install /usr/bin/python3 python3 /usr/local/bin/python3.8 3

RUN apt-get clean && apt-get autoremove -y && rm -r /var/lib/apt/lists/*

ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 12.21.0

# Install nvm with node and npm
RUN curl https://raw.githubusercontent.com/creationix/nvm/v0.30.1/install.sh | bash \
    && source $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default

ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH      $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH
