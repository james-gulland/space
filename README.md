<h1>Project 2: Journal In Space</h1>

<h2>Project Overview</h2>

The second GA Software Engineering immersive course project was in week 7 of the course, with the brief of building a React app that consumes a public API.  We chose an Open API provided by NASA called Astronomy Picture of the Day (APOD), which updates daily with NASA photography, an explanation, along with other data, that we would display in our React app and then deploy to the web.

<h3>Deployment link</h3>

https://journalinspace.com/

![My Image](src/images/nasa2.png)

<h3>Timeframe & Working Team</h3>

This project was working in a pair with a duration of 2 days (1.5 effective days of coding) for completion.  I worked with fellow General Assembly member Ali Abed-Ali. 

<h3>Technologies Used</h3>

- React.js (using Hooks such as useState and useEffects)
- SASS/SCSS
- HTML5
- Axios (HTTP Client for node.js and the browser)
- DatePicker
- VS Code
- Excalidraw (UX wireframing)
- Insomnia (API testing)
- Netlify
- Git & GitHub

<h2>The Brief</h2>

- Build a React application that consumes a public API.
- Have several components
- The app can have a router with several ‘pages’
- Include wireframes - that you designed before building the app.
- Be deployed online and accessible to the public (hosted on your public github)

<h2>Planning</h2>

<b>Step 1: Exploring Ideas</b>

First, we brainstormed our interests to see where they overlapped. Quickly, we discovered our shared love for space and instinctively turned to NASA's Open APIs. While we had backup ideas centred around football, cars, and plants, the space theme emerged as our clear favourite.

When consulting all these options, we checked out a number of public APIs that we could consume; to check the structure of the APIs, understand what data we can use, how easy or tricky it would be to use, which helped us formulate some ideas for the concept of the app.

Below is a snapshot of what the NASA API looked like:

![My Image](src/images/image14.png)

<b>Step 2: Formulating the concept</b>

Once established that the NASA APIs were the ones we wanted to use, we then formulated the concept and vision for the app, given what we knew about the APIs.  The NASA API in question was called the Astronomy Picture of the Day (APOD) API and it was a fairly basic but very interesting API that provided daily assets of high quality images and an associated explanation, along with a few other bits of detail.

From this, we thought of the idea of a ‘space journal’; that provided a daily update of content in what looked like a journal, in a NASA-branded space theme.  The homepage would be today's update, and it would be possible to cycle through previous and next days, as well as have a random date feature.

<b>Step 3: Creating the Wireframe</b>

Creation of wireframe based on the above vision and requirements, at a high-level - which would help define the HTML and SASS of the page, along with what potential functionality would be needed.

![My Image](src/images/image7.png)

<b>Step 4: Defining the MVP</b>

For our minimum product, we wanted the ability to show at the very least the main content (being the title, date, image and explanation) with the ability to show previous and next items, and the ability to choose a date from a date picker, all being consumed directly from the API.  Each request would require calling the current date’s data, as well as the previous and next day’s data, to be displayed on the React app.

The post-MVP items (if we had time) would be to add a ‘random’ journal entry, and adding a sound option (with the ability to turn an atmospheric soundtrack on and off).





