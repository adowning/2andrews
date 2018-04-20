touch updater.txt
cat 'asdf' >> updater.txt
netlify-lambda build lambda-src
git add .
git commit -m 'asdfadsfsadfdsf'
git push origin auth
