# busschedules
Timetable scrapper built in Node with front-end layer.

In the frontend I tried to implement some kind of MVC-like architecture. But it was a naive attempt, code is very messy. I didn't use any observer pattern whatsoever, and there is only one fat-View. HTML file should also be divided into separate, smaller ones.
Today I would've done it differently.

Used tools, libraries, techniques etc. : 
* Backend: Node.js, Express, Cherio, Compression
* Frontend: Gulp, Webpack, SASS, BEM methodology

[Live link](https://safe-inlet-31992.herokuapp.com/) - first connection always takes up much longer than should have in reality. It's because heroku puts app to sleep after 30 mins of inactivity.
