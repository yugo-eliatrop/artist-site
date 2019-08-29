import React from "react";
import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import "../setupTests";

import Slider from "../components/shared/firstScreen/Slider";

describe("MainMenu component", () => {
  it("should render slider without props", () => {
    const wrapper = shallow(<Slider />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});