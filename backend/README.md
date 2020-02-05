Film Database Site endpoints

Endpoint                    Description
/			                basic alive check

/blurays/getAll		        gets all films from blurays table
/blurays/removeSingle       removes one film from blurays table
/blurays/addSingle          adds single film
/blurays/updateWatched      updates the watched value of a single film in blurays table

/users/getAll	            gets all users from users table
/users/getSingle            gets a given user, if user does not exist, a new user will be created

/roles/getAll               get all roles from roles table
/roles/updateSingle         updates role of a single given user