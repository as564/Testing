let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app");

//Assertion Style
chai.should();

chai.use(chaiHttp);

describe('Roles API', () => {

    /**
     * Test the GET route
     */
    describe("GET ", () => {
        it("It should GET all the roles", (done) => {
            chai.request(server)
                .get("/roles")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('count');
                    response.body.should.have.property('data');
                    done();
                });
        });

        it("It should NOT GET all the tasks", (done) => {
            chai.request(server)
                .get("/role")
                .end((err, response) => {
                    response.should.have.status(404);
                    done();
                });
        });

    });
});

/**
     * Test the GET (by id) route
     */
 describe("GET /roles/:id", () => {
    it("It should GET a role by ID", (done) => {
        const roleId = "60507e577c72f9241cd66db6";
        chai.request(server)                
            .get("/roles/" + roleId)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('_id');
                response.body.should.have.property('name');
            done();
            });
    });

    it("It should NOT GET a role by ID", (done) => {
        const roleId = 123;
        chai.request(server)                
            .get("/roles/" + roleId)
            .end((err, response) => {
                response.should.have.status(500);
                response.body.should.have.property('error');
            done();
            });
    });

});

/**
     * Test the POST route
     */
describe("POST /roles", () => {
    it("It should POST a new role", (done) => {
        const role = {
            name: "Ram"
        };
        chai.request('http://localhost:3000')
            .post("/roles")
            .send(role)
            .end((err, response) => {
                response.should.have.status(201);
                response.body.should.be.a('object');
                response.body.should.have.property('message').eq("Role Created Succesfuly");
                done();
            });
    });

    it("It should NOT POST a new role without the name property", (done) => {
        const role = {
            completed: false
        };
        chai.request(server)
            .post("/roles")
            .send(role)
            .end((err, response) => {
                response.should.have.status(500);
                response.body.should.have.property('message').eq("\"name\" is required");
                done();
            });
    });

});

/**
     * Test the PUT route
     */
describe("PUT /roles/:id", () => {
    it("It should PUT an existing role", (done) => {
        const roleId = "60508464f815914078b2484d";
        const role = {
            name: "Aradala Jaswanthi"
        };
        chai.request(server)
            .put("/roles/" + roleId)
            .send(role)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('message').eq("Role Updated Succesfuly");
                response.body.should.have.property('requests');
                done();
            });
    });


});

/**
     * Test the DELETE route
     */
describe("DELETE /roles/:id", () => {
    it("It should DELETE an existing role", (done) => {
        const roleId = "60508464f815914078b2484d";
        chai.request(server)
            .delete("/roles/" + roleId)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.have.property('message').eq("Role Deleted Succesfuly");
                response.body.should.have.property('requests');
                done();
            });
    });

    it("It should NOT DELETE a role that is not in the database", (done) => {
        const roleId = 145;
        chai.request(server)
            .delete("/roles/" + roleId)
            .end((err, response) => {
                response.should.have.status(500);
                response.body.should.be.a('object');
                response.body.should.have.property('error');
                done();
            });
    });

});