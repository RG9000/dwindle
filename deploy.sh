#!/bin/bash
nohup npm start &
npx cypress run --browser "chrome" && echo "tests passed! Deploying to azure" &&
npm run build &&
swa deploy --env production --deployment-token $DWINDLE_TOKEN ./build
echo "killing local server"
pkill node
