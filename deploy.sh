#!/bin/bash
npm run build
swa deploy --env production --deployment-token $DWINDLE_TOKEN ./build
