import * as React from "react";
import { shallow } from "enzyme";
import TablePage from "./tablePage";

describe("TablePage", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<TablePage />);
    expect(wrapper).toMatchSnapshot();
  });
});
