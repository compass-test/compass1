# In a build image, build perfetto from source
FROM debian:buster AS build

RUN apt-get update && apt-get install -y \
  build-essential \
  curl \
  git \
  libtinfo5 \
  python \
  python3

WORKDIR /tmp
ADD remove_tracking.patch remove_tracking.patch
ADD catapult_add_load_script.patch catapult_add_load_script.patch
RUN git clone --depth 1 --branch v7.0 https://android.googlesource.com/platform/external/perfetto/

WORKDIR /tmp/perfetto
RUN patch -u ui/index.html -i /tmp/remove_tracking.patch

# Adapted from https://github.com/google/perfetto/blob/v7.0/ui/README.md
# and https://github.com/google/perfetto/blob/v7.0/docs/contributing/build-instructions.md#ui-development
RUN tools/install-build-deps --ui
RUN tools/gn gen out/default
RUN tools/ninja -C out/default ui

# Add our custom script for support for loading traces from urls and use it in catapult
ADD catapult_load_trace_from_url.js out/default/ui/assets/catapult_load_trace_from_url.js
RUN patch -u out/default/ui/assets/catapult_trace_viewer.html -i /tmp/catapult_add_load_script.patch

# ---
# Copy built artifacts to the production image
FROM nginx:1.19

# See https://hub.docker.com/_/nginx
COPY --from=build /tmp/perfetto/out/default/ui /usr/share/nginx/html
RUN chown -R nginx /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
