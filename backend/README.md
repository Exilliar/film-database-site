film database site endpoints

Current             Description                                                             ChangeTo
/			        basic alive check                                                       no changes

/api/getData		gets all films from blurays table	                                    /blurays/getAll
/api/removeFilm     removes one film from blurays table                                     /blurays/removeSingle
/api/addFilm        adds single film                                                        /blurays/addSingle
/api/updateWatched  updates the watched value of a single film in blurays table             /blurays/updateWatched

/api/getAllUsers	gets all users from users table                                         /users/getAll
/api/getUser        gets a given user, if user does not exist, a new user will be created   /users/getSingle

/api/roles/all      get all roles from roles table                                          /roles/getAll
/api/roles/update   updates role of a single given user                                     /roles/updateSingle