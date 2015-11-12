#scratch-track

/users - requires authentication
  
  GET - :/ - Retrieves all users info as JSON object, excluding their password.  ONLY for development - will be removed from production code.
  POST - :/signup - Sends new user info as JSON object; instantiates new user instance, logs-in user, and 
  POST - :/signin - Sends user info as JSON object; initiates verification & creates new session if user is verified.  Otherwise, redirects user to sign-up view.

/users/:id - requires authentication - can only view :id path that corresponds to logged-in user

  GET - :/ - Retrieves all user info other than password.  A single user instance has the following fields:
    {
      id: Unique id for a user.
      name_first: User's first name.
      name_last: User's last name.
      email: User's email address
      gender: Male/female/other.  Registered by a select menu.
      location: User's location.  Takes any input the user provides, similar to soundcloud (i.e. I can enter 'Bat City, TX' as my location instead of having to use a real location like 'Austin, TX').
    }
  PUT - :/ - Updates user's data; sends JSON object with only fields to be updated OR sends JSON objet with all fields, including those with values that are unchanged.
  GET - :/projects - Retrieves all projects' info for a specific user.  

/projects/ - requires authentication, with exception of GET - :/
  GET - :/ - Retrieves all project files that can be accessed.  If user is lacking authentication, will retrieve only public projects.  
    A single project instance contains the following fields:
      {
        id: Unique ID of the project
        name: The name of the project.
        author: The original creator of the project.
        public: Boolean indicating whether or not project is publically visible or not.
        collabs: Array listing all users with contributition rights for a specific project.
        recordings:
        lyrics:
        stabs:
      }
  POST - :/:id - Sends a JSON object containing information for a new project
  GET - :/:id - Retrives all project info for a specific project.
  PUT - :/:id - Updates project info for a specific project.
  DELETE - :/:id - Deletes a specific project.  Function it triggers will need logic to assess whether all collabos. have removed.
  GET - :/:id/collaborations - Retrieves all projects' info for a specfic user for which other users have been added as collaborators.
  GET - :/:id/recordings - Retrieves all recordings for a specific user across all of that user's projects.
  GET - :/:id/lyrics - Retrieves all lyrics for a specific user across all of that user's projects.

  *---- ARE THE BELOW PATHS SUB-DIRS OF PROJECTS OR ARE THEY SPECIFIC PATHS??? ----*

  /recordings

    GET - :/:id - Retrieves a specific recording instance.
    PUT - :/:id - Updates a specific recording instance.
    POST - :/ - Sends JSON object containing recording data for a specific project to create a new recording instance.  Will later be retrievable by using assigned :id.
    DELETE - :/:id - Deletes a specific recording instance.

  /lyrics

    GET - :/:id - Retrieves a specific lyrics instance.
    PUT - :/:id - Updates a specific lyrics instance.
    POST - :/ - Sends JSON object containing lyrics for a specific project.  Will later be retrievable by using assigned :id.
    DELETE - :/:id - Deletes a specific lyrics instance.

  /stablature

   GET - :/:id - Retrieves a specific stab instance.
    PUT - :/:id - Updates a specific stab instance.
    POST - :/ - Sends JSON object containing stabs for a specific project.  Will later be retrievable by using assigned :id.
    DELETE - :/:id - Deletes a specific stab instance.
