const siteTest = require('../models/site.model.js');
const { expect } = require("chai");

    describe("Save Site functionality", function () {
        it("check site already exist", async function () {
            const site =
            {

                "siteName": "test"

            };
           await siteTest.create(site, (err, data) => {
                if (err) {

                }
                else { }
                //console.log(data);
                expect(data).to.equal("Site name already exist");
                
            });
            
        });
        
    });
