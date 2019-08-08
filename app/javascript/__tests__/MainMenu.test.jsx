import React from "react";
import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import "../setupTests";

import MainMenu from "../components/shared/menu/MainMenu";

describe("MainMenu component", () => {
  it("should render logo and menu button", () => {
    const wrapper = shallow(<MainMenu albums={[{ name: "1" }, { name: "2" }, { name: "3" }]} />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find(".albums").children().length).toEqual(3);
    const withoutProps = shallow(<MainMenu />);
    expect(withoutProps.find(".albums").children().length).toEqual(1);
  });
});