#!/bin/sh
npm install
chmod -R a+rwx .
npm run build
#npm test
if [ "$JENKINS_HOME" != "" ] ; then
   echo "Publishing to Nexus"
   npm publish -f
fi
