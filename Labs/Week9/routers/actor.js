const mongoose = require('mongoose');
const Actor = require('../models/actor');
const Movie = require('../models/movie');
module.exports = {
    getAll: function (req, res) {
        Actor.find().populate('movies').exec(function (err, actors) {
            if (err) return res.status(404).json(err);
            res.json(actors);
        });
    },
    createOne: function (req, res) {
        let newActorDetails = req.body;
        newActorDetails._id = new mongoose.Types.ObjectId();
        let actor = new Actor(newActorDetails);
        actor.save(function (err) {
            res.json(actor);
        });
    },
    createMany: function (req, res) {
        let actorObjs = req.body;
        let n = new Date()
        const calcYear=(age)=>n.getFullYear()-age
        actorObjs.forEach(newActorDetails => {
            let actor = new Actor({_id: new mongoose.Types.ObjectId(),name: newActorDetails.name, bYear:calcYear(newActorDetails.currentAge)});
            actor.save(function (err) {
                if (err) return res.json(err);
        });
        res.status(201).json()
        });
    },
    getOne: function (req, res) {
        Actor.findOne({ _id: req.params.id })
            .populate('movies')
            .exec(function (err, actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();
                res.json(actor);
            });
    },
    updateOne: function (req, res) {
        Actor.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            res.json(actor);
        });
    },
    deleteOne: function (req, res) {
        let filter={ _id: req.params.id }
      
        Actor.findOneAndRemove(filter, function (err) {
            if (err) return res.status(400).json(err);
            res.json();
        });
    },
    addMovie: function (req, res) {
        Actor.findOne({ _id: req.params.id }, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            Movie.findOne({ _id: req.body.id }, function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                actor.movies.push(movie._id);
                actor.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(actor);
                });
                movie.actors.push(actor._id);
                movie.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.status(201).json();
                });
            })
        });
    },
    deleteCascade: function (req, res) {
        Actor.findOneAndDelete({ _id: req.params.id }, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            Movie.deleteMany({_id: {$in : actor.movies}}, function (err, movie) {
                if (err) return res.status(400).json(err);
                res.json()
            })
            });
            
        },
    deleteMovie: function (req, res) {
        Actor.findOne({ _id: req.params.actId }, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            let u={movies: actor.movies.filter((id)=>id!=req.params.movId)}
            Actor.findOneAndUpdate({_id:req.params.actId},
                u,(err,doc)=>res.json())
                
            });
            
        }
    }