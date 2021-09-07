# Build Week 3 Linkedin Backend APIs
 We are going to create API for Linkedin APP. We are working in a team and we divide the in tasks.

 - We are using Trello board for the task management.
 - GitHub repo for the project and every team member using different branch 

### This project use the following stack:
- MongoDB ==> DB
- ExpressJS ==> API
- ReactJS ==> Frontend
- NodeJS ==> Server
- Use Mongoose

## # MODELS #

PROFILE Model:
```
 {
    "_id": "5d84937322b7b54d848eb41b", //server generated
    "name": "Diego",
    "surname": "Banovaz",
    "email": "diego@strive.school",
    "password": "Strive123",
    "bio": "SW ENG",
    "title": "COO @ Strive School",
    "area": "Berlin",
    "image": ..., //server generated on upload, set a default here
    "username": "admin",
    "createdAt": "2019-09-20T08:53:07.094Z", //server generated
    "updatedAt": "2019-09-20T09:00:46.977Z", //server generated
}
```

EXPERIENCE Model:
```
{
        "_id": "5d925e677360c41e0046d1f5",  //server generated
        "role": "CTO",
        "company": "Strive School",
        "startDate": "2019-06-16T22:00:00.000Z",
        "endDate": "2019-06-16T22:00:00.000Z", //could be null
        "description": "Doing stuff here and there",
        "area": "Berlin",
        "username": "admin",
        "createdAt": "2019-09-30T19:58:31.019Z",  //server generated
        "updatedAt": "2019-09-30T19:58:31.019Z",  //server generated
        "image": ... //server generated on upload, set a default here
    }
```

POST Model:
```
 {
    "_id": "5d93ac84b86e220017e76ae1", //server generated
    "text": "this is a text 12312 1 3 1",  <<--- THIS IS THE ONLY ONE YOU'LL BE SENDING!!!
    "username": "admin",
    "user": {
        "_id": "5d84937322b7b54d848eb41b", //server generated
        "name": "Diego",
        "surname": "Banovaz",
        "email": "diego@strive.school",
        "bio": "SW ENG",
        "title": "COO @ Strive School",
        "area": "Berlin",
        "image": ..., //server generated on upload, set a default here
        "username": "admin",
        "createdAt": "2019-09-20T08:53:07.094Z", //server generated
        "updatedAt": "2019-09-20T09:00:46.977Z", //server generated
    }
    "createdAt": "2019-10-01T19:44:04.496Z", //server generated
    "updatedAt": "2019-10-01T19:44:04.496Z", //server generated
    "image": ... //server generated on upload, set a default here
}
```

##  # API #
### PROFILES:
- GET https://yourapi.herokuapp.com/api/profile/
Retrieves list of profiles

- GET https://yourapi.herokuapp.com/api/profile/{userId}
Retrieves the profile with userId = {userId}

- POST https://yourapi.herokuapp.com/api/profile/
Create the user profile with all his details

- PUT https://yourapi.herokuapp.com/api/profile/
Update current user profile details

- POST https://yourapi.herokuapp.com/api/profile/{userId}/picture
Replace user profile picture (name = profile)

- GET https://yourapi.herokuapp.com/api/profile/{userId}/CV
Generates and download a PDF with the CV of the user (details, picture, experiences)

###  EXPERIENCE:
- GET https://yourapi.herokuapp.com/api/profile/userName/experiences
Get user experiences

- POST https://yourapi.herokuapp.com/api/profile/userName/experiences
Create an experience.

- GET https://yourapi.herokuapp.com/api/profile/userName/experiences/:expId
Get a specific experience

- PUT https://yourapi.herokuapp.com/api/profile/userName/experiences/:expId
Get a specific experience

- DELETE https://yourapi.herokuapp.com/api/profile/userName/experiences/:expId
Get a specific experience

- POST https://yourapi.herokuapp.com/api/profile/userName/experiences/:expId/picture
Change the experience picture

- GET https://yourapi.herokuapp.com/api/profile/userName/experiences/CSV
Download the experiences as a CSV

### POSTS:
 - GET https://yourapi.herokuapp.com/api/posts/
Retrieve posts

- POST https://yourapi.herokuapp.com/api/posts/
Creates a new post

- GET https://yourapi.herokuapp.com/api/posts/{postId}
Retrieves the specified post

- PUT https://yourapi.herokuapp.com/api/posts/{postId}
Edit a given post

- DELETE https://yourapi.herokuapp.com/api/posts/{postId}
Removes a post

- POST https://yourapi.herokuapp.com/api/posts/{postId}/image
Add an image to the post under the name of "post"

- POST https://striveschool-api.herokuapp.com/api/posts/{id}/like

Like the post for current user (each user can like only once per post)

- DELETE https://striveschool-api.herokuapp.com/api/posts/{id}/like

Remove the like for current user

- GET https://striveschool-api.herokuapp.com/api/posts/{id}/comment

Retrieve the list of comments for a given post

- POST https://striveschool-api.herokuapp.com/api/posts/{id}/comment

Create the a new comment for a given post

- DELETE https://striveschool-api.herokuapp.com/api/posts/{id}/comment/{commentId}

Deletes a given comment

- PUT https://striveschool-api.herokuapp.com/api/posts/{id}/comment/{commentId}

Edit a given comment


#EXTRA: Find a way to return also the user with the posts, in order to have the Name / Picture to show it correcly on the frontend

## # FRONTEND #
Frontend repo link: https://github.com/muarju/build-week-3-linkedin-frontend





