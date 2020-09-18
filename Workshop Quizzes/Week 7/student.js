const mongoose =require(mongoose)

const Teacher = require('../models/teacher');
const Student = require('../models/student');
module.exports = {

    addTeacher: function (req, res) {
        Student.findOne({ _id: req.params.sId }, function (err, student) {
            if (err) return res.status(400).json(err);
            if (!student) return res.status(404).json();
            Teacher.findOne({ _id: req.params.tId }, function (err, teacher) {
                if (err) return res.status(400).json(err);
                if (!teacher) return res.status(404).json();
                student.teachers.push(teacher._id);
                student.save(function (err) {
                    if (err) return res.status(500).json(err);
                    else res.send("Done "); //not sure about this
                });
            })
        }
        )
    }
}