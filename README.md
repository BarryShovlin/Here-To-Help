# Here-To-Help
Here To Help is an app for people looking to learn new home repair skills and help others learn from their experience. The goal of this app is to create a community of people to support each other while learning new skillsets.

## Setup
**Clone The Project**
From a terminal window, in any directory, run `git clone git@github.com:BarryShovlin/Here-To-Help.git`

## Firebase 
Create a Firebase project to have working authentication and authorization.

 - Go to [Firebase](https://firebase.google.com/) and create a project. Add authentication in the form of email/password to the project.
 - In the project settings you will need your `Project Id` and `Web API Key`
 
 ## Back-End Setup
 - Create a file In `Here-To-Help/` directory along side the `appsettings.json` file called `appsettings.Local.json` and add the following changing the FirebaseProjectId value to your Firebase Project Id
 ```
{
 "FirebaseProjectId": "********"
}
```
- From the root of the project, run the script `01_Db_Create.sql` to create the database.
- To access an account from the database create a user account in your Firebase project's auth section with the email address and set a password. Then replace the data in that user's FirebaseUserId column in the database with the id generated in your Firebase project
- Load `Here To Help.sln` in Visual Studio and press F5 to run the Here To Help server

## Front-End Setup
- Create a file in `Here To Help/client/` called `.env.local`
- In this file, paste REACT_APP_API_KEY=Web API Key, replacing "Web API Key" with your unique key from your Firebase project's project settings
- Run `npm install --save bootstrap reactstrap` in `Here To Help/client/` to install all dependencies
- To start the development server on `localhost:3000`, run npm start
- A browser window should open with the authentication page and you can enter the email and password you added in Firebase

# Technology Used
**Back-End**
- .NET 5
- ASP.NET Core
- Microsoft SQL Server

**Front-End**
- ReactJS
- Firebase Authentication
- Reactstrap
- Bootsrap
- CSS 

## Entity Relationship Diagram (ERD)
Created with [DBDiagram](dbdiagram.io)
![Here To Help](https://user-images.githubusercontent.com/24393892/147613032-f3553984-eb3e-43e2-ad57-a98a90deaab1.png)
