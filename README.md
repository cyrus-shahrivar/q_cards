# Introducing  Qcards!

## A modern way to share your business card!

### Original Authors: Kyle Gorjanc, Kate Shishkina, Cyrus Shahrivar
### Original Date: November 30, 2015
### Forked April 22, 2016

#### Technologies Used:
- ExpressJS
- MongoDB
- NodeJS
- NPM Modules
   - Morgan: For logging to terminal
   - Express-Session: Authentication and Sessions
   - Body-Parser: For retrieving data from front-end
   - Mongoose: Middleware for MongoDB
   - BCrypt: Hasing passwords
   - Formidable-Upload
   - FS
   - Util
   - Compression
   - Method-Override

#### Installation Instructions:
1. Clone the git repository to your own local machine.
2. Confirm that you have mongoDB, npm, and nodeJS prior to continuing.
3. Type `npm install` in your local repository to install all the npm modules and their dependencies mentioned above.
4. Run `mongod`, `mongo`, and `nodemon` in separate tabs from your terminal.
5. Confirm that those programs are working.
6. Open your browser and type `localhost:3000` in your search bar.
7. Play around! :)

#### Approach Taken:
We started out by brainstorming several mongoDB, nodeJS, and expressJS stack web application ideas.  We then landed on the idea that business cards waste a lot of paper and we want to reduce all that waste.  We came up with the concept that supplying people with the ability to share a QR code of their business card information would help reduce all that paper waste in the world.  

After coming up with an idea, we proceeded to develop user stories about what features we thought any given user would expect to have in such an application.  After user stories were developed, we created wireframe sketches of several of the views we thought would be need in the application.

Following those initial planning phases, we discussed how data should flow through the application.  We came up with some initial coding tasks for both the front-end and back-end development, and tried to test components as we added them.

We realized early on that the application would primarily be used with smart phones, so we created a front-end that is mobile-first.  The back-end development had several iterations of design, trying out a model-view-controller organizations and a routes-model organization.  The routes-model organization was the chosen structure we landed on.

Throughout the development we tried to enhance components in an iterative manner, getting something to work before pushing those edits to the development branch on our project repository.

#### User Stories and Wireframes Link
- https://trello.com/b/wEs4S9id/planning

#### Audience
- People who want to use less paper business cards in favor of a technological, mobile option.

#### Descriptions of Unsolved problems
- Adding a contact manually
  - We had some struggles figuring out an analogy to ruby on rails type updating of information that has already been put in the database (i.e. editing current user's info/posts/etc).  We had thought we could add the new contacts in the settings section, but did not come up with a final solution.
- Deployment to a hosted location on the web
