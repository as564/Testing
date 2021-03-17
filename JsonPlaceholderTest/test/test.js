let chai = require("chai");
let chaiHttp = require("chai-http");


//Assertion Style
chai.should();

chai.use(chaiHttp);

describe('Todos API', () => {

    /**
     * Test the GET route
     */
    describe("GET", () => {
        it("It should GET all the todos", (done) => {
            chai.request("https://jsonplaceholder.typicode.com/todos")
                .get("")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    response.body.length.should.be.eq(200);
                    done();
                });
        });

        it("It should NOT GET all the todos", (done) => {
            chai.request("https://jsonplaceholder.typicode.com/todos")
                .get("/api/taks")
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
describe("GET /todos/:id", () => {
    it("It should GET a todo by ID", (done) => {
        const todoId = 1;
        chai.request("https://jsonplaceholder.typicode.com/posts")
            .get("/" + todoId)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('id');
                response.body.should.have.property('title');
                response.body.should.have.property('body');
                response.body.should.have.property('id').eq(1);
                done();
            });
    });

    it("It should NOT GET a todo by ID", (done) => {
        const todoId = "123a4";
        chai.request("https://jsonplaceholder.typicode.com/posts")
            .get("/" + todoId)
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
        it("It should POST a new todo", (done) => {
            const todo = {
                title: 'foo',
                body: 'bar',
                userId: 1
            };
            chai.request("https://jsonplaceholder.typicode.com/posts")
                .post("")
                .send(todo)
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
        it("It should PUT an existing todo", (done) => {
            const todoId = 1;
            const todo = {
                title: 'foobar',
                body: 'chocobar',
                userId: 142
            };
            chai.request("https://jsonplaceholder.typicode.com/posts")
                .put("/" + todoId)
                .send(todo)
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
        it("It should DELETE an existing todo", (done) => {
            const todoId = 1;
            chai.request("https://jsonplaceholder.typicode.com/posts")
                .delete("/" + todoId)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    done();
                });
        });

    });

});