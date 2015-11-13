#scratch-track

#API Endpoints

note: 'id' always refers to whatever directly follows 'api' in the url
      ex. in api/users/:id/projects, 'id' refers to a user id
      ex. in api/projects/:id/notes, 'id' refers to a project id

*** api/users 
  
  GET - :/ - Retrieves all users info as JSON object, excluding their password.  ONLY for development - will be removed from production code.
  {
    users: [
      {
        id:
        first:
        last:
        email: 
      },
      ... 
    ]
  }

  POST - :/signup - Sends new user info as JSON object; instantiates new user instance, logs-in user
  {
    email:
    password:
    first:
    last:
  }

  POST - :/signin - Sends user info as JSON object; initiates verification & creates new session if user is verified.  Otherwise, redirects user to sign-up view.
  {
    email:
    password:
  }


*** api/users/:id - requires authentication - can only view :id path that corresponds to logged-in user

  GET - :/ - Retrieves all user info other than password.  A single user instance has the following fields:
    {
      id: Unique id for a user.
      first: User's first name.
      last: User's last name.
      email: User's email address

      //to be added later
      gender: Male/female/other.  Registered by a select menu.
      location: User's location.  Takes any input the user provides, similar to soundcloud (i.e. I can enter 'Bat City, TX' as my location instead of having to use a real location like 'Austin, TX').
    }

  PUT - :/ - Updates user's data; sends JSON objet with all fields, including those with values that are unchanged.
  {
    first:
    last:
    email:
  }

  GET - :/projects - Retrieves all projects for a specific user.
  {
    projects: [
      {
        id:
        owner_id:
        created_at:
        updated_at:
        name:
        description:
      },
      ...
    ]
  }

  GET - :/collaborations - Retrieves all projects' info for a specfic user for which they are a collaborators.
  {
    projects: [
      {
        id:
        owner_id:
        created_at:
        updated_at:
        name:
        description:
      },
      ...
    ]
  }   


*** api/projects/ - requires authentication, with exception of GET - :/
  
  GET - :/ - Retrieves all project files that can be accessed.  If user is lacking authentication, will retrieve only public projects.  
  { projects: [{project object}, etc.]}

  POST - :/:id - Sends a JSON object containing information for a new project, name and description are not required
    {
      owner_id:
      created_at:
      updated_at:
      name:
      description:
    }

  GET - :/:id - Retrives info for a specific project.
    {
      id:
      owner_id:
      created_at:
      updated_at:
      name:
      description:
    }

  PUT - :/:id - Updates project info for a specific project.
    {
      updated_at:
      name:
      description: 
    }

  DELETE - :/:id - Deletes a specific project.  Function it triggers will need logic to assess whether all collabos. have removed.  

  GET - :/:id/recordings - Retrieves all recordings for a specific project
  {
    recordings: [
      {
        id: 
        project_id: 
        url: 
        created_at: 
        name: 
        description: 
      },
      ...
    ]
  } 

  GET - :/:id/lyrics - Retrieves all lyrics for a specific project
  { 
    lyrics: [
      {
        id: 
        project_id: 
        text: 
        created_at: 
        name: 
      },
      ...
    ]    
  }


  GET - :/:id/stablature - Retrieves all stabs for a specific project
  { 
    stablature: [
      {
        id: 
        project_id: 
        code: 
        created_at: 
        name: 
        description: 
      },
      ...
    ]    
  }

  GET - :/:id/notes - Retrieves all notes for a specific project
  { 
    notes: [
      {
        id: 
        project_id: 
        text: 
        created_at: 
        name: 
      },
      ...
    ]    
  }


  *** api/recordings

    GET - :/:id - Retrieves a specific recording instance
      {
        project_id: 
        url: 
        created_at: 
        name: 
        description: 
      }

    PUT - :/:id - Updates a specific recording instance.
      {
        project_id: 
        url: 
        created_at: 
        name: 
        description: 
      }

    POST - :/ - Sends JSON object containing recording data for a specific project to create a new recording instance.  Will later be retrievable by using assigned :id.
      {
        project_id: 
        url: 
        created_at: 
        name: 
        description: 
      }

    DELETE - :/:id - Deletes a specific recording instance.


  *** api/lyrics

    GET - :/:id - Retrieves a specific lyrics instance.
     {
        project_id: 
        text: 
        created_at: 
        name: 
      }

    PUT - :/:id - Updates a specific lyrics instance.
      {
        project_id: 
        text: 
        created_at: 
        name: 
      }

    POST - :/ - Sends JSON object containing lyrics for a specific project.  Will later be retrievable by using assigned :id.
      {
        project_id: 
        text: 
        created_at: 
        name: 
      }

    DELETE - :/:id - Deletes a specific lyrics instance.


  *** api/stablature

    GET - :/:id - Retrieves a specific stab instance.
      {
        project_id: 
        code: 
        created_at: 
        name: 
        description: 
      }

    PUT - :/:id - Updates a specific stab instance.
      {
        project_id: 
        code: 
        created_at: 
        name: 
        description: 
      }

    POST - :/ - Sends JSON object containing stabs for a specific project.  Will later be retrievable by using assigned :id.
      {
        project_id: 
        code: 
        created_at: 
        name: 
        description: 
      }

    DELETE - :/:id - Deletes a specific stab instance.


  *** api/notes

    GET - :/:id - Retrieves a specific note instance.
      {
        project_id: 
        text: 
        created_at: 
        name: 
      }

    PUT - :/:id - Updates a specific note instance.
      {
        project_id: 
        text: 
        created_at: 
        name: 
      }

    POST - :/ - Sends JSON object containing note for a specific project.  Will later be retrievable by using assigned :id.
      {
        project_id: 
        text: 
        created_at: 
        name: 
      }

    DELETE - :/:id - Deletes a specific note instance.