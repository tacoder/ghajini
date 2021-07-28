# ghajini
This service runs as a server-side app that keeps tracks of your bill payments and sends you reminder whenever bill is due.

## Reason for this project was
Missed credit card payments usually attract heavy penalties, and huge interest.

## Solution
Send an email EVERY SINGLE DAY from issue date to due date, to keep reminding user to pay the bill. Until the user uploads some proof that they have paid the bill.

Of course, will many bills (phone/internet/credit cards/subscriptions) your inbox will be full of unnecessary reminders even after you've paid the bill, so once you pay the bill, just upload some proof (no validation on proof, just for record keeping) and you will stop receiving reminders.

The service does, however send you a mail 3-4 days before due date(and some days after), even if you uploaded proof, just as an alert. This is configurable.

### Set up 
For compilation - 
`npm install @sendgrid/mail`
`npm install mime-types`


To log into container - 

docker ps
From the names column, copy name value
docker exec -it <name> /bin/bash

For testing with local mongodb - 
You will need Homebrew installed on your mac. install from here - https://brew.sh/

1. Change mongodb url from database to localhost in mongo.js
2. install mongodb on local 
brew tap mongodb/brew
brew install mongodb-community@5.0
or the latest from - https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/

from the logs - 
To have launchd start mongodb/brew/mongodb-community now and restart at login:
  brew services start mongodb/brew/mongodb-community
Or, if you don't want/need a background service you can just run:
  mongod --config /opt/homebrew/etc/mongod.conf



### Startup
This is completely dockerized, can be started by simple docker compose up
For sending emails we are using sendgrid API, and the auth key for the same needs to be set in env properties, Like so
```
 export SENDGRID_API_KEY=<Your sendgrid api key>
 docker-compose down
 docker-compose up -d
 docker-compose logs --follow
```
