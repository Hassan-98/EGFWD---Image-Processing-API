# Image Processing API
EGFWD Project 1 - Image Processing API by Hassan Ali


## Available Scripts

In the project directory, you can run:

### `npm run compile`

Compiles all typescript files from src folder to dist folder

### `npm run dev`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to access it in the browser.
The page will reload if you make edits.

Or use postman to test the api
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/9169065-72b6ad9a-9289-49dc-96f5-84557e4097f9?action=collection%2Ffork&collection-url=entityId%3D9169065-72b6ad9a-9289-49dc-96f5-84557e4097f9%26entityType%3Dcollection%26workspaceId%3D99d1bef6-e0d0-4c23-b4e6-2e28c0eb69ef)

### `npm test`

Launches the unit testing specs with jasmine.

### `npm run lint`

Uses Eslint and prettier to lint any code errors and beautify the code

### `npm run build`

Build the src typescript to production dist and lint and beautify any code errors 


## health checkpoint for the API
the health checker that can request to see that your app is working. <br />
`GET /status`
`curl -i http://localhost:3000/status`
