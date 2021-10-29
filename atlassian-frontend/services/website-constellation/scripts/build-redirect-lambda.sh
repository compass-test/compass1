# Build using the original netlify thing
yarn build:lambda

# Ziparoo, bro.
if [ ! -d "./dist" ]; then 
  echo "dist folder does not exist, creating folde"
  mkdir dist
fi

FILE_TO_ZIP=functions/redirect.js
ZIP_NAME=redirect-$(npx hash-files -f '["./functions/redirect.js"]')-$(date +%s).zip
ZIP_LOCATION=dist/$ZIP_NAME
echo 👉 Zipping $FILE_TO_ZIP to $ZIP_LOCATION
zip $ZIP_LOCATION functions/redirect.js 
