<!-- omit from toc -->
# IUT LLIS
  
[![GitHub license](https://img.shields.io/github/license/Talha76/IUT_LLIS)](LICENSE) ![Commit count](https://img.shields.io/github/commit-activity/t/talha76/iut_llis) [![GitHub issues](https://img.shields.io/github/issues/Talha76/IUT_LLIS)](ISSUES) [![GitHub pull requests](https://img.shields.io/github/issues-pr/Talha76/IUT_LLIS)](PULL_REQUESTS) [![GitHub contributors](https://img.shields.io/github/contributors/Talha76/IUT_LLIS)](CONTRIBUTORS) ![GitHub last commit](https://img.shields.io/github/last-commit/Talha76/IUT_LLIS)
![GitHub repo size](https://img.shields.io/github/repo-size/Talha76/IUT_LLIS) ![GitHub code size](https://img.shields.io/github/languages/code-size/Talha76/IUT_LLIS) [![GitHub language count](https://img.shields.io/github/languages/count/Talha76/IUT_LLIS)](LANGUAGE_COUNT) [![GitHub top language](https://img.shields.io/github/languages/top/Talha76/IUT_LLIS)](TOP_LANGUAGE)

<!-- omit from toc -->
## Project Description

This project is a web application for the management of leave and late forms information in IUT Female Halls of Residence. This project is still in development phase. This project is developed using **Express.js** framework for **Node.js** and **PostgreSQL** as a database.

<!-- omit from toc -->
## Table of Contents

- [How to Install the Project](#how-to-install-the-project)
- [How to Use the Project](#how-to-use-the-project)
- [How to Contribute](#how-to-contribute)
- [Technologies used](#technologies-used)
- [Documentation](#documentation)
  - [config files (path: path/to/your/project/config)](#config-files-path-pathtoyourprojectconfig)

## How to Install the Project

1. Clone the project using `git clone https://github.com/Talha76/IUT_LLIS.git`.
2. Change directory to the project directory using `cd IUT_LLIS`.
3. Run command `npm install` or `npm i` to install all the dependencies.
4. Then you need to create a `.env` file in the root directory of the project. This file contains all the environment variables. You can copy the contents of [.env.example](https://github.com/Talha76/IUT_LLIS/blob/main/.env.example) file and paste it in `.env` file. Then you need to fill the values of all the environment variables.
5. Now you are fully ready to run the project using `npm start` command.

## How to Use the Project

1. Start the localhost server using `npm start` command.
2. Now, the website is ready to use at <http://localhost:3000/>.

## How to Contribute

1. Fork the project using [this link](https://github.com/Talha76/IUT_LLIS/fork).
2. Now clone using `git clone https://github.com/[your_username]/IUT_LLIS.git`.
3. Install the node modules and create environment variables as mentioned in [how to install the project](#how-to-install-the-project) section.
4. For further references, read [technologies](#technologies-used) and [documentation](#documentation) section.
5. Now you are ready to contribute to the project.

## Technologies used

- [Node.js](https://nodejs.org/en/) as the main backend framework.
- [@sendgrid/mail](https://www.npmjs.com/package/@sendgrid/mail) for sending emails.
- [bcryptjs](https://www.npmjs.com/package/bcryptjs) for hashing the passwords.
- [body-parser](https://www.npmjs.com/package/body-parser) for parsing the request body.
- [cheerio](https://www.npmjs.com/package/cheerio) for parsing the HTML.
- [connect-flash](https://www.npmjs.com/package/connect-flash) for flash messages.
- [dotenv](https://www.npmjs.com/package/dotenv) for loading environment variables.
- [ejs](https://www.npmjs.com/package/ejs) as the main view engine.
- [express](https://expressjs.com/) as the main app framework.
- [express-session](https://www.npmjs.com/package/express-session) for session management.
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) for generating JSON web tokens.
- [nodemon](https://www.npmjs.com/package/nodemon) for automatically restarting the server.
- [passport](https://www.npmjs.com/package/passport), [passport-local](https://www.npmjs.com/package/passport-local), [passport-jwt](https://www.npmjs.com/package/passport-jwt) for authentication.
- [pdfkit](https://www.npmjs.com/package/pdfkit) for generating PDFs.
- [pg](https://www.npmjs.com/package/pg) for connecting to PostgreSQL database.

## Documentation

### config files (path: path/to/your/project/config)

- [database.config](https://github.com/Talha76/IUT_LLIS/blob/main/config/database.config.js): This file contains the configuration and APIs for connecting to the PostgreSQL database. This file provides following APIs:
  1. [pool](https://github.com/Talha76/IUT_LLIS/blob/main/config/database.config.js#L4): This is the connection pool for the PostgreSQL database.
