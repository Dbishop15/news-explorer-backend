# Final project: news-explorer-backend

## About the project

The idea of the application is pretty simple, creating a Full-stack application "News Explorer" with pixel-perfect design and strict guidelines. This is an advanced option. We'll provide a Figma layout and an API with instructions on how to use it. Then, you'll use these resources to create a full-stack application.

Two APIs:
The News API returns JSON data containing headlines, bylines, and other data from keyword searches.
A custom API for user authentication and saving articles.

## Technologies and Techniques

### Preparation

- Clone the back-end repository project-name-backend to your computer. Create a branch for the code of the first stage locally. Name it stage-back-end. Write all the code for the first stage in this branch.
- Add all necessary infrastructural project files: .gitignore, .editorconfig, .eslintrc. You can take these files from the se_project_express project.
- Initialize package.json with the npm init command

### Create API Resource Schemas and Models for user and article

### Create Routes and Controllers

- There should be two more routes in the API: registration and login.

At least 4 routes should be in the API:

- GET returning information about the logged-in user (email and name)
- GET returning data saved by the user
- POST creating a data object by the user
- DELETE removing the data object created by the user

### Implement Authentication and Authorization

- There should be two more routes in the API: registration and login

### Implement Logging

Set up two files for storing logs:

- request.log is for storing information about all API requests
- error.log is for storing information about errors returned by the API
  Logs must be in JSON format. Log files shouldn't be added to the repository.

### Deploy

- Create a server. Then, install everything you need and deploy the API there. It is important to implement access to the API through a public IP address. Previously, we accessed the server locally with a localhost address. This is fine during the development process, but it won't work for production. This is because you're the only one who can access your localhost server. As such, if you want your website to be accessed by other people, the server needs to be located somewhere else. We recommend using Google Cloud to create a cloud server. It offers a free trial for new users.
- Create a domain and attach it to the server. Assign the public IP address of your server to the domain. A free domain will do. You can register it by following this link. You already created a domain in the last sprint, so you should be familiar with the process. Readiness criterion: API can be accessed by the domain name.
- Issue certificates and attach them. It should be possible to access the server via https.
- Create an .env file on the server. Add environment variables to this file:
  NODE_ENV=production
  JWT_SECRET with a secret key for JWT creation and verification
  The .env file should only be stored on the server. You shouldn't store environment variables in the repository because it isn't safe.
  In development mode, the code should run and work without this file. Set the condition to run the dev build when process.env.NODE_ENV !== 'production'.

## Links

- Figma Design: https://www.figma.com/file/z1bxDn7eBEDlsDhnZ9dtin/Your-Final-Project?type=design&node-id=22618-1012&mode=design&t=f3xQ2LcrOLV97XcM-0
- Backend repo: https://github.com/Dbishop15/news-explorer-backend
- Frontend repo: https://github.com/Dbishop15/news-explorer-frontend

## Domain

- Front end: https://newsexplorer.servernux.com, https://www.newsexplorer.servernux.com,
- Back end: https://api.newsexplorer.servernux.com
