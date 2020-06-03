import * as chai from "chai";
import { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../app";

chai.use(chaiHttp);

describe("Should test index page", () => {
  it("should test index page", (done) => {
    chai
      .request(app)
      .get("/")
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
