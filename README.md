# Github_explorer
Github explorer:
- Lists the repositories for a given git user.
- On selecting a user repository, displays a chart of number of contributions per user in descending order.
- Developed using react/FLUX

Project structure:

 .
 
    ├── dist                 
    ├── src                      
    ├── webpack.config.json                  
    ├── package.json
    
    └── README.md

Prerequisites : 
- node 
- npm

To install dependencies:
$ npm install

To run:
$ npm start

The project will run at http://localhost:8080/

API Reference :
https://api.github.com/users
https://api.github.com/repos

Issues :
- Using ES6, does not render in IE.
- github API limits GET to 30 records (max 100), So replaced typeahead with normal text search.
