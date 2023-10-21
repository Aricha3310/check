import * as React from "react";
import { shallow } from "enzyme";
import Adddatatofirebase from "./adddatatofirebase";

describe("Adddatatofirebase", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Adddatatofirebase />);
    expect(wrapper).toMatchSnapshot();
  });
});
