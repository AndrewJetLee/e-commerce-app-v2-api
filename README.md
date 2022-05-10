<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/AndrewJetLee/e-commerce-app-v2-client/">
    <img src="https://github.com/AndrewJetLee/e-commerce-app-v2-client/blob/master/public/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">The Thread Bank (WIP)</h3>

  <p align="center">
    E-commerce web application
    <br />
    <a href="https://github.com/AndrewJetLee/e-commerce-app-v2-client/"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="">View Demo</a>
    ·
    <a href="https://github.com/AndrewJetLee/e-commerce-app-v2-client/issues">Report Bug</a>
    ·
    <a href="https://github.com/AndrewJetLee/e-commerce-app-v2-client/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#getting-started">Getting Started</a> </li>
    <li>
      <a href="#usage">Usage</a>
      <ul>
        <li><a href="#summary">Summary</a></li>
        <li><a href="#walkthrough">Walkthrough</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#optimizations">Optimizations</a></li>
    <li><a href="#lessons-learned">Lessons Learned</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project


![bt-homepage-image](https://user-images.githubusercontent.com/73206753/167056817-c5f933be-7e65-4245-8ff7-8c9f68f0d879.png)


An e-commerce web application that provides its users to browse for products, edit user personalized cart, and checkout securely. 


**Objectives:** 
* Create MERN application from scratch that utilizes a REST API
* Gain experience in user-authentication using JSON Web Token without the use of Passport strategies
* Solidify MVC architectural principles to better organize and structure code
* Employ global state management and data persistence using Redux
* Implement payment processing using Stripe


**Link to project:** https://github.com/AndrewJetLee/e-commerce-app-v2-client


### Built With

This section should list any major frameworks that you built your project using. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

* [React](https://reactjs.org/)
* [Node](https://nodejs.org/en/)
* [Express](https://expressjs.com/)
* [Styled Components](https://styled-components.com/)
* [Material UI](https://mui.com/)
* [Mongodb](https://www.mongodb.com/)
* [JWT](https://jwt.io/)
* [Stripe](https://stripe.com/)
* [Redux](https://redux.js.org/)


## Getting Started

**Note**: This application is currently not deployed as the API it consumes charges per request after a specific threshold. To safeguard against potential request spamming, this application must currently be set up locally. Refer to the .env_sample file to set up proper environmental variables and generate API keys from the links below for full functionality. 
* ASOS (https://rapidapi.com/apidojo/api/asos2) 
* Stripe (https://stripe.com/docs/keys) 


First, install the dependencies:


```bash
npm install
```

To start the client in development mode:

```bash
npm start
```

Or for production:

```bash
npm run build
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


**Note:** The client can run independently from the REST API server. The only features you will not be able to manage are anything related to user creation and authentication (registration, login, edit cart, etc...). To enable these features, start up the REST API server in https://github.com/AndrewJetLee/e-commerce-app-v2-api. 


<!-- USAGE EXAMPLES -->
## Usage


### Summary
An e-commerce web application for customers to browse for products, edit a user specific cart, and checkout securely. 


### Walkthrough


* Homepage contains multiple components that use Redux for global state storage and management while dynamically rendering depending on the state (e.g. Top navigation component account dropdown, favorite badge, cart badge, active tabs) 
* Carousel made from stratch without the use of a library. 
* Transitions and fade effects that animates between each section 


![bt-homepage](https://user-images.githubusercontent.com/73206753/167056406-a29700ce-7bd0-47de-80fb-04a7ee18eedc.gif)


* Reusable components were recycled in various pages (e.g. Products component as shown below renders a grid layout of product elements)
* Navbar search uses ASOS API to find queried results and renders results onto the product component


![bt-search-sort](https://user-images.githubusercontent.com/73206753/167323646-4b6b0ec5-0965-474e-8a36-21ed804bcf5a.gif)



* The tabs on the navbar can be clicked to go to different pages. The active tab has unique transitions and styling to indicate which tab the user is currently in. 
* Pages displaying products can be sorted using multiple parameters.


![bt-tab-load](https://user-images.githubusercontent.com/73206753/167324009-120aa0c5-1f47-47cf-b93f-7108cd16831c.gif)



* The register page incorporates clientside information validation using REGEX
* Clicking register with valid credentials toggles custom modal
* Encryption of sensitive information performed using Node's Crypto library


![bt-register-page-error-create](https://user-images.githubusercontent.com/73206753/167275785-3a71564b-afc6-47c5-b235-077076041375.gif)


* Login page uses redux global error state in the user slice for clientside error handling
* Serverside authentication uses JWT to generate access tokens upon login that are verified with each subsequent request in order to access protected user routes


![bt-login-page](https://user-images.githubusercontent.com/73206753/167276177-d6167c40-4b9d-4e2e-8405-d59617623251.gif)




* A MVC structured REST API was created using Node, MongoDB, and Mongoose to store and edit product, cart, user, and order data
* Clicking a product routes to the product page where the user can add the item onto a cart which is stored onto the database


![bt-product-page-add-cart](https://user-images.githubusercontent.com/73206753/167319100-a9846b8a-35ba-42d5-8e40-082bdb78255f.gif)


* Cart page has full CRUD functionality


![bt-cart-page-crud](https://user-images.githubusercontent.com/73206753/167319556-8430fe1a-0fbe-4f35-babf-5a1f150685ab.gif)



* Cart checkout uses Stripe for secure payment processing


![bt-cart-checkout](https://user-images.githubusercontent.com/73206753/167322502-71267997-ed71-4eab-823e-34118c01d3ce.gif)


![Stripe Checkout](https://user-images.githubusercontent.com/73206753/167322634-08ccb77c-145d-4a1c-8710-a1d100323d2f.png)




<!-- ROADMAP -->
## Roadmap

- [ ] Make Mobile Responsive
- [ ] Create user page for user customization
- [ ] Allow lists to be created for Manga and Characters
- [ ] Horizontal Load balancing 



See the [open issues](https://github.com/AndrewJetLee/e-commerce-app-v2-client/issues) for a list of proposed features (and known issues).


## Optimizations

<!-- You don't have to include this section but interviewers *love* that you can not only deliver a final product that looks great but also functions efficiently. Did you write something then refactor it later and the result was 5x faster than the original implementation? Did you cache your assets? Things that you write in this section are **GREAT** to bring up in interviews and you can use this section as reference when studying for technical interviews! -->

**Implemented:**
* Global state management reduced redundant code.
* Divided code in certain pages to separate react components to prevent the entire page from reloading on state changes on that specific component. Many of these components were also reused in various pages on the application.   


**Potential:**
* Considered implementing responsive images but higher resolution assets of the same images used requires a subscription fee.
* This project serves only as a showcase. If the application was intended to go live and expect higher web loads, horizontal scaling through multiple deployments of the server should be implemented. 
* NGINX can also be used as a load-balancer if performance needs to be further improved.
* Database indexing and caching may also be used if data capacity grows too large.



## Lessons Learned:

<!-- No matter what your experience level, being an engineer means continuously learning. Every time you build something you always have those *whoa this is awesome* or *fuck yeah I did it!* moments. This is where you should share those moments! Recruiters and interviewers love to see that you're self-aware and passionate about growing. -->

* First time working with Redux using Redux toolkit. Creating slices made working with Redux stores and reducers much easier and is now my preferred way of using Redux.
* Learned how to use JWT token based authentication. 
* Worked with more complex conditional logic, especially in relation to state dependent conditional CSS rendering of styled components. 
* Improved in modularizing repetitive code to reduce memory footprint.

<!-- CONTACT -->
## Contact

Andrew Lee - [linkedin](https://www.linkedin.com/in/andrewjetlee/) - andrewjetlee777@gmail.com

Project Link: [https://github.com/AndrewJetLee/e-commerce-app-v2-client/](https://github.com/AndrewJetLee/e-commerce-app-v2-client/)


