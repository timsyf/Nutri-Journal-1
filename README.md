# Nutri-Journal

## Project Brief
**MVP - Minimum Viable Product** 
- **Build a web application using create-react-app / vite or next.js**. Must be
  your own work.
- **Use React framework** to build your application with _at least_
  - 3 components
  - 4 props
  - 2 state properties
  - 2 setState
  - 2 routes
- **Use 3rd party API and/or Firestore**
  - API call with Axios and display the data for the user. You may use any API
    of your choosing.
- **Craft a `README.md` file that explains your app** to the world.
- **Create wireframes** for your app and include it in your repo/readme.

**Stretch Goals (Not Mandatory)**
- You may also opt to use Firebase/Firestore if you need to store data.

## Description

A lightweight, customizable single-page personal portfolio website template built with React and Github API, to showcase my personal experiences and work which I have deployed using Vercel. Portfolio websites are an easy way to promote myself and my brand, while allowing potential employers to have an insight into my personality and character.

### Technical Used
For this project, I used the following technologies:

```
- React
- Bootstrap with react
- Ajax (axios) for API
- Postman
```

### Wireframes

For my wireframe, I used Figma to create an initial skeleton of what it will look like:

![Wireframe Part 1](https://github.com/chrysaliswoon/chrysalis-portfolio/blob/main/src/Image%20Assets/Wireframe.png?raw=true)

Afterwards, I then created a prototype using the initial wireframe as the baseline. You may view the complete wireframe [here](https://www.figma.com/file/4JNzFNUO03sj0ErejCZmB3/Portfolio-Website-V2?node-id=0%3A1)


### User Stories


![User Persona](https://github.com/chrysaliswoon/chrysalis-portfolio/blob/main/src/Image%20Assets/userPersona.png?raw=true)


---

## Planning and Development Process

We had approximately 3 weeks from ideation to creation to develop our web application using React. Below is a rough estimation of how I had broken down my task lists:

**Week 1**

1. Set up the Github Repository using the template given in the project page

2. Identified the API to be used and how it will be integrated into the site (GitHub API)

3. Deployed project on Vercel

4. Created initial component pages based on Wireframe

5. Used props for the buttons

6. Rendered the Github API content on the page in a list format

7. Created a form asking for userinput which will then produce an output welcoming them with their name

8. Npm installed window scroll hook and implementing that in my links: https://justinmahar.github.io/react-use-window-scroll/ 

9. Fixed the links for github and live site under ""Explore My Work""

10. Using React Router to control which job experiences description appear when users click on it

**Week 2**

1. Used React Router so users can navigate between various components

2. Rendered the Experiences portion of the homepage

3. Created a Contact Me form by embedding Paperform

4. Removed Link routes for Experiences component page

5. Create child components for Experiences parent component

6. Used React Anchor Link Smooth Scroll so when the user clicks on the links in the navigation bar, it should move down to the correct pagel: https://www.npmjs.com/package/react-anchor-link-smooth-scroll 

7. Cleaned up my files and codes so it's readable and easily accesible

8. Used state to change which job description will show depending on which company is clicked

9. Render the first object in the job experience array instead of it showing empty and remove the | beside the job title

10. Created the Welcome page which will get a random motivational quote from a Motivational Quote API

11. Created the flow from Welcome page --> Loader page: After it welcomes the user, it will wait for 1 second before going to the Motivational quote page.

12. Created the flow from Loader page --> Homepage:  3 seconds after it lands on the motivational quote page, it will go to the homepage

13. Welcomes the user after the user inputs their name and clicks on the button so the flow will be:
User inputs name --> Welcome {user input} --> Motivational Quote (Loading screen) --> Homepage

**Week 3**

1. Update README with wireframes and user personas

2. Use CSS to design the whole project

3.  Check that everything is working

### Problem-Solving Strategy

In order to have clarity on what was required to create the project, my first priority was creating a wireframe and a working prototype to have a visual of how everything would flow. By creating a wireframe, it also allowed me to see what components and pages I would need to create my project. 

Before implementing a new feature, I would use another test-project file to see how it works before transferring the code over to the master file. This allowed me to test out certain blocks of codes without it affecting the main site. 

As my intention is for my peers and other users to be able to fork this and edit the contents according to their needs, I had to think about how to break things down further into reusable components so it will be easy for other users to navigate my code and edit it according to their use case. 

### Unsolved problems

Currently the website is structured to be in separate routes to fulfill the above project requirements. However, ideally all of the component pages will be under one main component page with only one route.

## APIs Used

- [Github API](https://docs.github.com/en/rest)
- [Motivational Quote API](https://api.quotable.io/random)

---

## Acknowledgments

I would like to thank Simon, [Michael](https://github.com/MichaelKalamogan/) and Min Shan for their advice and guidance throughout this project. It was through this process I understood the importance of clean coding and how to break a huge task into smaller actionable tasks for me to tackle each day. 

---

 ## References
 
 - https://codewithnico.com/react-wait-axios-to-render/
 - https://imjoshellis.com/
 - https://medium.com/swlh/building-controlled-forms-using-functional-components-in-react-965d033a89bd