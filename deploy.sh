echo $DATE=`date '+%Y-%m-%d %H:%M:%S'` > .gitupdate.txt
yarn lint
netlify-lambda build lambda-src
git add .
git commit -m h=$(hostname -f)
git push origin appsync --force
rm .gitupdate.txt
