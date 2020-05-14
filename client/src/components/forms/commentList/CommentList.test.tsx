// import React from "react";
// import CommentList from "./CommentList";
// import Grid from "@material-ui/core/Grid";
// import { createShallow } from "@material-ui/core/test-utils";
// import toJson from "enzyme-to-json";
// const props = {
//     comments: [
//         {
//             userId: 1,
//             id: 1,
//             comment_body: "delectus aut autem",
//             author: {
//                 username: "Bill",
//             },
//         },
//         {
//             userId: 2,
//             id: 2,
//             comment_body: "delectus aut autem",
//             author: {
//                 username: "Bill",
//             },
//         },
//         {
//             userId: 3,
//             id: 3,
//             comment_body: "delectus aut autem",
//             author: {
//                 username: "Bill",
//             },
//         },
//     ],
// };
// describe("Should render <CommentList/>", () => {
//     let wrapper;
//     let shallow;
//     beforeEach(() => {
//         shallow = createShallow();
//         wrapper = shallow(<CommentList {...props} />);
//     });

//     it("should render <CommentList/>", () => {
//         expect(wrapper.find(Grid)).toHaveLength(1);
//     });

//     it("should snap <CommentList/> component", () => {
//         // expect(toJson(wrapper)).toMatchSnapshot();
//     });
// });
