import React from "react";
// import { create, update } from "react-test-renderer";
import { shallow, mount } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import "../setupTests";

import Welcome from "../components/pages/welcome/Welcome";

describe("Welcome component", () => {
  it("should render FirstScreen component only", () => {
    const wrapper = shallow(<Welcome/>);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
    expect(wrapper.children().length).toEqual(1);
    expect(wrapper.find("FirstScreen").exists()).toEqual(true);
    expect(wrapper.find("MainMenu").exists()).toEqual(false);
  });

  it("should show menu after first screen menu button click", () => {
    const wrapper = mount(<Welcome />);
    const openBtn = wrapper.find("svg");
    openBtn.simulate("click");
    expect(wrapper.find("FirstScreen")).toHaveLength(1);
    expect(wrapper.find("div").first().children().length).toEqual(2);
  });
});