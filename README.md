# `Movie Fans App`

## Description: 

Add your top favorite movies to a list for others to get inspired to watch a movie they haven't watched before. This is where they can come to for ideas on what movie to watch next.


## Purpose Of This App:

 A feature where you will be able to add your top favorite list of movies. To add a description about the movie, thoughts and your rating for the movie. You can also make changes/delete the movies that are no longer in your top favorite movie list and add your new top favorite movies.

## How To Access This App

Simply click on the link below and it will directly send you to the app for use:
https://moviefansapp.herokuapp.com/

## Technology Used, Languages, Packages and Frameworks

Movie Fans App is a full-stack app, built primarily using:

- Node 
- Authentication: Passport
- Express.js 
- Data Storage and Processing: Postgres, Sequelize
Other languages that were utilized include: 
- HTML
- CSS
- JavaScript
- Templating Engine: EJS
- SQL
- OMDb API, fetching with Axios
- Encryption: Bcrypt

## Routes:

| Method | Path | Location | Purpose |
| ------ | ---------------- | -------------- | ------------------- |
| GET | / | server.js | Home page |
| GET | /auth/login | auth.js | Login form |
| GET | /auth/signup | auth.js | Signup form |
| POST | /auth/login | auth.js | Login user |
| POST | /auth/signup | auth.js | Creates User |
| GET | /auth/logout | auth.js | Removes session info |
| GET | /profile | server.js | Regular User Profile |
| GET | /movies/search | search.js | Search favorite movies |
| GET | /movies/results | results.js | results of movies searched |
| GET | /movies/new | new.js | AddS To Favorites Movie List: Title, Description, Review  |
| PUT | /movies/update | favorites.js | Updated Description, Review & Movie
| DELETE | /movies/delete | favorites.js | Successfully deletes movie from favorites list | 

## The Home Page

![](https://i.imgur.com/rQ6jL4u.jpg)

## The Search Page & Add To Your Favorites List

![](https://i.imgur.com/zvh7eOV.png)

## Add Your Favorite Movie Title, Description & Your Review

![](https://i.imgur.com/9I7jf89.png)

## In the movies tab:
A list of your favorite movies. 
-   You can edit/make an update to your description about the movie.
-   Edit your reviews.
-   Delete movies, descriptions and reviews to add new ones.

![](https://i.imgur.com/kGadwgX.png)

## Models:

### User Model
| Column Name | Data Type | Notes|
| --------- | ---------------- | -------------- | 
| id | | integer | Serial primary key - auto generated |
| name | string | must be provided |
| email | string | must be unique, used for login |
| password | string | stored as a hash |
| createdAt | date | auto generated |
| updatedAt | date | auto generated |

### Movie Model
| Column Name | Data Type | Notes|
| --------- | ---------------- | -------------- | 
| id | | integer | Serial primary key - auto generated |
| title | string | movie title |
| description | string | movie description |
| review | integer | review of the movie |
| userId | integer | based on user logged in |
| createdAt | date | auto generated |
| updatedAt | date | auto generated |

### Favorites Model
| Column Name | Data Type | Notes|
| --------- | ---------------- | -------------- | 
| id | | integer | Serial primary key - auto generated |
| userId | integer | based on user logged in |
| movieId | integer | based on movieId from API |
| createdAt | date | auto generated |
| updatedAt | date | auto generated |

## Code Snippet on Fetching Data Movies From OMDb API
```
router.get('/results', async (req, res) => {
    console.log(req.query.search);
    const results = await axios.get(`http://www.omdbapi.com/?apikey=${APIKey}&s=${req.query.search}`)

    console.log(results.data.Search)

    //routes the browser to/or renders the view '/results' as well it passes in the 'Movie' '/results' data
    res.render('movies/results', { movieResults: results.data.Search ? results.data.Search : [] }); 
})
```
## Conclusion

While creating this app, I must say I have come across many blockers and bugs and was quite challenging. But overall, I had so much fun doing this. I've learned to know how to read the bugs and to find a solution to fix them. Everyday, I will always be learning something new and will come across more bugs. I'm prepared for whatever obstacle is coming my way! That's how we learn and get better at the things that we do. In the future, I hope to add in a little more fun designs and features to this app. Creating more routes to play the theme music/iconic music of each movie to make it more entertaining when after user searches for their favorite movies. Also, I would like to thank my wonderful TA's that helped me through certain concepts of my project. Because of them, I was able to take what I have learned to build this interesting app! 