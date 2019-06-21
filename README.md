# ASP.NET_Angular_UserTemplate
Template solution for a web application using Angular 6+ on the frontend and ASP.NET Core with Entity Framework Core backend. 
This template includes the ability to create new users, login, and logout (with JWT Authentication) through the frontend. The frontend uses Bootstrap 4 for styling.

TODO add screenshots

# Instructions
This project started as the Visual Studio built in ASP.NET Web Application with Angular template. I recommend using Visual Studio to build this project. 
If you cannot get this solution to load, simply create your own ASP.Net Angular template using VS, then copy the necessary files over. Keep in mind visual studio may change the connection port. I have added the ability to register users, 
login/logout with authentication, and block access to a test page when users are not logged in. Required NuGet Packages are:
- Microsoft.AspNetCore.App
- Microsoft.AspNetCore.Cors
- Microsoft.AspNetCore.Razor.Design
- Microsoft.EntityFrameworkCore
- Microsoft.EntityFrameworkCore.SqlServer
- Microsoft.NETCore.App

First, load the solution into Visual Studio and verify you can build the project, which should launch a browser and serve the frontend. 
To initialize the user database, first verify the local db connection string in `appsettings.json`. Then in a console:
- `Add-Migration -Context AuthenticationContext InitialCreate`
- `Update-Database -Context AuthenticationContext`
