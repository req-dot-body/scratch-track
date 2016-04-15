FROM ubuntu

RUN apt-get update -qq && DEBIAN_FRONTEND=noninteractive apt-get -q -y install build-essential git-core wget libssl-dev

ENV NODE_ENV="production" \
    NODE_VERSION="4.1.0" \
    PORT="3000"

RUN git clone https://github.com/tj/n.git ~/.n \
    && cd ~/.n \
    && make install \
    && n ${NODE_VERSION} \
    && rm -rf ~/.n
RUN mkdir -p /app
WORKDIR /app
RUN rm -rf ./node_modules \
    && npm install --production
COPY . /app

EXPOSE 3000