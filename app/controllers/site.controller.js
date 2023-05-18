const Site = require("../models/site.model.js");

// Create and Save a new Site
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Site
  const site = new Site({
    siteName: req.body.Site.siteName,
   
  });

  // Save Site in the database
  Site.create(site, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Site."
      });
    else res.send(data);
  });
};

// Retrieve all Site from the database (with condition).
exports.findAll = (req, res) => {
  const siteName = req.query.siteName;

  Site.getAll(siteName, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Site."
      });
    else res.send(data);
  });
};

// Find a single Site by Id
exports.findOne = (req, res) => {
  Site.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Site with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Site with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};



// Update a Site identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Site.updateById(
    req.params.id,
    new Site(req.body.Site),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Site with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Site with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Site with the specified id in the request
exports.delete = (req, res) => {
  Site.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Site with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Site with id " + req.params.id
        });
      }
    } else res.send({ message: `Site was deleted successfully!` });
  });
};

// Delete all Site from the database.
exports.deleteAll = (req, res) => {
  Site.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Sites."
      });
    else res.send({ message: `All Sites were deleted successfully!` });
  });
};
