# FireShort

Fireshort is a URL shortener made using Google Firestore and React.JS
The original repository has been forked from [here](https://github.com/xprilion/fireshort)

The following features has been added to the original repository before pushing this rep:
  - The generated links now track the number of hits on them
  - The Custom URL is an optional field now, if left black it generates a random 8 character long code using NanoID
  - Ability to track link activity : The links can now track the timestamp,ipv4,ipv6 and User-Agent of the Request source
  - The Link Tracking feature for any link can be switched on/off at anytime from Admin Panel
  - A lot of UI Changes

### Features To Be Added
The following features are under development/open for contributions.Please first create a feature issue to discuss about the feature you would like to take up.

  - [ ] Multiple Admin Panels and New User Registration
  - [ ] Ability to check for Custom URL clashes across all users instantly to verify if it has been taken already
  - [ ] Make a page for link analytics , with number of clicks,and all the activity related to it
  - [ ] Add a lot more Analytics options with different types of charts 
  - [ ] Show a Dialog box with the created link wth different sharing option and a way to show QR Codes (and a way to track every qr scan) for the same
  - [ ] Add a homepage showcasing the tool with animations
  - [ ] Revamp the dashboard
  - [ ] Develop APIs for all the tasks for eay management 

Valid Feature Requests will be added to the above list over time.

### Running The Project

Prerequisites For Running The Project Locally:
 - Node
 - NPM
 - A Firebase Project
 - Git

Before cloning the project make sure you have created a firebase project on www.consolfe.frebase.com

 To clone this repository run:
```sh
$ git clone https://github.com/monizb/FireShort.git
```

 Head inside the cloned folder and install the dependencies using NPM
```sh
$ cd FireShort-master
$ npm install
```

Next create a .env file in the root of the project directory, this is where you will put all your firebase config keys
Go to Firebase console and select the project you just created, Select Add App and select Web, follow the on-screen instructions until Firebase provides you with a config object, take each property of the provided object and put it inside of the .env file like this:

```
REACT_APP_API_KEY=
REACT_APP_AUTH_DOMAIN=
REACT_APP_DB_URL=
REACT_APP_PROJECT_ID=
REACT_APP_STORAGE_BUCKET=
REACT_APP_SENDER_ID=
REACT_APP_APP_ID=
REACT_APP_MEAS_ID=
```

Save the file and now in the Firebase Console Goto Authentication > SignIn Methods > Enable Email Sigin.Then UNder Users Tab Select Add User and add any one user of your choice which will be used for logging in to the admin panel.
Next, Goto Cloud Firestore > Create Database and then navigate to the rules tab and copy paste the rules from [here](https://github.com/monizb/FireShort/blob/master/db-rules.json)
(The rules are not the best right now, will be improved in the future)

For the final step run:
```sh
$ npm start
```
Wait for a few minutes after which it should automatically spin up a development server for you on the PORT:3000 and take you to the login page

### Contributing

To contribute to this repository please first create an issue with the appropriate template, after which you can directly fork this repository,make changes and start a pull request to the master branch.

### Live Demo
Coming Soon!

### License
MIT Licensed (Check [here](https://github.com/monizb/FireShort/blob/master/LICENSE))
