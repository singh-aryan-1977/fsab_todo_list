## FSAB_TODO_LIST

A simple todolist where we can add, delete and get all the TODOs which are stored in a MongoDb collection.

If you git clone this project, you will need to add in your own personal MongoDB Collection URI and once you have done that, in order to run the server:

Navigate to:
```
final_app/server
```

and run the command 
```
node index.js
```

If it connects to your database, it should print out the message "CONNECTED TO MONGODB".

To run the react app, navigate to:
```
final_app/frontend
```
and run the command
```
npm start
```