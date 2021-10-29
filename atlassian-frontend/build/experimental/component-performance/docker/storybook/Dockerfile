FROM docker.atl-paas.net/sox/atlassian/atlassian-frontend-vr:latest-v4

HEALTHCHECK --interval=3m \
  CMD curl -f http://localhost:56789/ || exit 1
