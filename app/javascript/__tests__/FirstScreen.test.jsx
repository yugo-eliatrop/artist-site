import React from "react";
import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import "../setupTests";

import FirstScreen from "../components/shared/firstScreen/FirstScreen";

describe("FirstScreen component", () => {
  it("should render logo and menu button", () => {
    const wrapper = shallow(<FirstScreen/>);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
    expect(wrapper.children().length).toEqual(3);
  });
});