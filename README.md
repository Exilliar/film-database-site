# Film Database Site
This site shows all of the blu ray records that are stored in a postgres database.
It uses an angular frontend and express backend (mainly for interaction with the database)

Authentication is handled by firebase which is also used for deployment

The site is hosted on `https://film-database.co.uk`
The backend is hosted using elastic beanstalk and all api's can be found at `http://api.film-database.co.uk`

# Running
In order to run frontend, cd into `frontend` and run `ng serve` (other angular commands can be found in the readme in the `frontend` folder)
The frontend will by default call the hosted backend (not the localhost), in order to change this go into `frontend/src/app/services/film-data` and open `film-data.service.ts` and uncomment the `baseurl` line which references `localhost` (note: this should be changed back before merging to master/deploying)

The backend can be run by cding into `backend` and using command `node app.js`

# Deployment
This app uses firebase to deploy see https://firebase.google.com/docs/hosting/deploying for docs on how to deploy