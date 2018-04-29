echo $DATE=`date '+%Y-%m-%d %H:%M:%S'` > .gitupdate.txt
yarn lint
 netlify-lambda build lambda-src
 git add .
#  git commit -m `date '+%Y-%m-%d %H:%M:%S'`
git commit -m 'adsfasdfdsf'
 git push origin appsync
