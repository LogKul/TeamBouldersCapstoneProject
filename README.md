# PlayCheckersNow

Senior Capstone Project for Team Boulders.
Website accessible [here](https://playcheckersnow.com/).

### Team Members
- Cody Cox
- Logan Kulesus
- Hudson Turner
- Jacob Hardman
<br></br>

## What is PlayCheckersNow.com?
This website is a combination of a Node.js/React client and Express.js, which allows users to play Checkers against an A.I. or other players. The API uses a RESTful architecture, and has security/functionality as a primary focus. Some notable features/functionalities of the website are:
- Register an account with proper regex username/password validation.
- Password Reset
- MMMR, and a public leaderboard
- Game histories of all users
- Online gameplay in real-time against other users
- Ability to play an A.I.
- Token authentication used to authenticate with the API. These tokens also act as refresh tokens, and are only stored as session data rather than stored in local storage.
- Rate limiting within the API
<br></br>

## How To Run
1. Install Node.js
2. Clone this repository
3. Within the /api directory, you will need to set environment variables within a .env file as follows:
   | Variable Name  | Variable Description  |
   | -------------- | --------------------- |
   | ORIGIN_ADDRESS | Address of Client App |
   | PG_USER        | Postgress DB Username |
   | PG_HOST        | URL of hosted PG DB   |
   | PG_DB          | Name of Postgres DB   |
   | PG_PASSWORD    | Postgres DB Password  |
   | PG_PORT        | Postgres DB Port      |
   | SECRET         | Encryption Key        |
   | S1             | Salt 1                |
   | S2             | Salt 2                |
   | PORT           | API Application Port  |

4. Within the /client directory, you will need to set environment variables within a .env file as follows:
   | Variable Name     | Variable Description  |
   | ----------------- | --------------------- |
   | REACT_APP_API_URL | Address of API App    |
   | REACT_APP_SECRET  | Encryption Key        |
   | REACT_APP_S1      | Salt 1                |
   | REACT_APP_S2      | Salt 2                |

5. In a CLI, run `npm install` within the /api directory
6. Also run `npm install` in a CLI within the /client directory
7. Begin running the API within the /api directory with the `npm run start` command, although `npm run devstart` is optional if you would prefer the API to restart automatically when changes in the code are detected (helpful for developers).
8. Begin running the client within the /client directory with the `npm run start` command.
<br></br>

## Frequently Asked Questions
>Q: I do not have a Postgres database. Will I still be able to run these applications without it?

A: No, a Postgres database is a requirement, unless if you change the API ORM yourself and rewrite the API.
<br></br>

>Q: When accessing the website, I am brought to a blank page stating that my browser is unavailable. What do I do?

A: As of right now, Internet Explorer is currently unsupported, so to access the website, you must use another browser such as Chrome, Firefox, or Safari.
<br></br>

>Q: Are they questions even real, or were they fabricated to appear legitimate?

A: These questions were fabricated, as we just wanted some excuses to add a little Markdown into our README file so that it looks really nice on GitHub.
<br></br>

>Q: Where can I access the live deployment of this Checkers website?

A: Right [here](https://playcheckersnow.com/)!
<br></br>