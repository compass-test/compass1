export RELEASE_DASHBOARD_URL=$RELEASE_DASHBOARD_URL

STATUS=$([ $BITBUCKET_EXIT_CODE -eq 0 ] && echo "SUCCESS" || echo "FAILED")

curl --request POST \
  --url "$RELEASE_DASHBOARD_URL/api/v1/integrator-history" \
  --header "Authorization: Bearer $PIPELINES_JWT_TOKEN" \
  --header 'Content-Type: application/json' \
  --data "{
	\"status\": \"$STATUS\",
	\"buildNumber\": \"$BITBUCKET_BUILD_NUMBER\"
}"
