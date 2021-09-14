const express = require('express');
const router = express.Router();
const axios = require("axios");
const db = require('../models');

const isLoggedIn = require('../middleware/isLoggedIn');

const APIKey = process.env.API_KEY;

router.get('/', async (req, res)=>{
    try {
        const {id} = req.user.get();
        const allMovies = await db.Movie.findAll({
            where: {userId: id}
        });

        res.render('movies/index', {allMovies});
    } catch (err) {
        console.log(err);
    }
})


router.get('/search', (req, res) => {
    res.render('movies/search')
})
router.get('/results', async (req, res) => {
    console.log(req.query.search);
    const results = await axios.get(`http://www.omdbapi.com/?apikey=${APIKey}&s=${req.query.search}`)

    console.log(results.data.Search)

    //routes the browser to/or renders the view '/results' as well it passes in the 'Movie' '/results' data
    res.render('movies/results', { movieResults: results.data.Search ? results.data.Search : [] }); 
})
router.get('/new', (req, res) => {
    res.render('movies/new')
})

router.post('/favorites', isLoggedIn, async (req, res) => {
    try {
        const {id} = req.user.get();
        const {title, description, review} = req.body;

        
        const currentUser = await db.User.findOne({
            where: {id}
        });

        const newMovie = await currentUser.createMovie({title, description, review});
        console.log(newMovie);

        const newFavorite = await db.Favorites.create({
            userId: id, 
            movieId: newMovie.id
        });
        
        console.log(newFavorite);
        res.redirect('/');

    } catch (err) {
        console.log(err);
    }
})


router.post('/new', async (req, res) => {
    const createMovie = await db.Movie.findOrCreate({
        where: {title: req.body.title},
        defaults: {review: req.body.review, description: req.body.description, userId: req.user?req.user.id:1}
    })
    res.redirect('/movies')
    console.log(req.body)
})

router.put('/update', (req, res) => {
    console.log(req.body.updateDescription)
    console.log("updateDescription")
    console.log(req.body.updateReview)
    console.log("updateReview")
    console.log(req.body.movieId)
    db.movie.update(
        {
            description: req.body.updateDescription,
            review: req.body.updateReview
        },
        { where: {id: req.body.movieId} }
    ).then(updatedMovie => {
        console.log("updated movie")
        console.log(updatedMovie)
        res.redirect('/movies')
    })
})

router.delete('/delete', (req, res)=> {
    db.Movie.destroy(
        { where: {id: req.body.delete} }
    ).then(deletedMovie => {
        console.log("movie has been successfully deleted")
        res.redirect('/movies')
    })
})
module.exports = router;