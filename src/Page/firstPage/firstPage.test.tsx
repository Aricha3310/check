import * as React from "react";
import { shallow } from "enzyme";
import FristPage from "./firstPage";

describe("FristPage", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<FristPage />);
    expect(wrapper).toMatchSnapshot();
  });
});
