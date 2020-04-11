# ghajini
This service runs as a server-side app that keeps tracks of your bill payments and sends you reminder whenever bill is due.

- Reason for this project was
Missed credit card payments usually attract heavy penalties, and huge interest.

# Solution
Send an email EVERY SINGLE DAY from issue date to due date, to keep reminding user to pay the bill. Until the user uploads some proof that they have paid the bill.

Of course, will many bills (phone/internet/credit cards/subscriptions) your inbox will be full of unnecessary reminders even after you've paid the bill, so once you pay the bill, just upload some proof (no validation on proof, just for record keeping) and you will stop receiving reminders.

The service does, however send you a mail 3-4 days before due date(and some days after), even if you uploaded proof, just as an alert. This is configurable.

