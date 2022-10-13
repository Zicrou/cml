FROM ruby:2.7.2-alpine as base

RUN apk update --no-cache && \
    apk upgrade --no-cache && \
    apk add --no-cache \
      tini \
      build-base \
      postgresql-dev \
      tzdata \
      bash \
      imagemagick \
      nodejs

WORKDIR /app

RUN gem update --system

ENTRYPOINT ["/sbin/tini", "--"]

ADD Gemfile Gemfile.lock /app/
RUN bundle install

ADD . .
CMD ["puma"]
