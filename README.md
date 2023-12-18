# Sofia Park Theatre
* An exam project by <strong>Stelian Kasabov</strong> for the <strong>ReactJS - October 2023</strong> course.
<div style="text-align: center;"><img src="client\public\slogan.png" width="500">
    <p style="text-align: center; width: 400px; display: block; margin: auto; padding-bottom: 50px;"><em>Whether you like serious dramas, hit comedies, or a sold-out award-winning plays, we bring you unmissable theatre, filmed live from Bulgaria’s most exciting stages, and shown on big cinema screens in the parks of Sofia.</em></p>
</div>


"Sofia Park Theatre" is a web application created to broadcast stage plays on cinema screens located in the green spaces of Bulgaria's capital. This platform enables users to explore a diverse collection of performances, access comprehensive details about each play, and manage their stage play reservations efficiently. Boasting a clean and intuitive interface, the app offers functionalities like searching for shows, bookmarking favorite performances, and facilitating reservation processes. Additionally, it incorporates convenient features such as pagination, sorting, and filtering to enhance the user experience.

# Features
* Browse Theatrical Productions: Users can peruse a list of theatrical performances, each represented by a card featuring key details.


* Play Details: Selecting a play card reveals a detailed view with extensive information about the production.
* Update Plays: Admin users have the capability to modify the collection by adding or editing stage plays<!--- , either manually or through automatic fetching of details from the OMDB API using IMDb tags or titles. -->
* Favorites: Users can add plays to their favorites for easier future access.
* Reservations: Registered users have the option to reserve seats for performances.
* Reviews: Registered users can post reviews in the play details section.
* User Authentication: The application supports user registration, login, and authentication processes.

# Technologies Used
* React: Employed for crafting the user interface - [Link](https://react.dev/).
* Tailwind CSS: Utilized for component styling - [Link](https://tailwindcss.com/).
* Vite: Used as the build tool for React applications - [Link](https://vitejs.dev/).
* React Router: Implemented for managing in-app navigation - [Link](https://reactrouter.com/en/main).
<!--- * OMDB API: Integrated for retrieving details of productions using IMDb tags or titles - [Link](https://www.omdbapi.com/). -->

# Setup and Installation
1. Clone the repository - [Link](https://github.com/steliankasabov/ReactJS-Exam-Project).
2. Navigate to the project directory and install necessary dependencies:
* cd client
* npm install
* npm run dev
3. Launch the development server (softuni-practice-server) [Link](https://github.com/softuni-practice-server/softuni-practice-server):
* cd server
* node server.js

# Admin Usage
* For access to administrative features, log in using:
* Email: admin@abv.bg
* Password: admin
* On the "Programme" page, administrative tools for adding, editing, and deleting plays from the collection are available.

# User Usage
* The service is initialized with three users, which can be used for immediate testing:
* peter@abv.bg : 123456
* george@abv.bg : 123456