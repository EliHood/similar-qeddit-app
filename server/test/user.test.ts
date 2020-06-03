import * as chai from "chai";
import { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../app";

chai.use(chaiHttp);

describe("Should test index", () => {
  it("should test 200 index page", (done) => {
    chai
      .request(app)
      .get("/")
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it("should test currentUser if not authenticated", (done) => {
    chai
      .request(app)
      .get("/api/v1/users/currentUser")
      .end((err, res) => {
        expect(res).to.have.status(500);
        done();
      });
  });
});
