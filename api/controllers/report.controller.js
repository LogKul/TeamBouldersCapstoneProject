const db = require("../models");
const Report = db.report;

exports.create = (req, res) => {
    // Save Report to Database
    Report.create({
        reported_user: req.body.reported_user,
        report_notes: req.body.report_notes,
        report_reason: req.body.report_reason
    })
        .then(report => {
            res.status(200).send({ id: report.id });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.read = (req, res) => {
    // Search for unique report in database
    Report.findOne({
        where: {
            id: req.query.id,
        }
    })
        .then(report => {
            if (!report) {
                return res.status(404).send({ message: "Report Not found." });
            }

            res.status(200).send({
                id: report.id,
                reported_user: report.reported_user,
                report_notes: report.report_notes,
                report_reason: report.report_reason
            });

        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.update = (req, res) => {
    // Update unique report in database
    Report.findOne({
        where: {
            id: req.query.id,
        }
    })
        .then(report => {
            report.set(req.body);
            report.save();

            res.status(200).send({ message: "Report was updated successfully!" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.delete = (req, res) => {
    // Delete report from database
    Report.destroy({
        where: {
            id: req.query.id,
        }
    })
        .then(() => {
            res.status(200).send({ message: "Report was deleted successfully!" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};