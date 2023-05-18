const sql = require("./db.js");

// constructor
const Site = function (site) {
  this.siteName = site.siteName; 
};

Site.create = (newSite, result) => {
  if (newSite.siteName != undefined || newSite.siteName != null) {
    // check duplicate entry
    sql.query(`SELECT * FROM site WHERE siteName LIKE '%${newSite.siteName}%'`, (err, res) => {
      if (res.length) {
        result(null, "Site name already exist");
        return;

      }
      else {
        sql.query("INSERT INTO site SET ?", newSite, (err, res) => {
          if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }

          console.log("created site: ", { id: res.insertId, ...newSite });
          result(null, { id: res.insertId, ...newSite });
        });
      }
    });
  }
  else {
    result(null, "site name required");
    return;
  }

};

Site.findById = (id, result) => {
  sql.query(`SELECT * FROM site WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found site: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found site with the id
    result({ kind: "not_found" }, null);
  });
};

Site.getAll = (siteName, result) => {
  let query = "SELECT * FROM site";

  if (siteName) {
    query += ` WHERE siteName LIKE '%${siteName}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("sites: ", res);
    result(null, res);
  });
};



Site.updateById = (id, site, result) => {
  sql.query(
    "UPDATE site SET siteName = ? WHERE id = ?",
    [site.siteName, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found site with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated site: ", { id: id, ...site.siteName });
      result(null, { id: id, ...site });
      return
    }
  );
};

Site.remove = (id, result) => {
  sql.query("DELETE FROM site WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Site with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted site with id: ", id);
    result(null, res);
  });
};

Site.removeAll = result => {
  sql.query("DELETE FROM site", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} site`);
    result(null, res);
  });
};

module.exports = Site;
