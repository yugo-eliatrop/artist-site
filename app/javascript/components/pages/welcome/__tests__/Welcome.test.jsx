import React from "react";
// import { create, update } from "react-test-renderer";
import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import "../../../../setupTests";

import Welcome from "../Welcome";

describe('Welcome', () => {
  it('should render FirstScreen component only', () => {
    const output = shallow(<Welcome/>);
    expect(shallowToJson(output)).toMatchSnapshot();
  });
});