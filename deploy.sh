#rm -rf public/; rm -rf .cache; yarn run gatsby build; scp -r public/* app@eventlama.com:/var/eventlama/data/themes/75
#rm -rf public/; yarn run gatsby build; scp -r public/* app@eventlama.com:/var/eventlama/data/themes/88
rm -rf public/
yarn run gatsby build
tar -czvf public.tar.gz public
scp -r public.tar.gz app@eventlama.com:/var/eventlama/data/themes/88
ssh app@eventlama.com 'cd /var/eventlama/data/themes/88 && tar xf public.tar.gz && cp -R public/* . && rm public.tar.gz && mv public /tmp/oldpublic'
