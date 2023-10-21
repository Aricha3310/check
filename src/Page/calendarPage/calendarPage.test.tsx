import * as React from "react";
import { shallow } from "enzyme";
import CalendarPage from "./calendarPage";

describe("CalendarPage", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<CalendarPage />);
    expect(wrapper).toMatchSnapshot();
  });
});
