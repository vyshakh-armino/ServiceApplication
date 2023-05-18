module.exports = app => {
    const site = require("../controllers/site.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Site
    router.post("/CreateSite", site.create);
  
    // Retrieve all sites
    router.get("/GetAllSite", site.findAll);
  
    // Retrieve a single site with id
    router.get("/GetSiteById/:id", site.findOne);
  
    // Update a Site with id
    router.put("/UpdateSite/:id", site.update);
  
    // Delete a Site with id
    router.delete("/DeleteSite/:id", site.delete);
  
    // Delete all sites
    router.delete("/DeleteAllSite", site.deleteAll);
  
    app.use('/api/site', router);
  };
  