let chai = require("chai");
let chaiHttp = require("chai-http");


//Assertion Style
chai.should();

chai.use(chaiHttp);

describe('Users API', () => {

    /**
     * Test the GET route
     */
    describe("GET", () => {
        it("It should GET all the users", (done) => {
            chai.request("https://reqres.in/api/users")
                .get("")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('page').eq(1);
                    response.body.should.have.property('per_page').eq(6);
                    response.body.should.have.property('total').eq(12);
                    response.body.should.have.property('total_pages').eq(2);
                    response.body.should.have.property('data');
                    response.body.should.have.property('support');
                    done();
                });
        });

        it("It should NOT GET all the users", (done) => {
            chai.request("https://reqres.in/api/users")
                .get("/1we")
                .end((err, response) => {
                    response.should.have.status(404);
                    response.body.should.be.a('object');
                    done();
                });
        });

    });

});

/**
     * Test the GET (by id) route
     */
describe("GET /api/users/:id", () => {
    it("It should GET a user by ID", (done) => {
        const taskId = 1;
        chai.request("https://reqres.in/api/users")
            .get("/" + taskId)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('data');
                response.body.should.have.property('support');
                done();
            });
    });

    it("It should NOT GET a task by ID", (done) => {
        const taskId = "123a4";
        chai.request("https://reqres.in/api/users")
            .get("/" + taskId)
            .end((err, response) => {
                response.should.have.status(404);
                response.body.should.be.a('object');
                done();
            });
    });

    /**
     * Test the POST route
     */
    describe("POST", () => {
        it("It should POST a new task", (done) => {
            const task = {
                title: 'foo',
                body: 'bar',
                userId: 1
            };
            chai.request("https://reqres.in/api/users")
                .post("")
                .send(task)
                .end((err, response) => {
                    response.should.have.status(201);
                    response.body.should.be.a('object');
                    response.body.should.have.property('title').eq("foo");
                    response.body.should.have.property('body').eq('bar');
                    done();
                });
        });

    });

    /**
     * Test the PUT route
     */
    describe("PUT", () => {
        it("It should PUT an existing task", (done) => {
            const taskId = 1;
            const task = {
                title: 'foobar',
                body: 'chocobar',
                userId: 142
            };
            chai.request("https://reqres.in/api/users")
                .put("/" + taskId)
                .send(task)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    done();
                });
        });

    });

    /**
     * Test the DELETE route
     */
    describe("DELETE", () => {
        it("It should DELETE an existing task", (done) => {
            const taskId = 1;
            chai.request("https://reqres.in/api/users")
                .delete("/" + taskId)
                .end((err, response) => {
                    response.should.have.status(204);
                    response.body.should.be.a('object');
                    done();
                });
        });

    });

});