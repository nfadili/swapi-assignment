### Structure

-   The application is contained in the `app` directory
-   The API is contained in the `api` directory

### Running

The root of this project contains a `package.json` that defines the app and api as workspaces. It is easiest to do everything from the root of the project.

You must first install dependencies with `npm install`. You can then run everything from the root like so:

-   `npm start -w api`
-   `npm start -w app`

Once the app and api are running, visit http://localhost:3000
