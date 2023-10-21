import * as React from "react";
import { shallow } from "enzyme";
import EdittablePage from "./edittablePage";

describe("EdittablePage", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<EdittablePage />);
    expect(wrapper).toMatchSnapshot();
  });
});
