var Actor = require('../../Week9/models/actor');
var Movie = require('../../Week9/models/movie');
const mongoose = require('mongoose');
module.exports = {
    getAll: function (req, res) {
        Movie.find().populate('actors').exec(function (err, movies) {
            if (err) return res.status(400).json(err);
            res.json(movies);
        });
    },
    createOne: function (req, res) {
        let newMovieDetails = req.body;
        newMovieDetails._id = new mongoose.Types.ObjectId();
        Movie.create(newMovieDetails, function (err, movie) {
            if (err) return res.status(400).json(err);
            res.json(movie);
        });
    },
    getOne: function (req, res) {
        Movie.findOne({ _id: req.params.id })
            .populate('actors')
            .exec(function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                res.json(movie);
            });
    },
    deleteOne: function (req, res) {
        Movie.findOneAndRemove({ _id: req.params.id }, function (err) {
            if (err) return res.status(400).json(err);
            res.json();
        });
    },
    updateOne: function (req, res) {
        Movie.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            res.json(movie);
        });
    },
    deleteActor: function (req, res) {
        Movie.findOne({ _id: req.params.movId }, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            let u={actors: movie.actors.filter((id)=>id!=req.params.actId)}
            Movie.findOneAndUpdate({_id:req.params.movId},
                u,(err,doc)=>res.json())
            });
            
        },
    addActor: function (req, res) {
        Movie.findOne({ _id: req.params.id }, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            Actor.findOne({ _id: req.body.id }, function (err, actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json('Actor not in database');
                movie.actors.push(actor._id);
                movie.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.status(201).json();
                });
                actor.movies.push(movie._id);
                actor.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.status(201).json();
                });

            })
        });
    },
    getYears: function (req, res) {
        Movie.where('year').lte( req.params.year1).gte(req.params.year2)
            .exec(function (err, movies) {
                if (err) return res.status(400).json(err);
                if (!movies) return res.status(404).json();
                res.json(movies);
            });
    },
    deleteYears: function (req, res) {
        details=req.params
        Movie.remove().where('year').lt(details.year).exec((err,movies)=>{
            if (err) return res.status(400).json(err)
            res.json()})
    }
            
};