docker rm $(docker stop $(docker ps -a -q --filter ancestor=abhinavsingh/node-web-app --format="{{.ID}}"))
