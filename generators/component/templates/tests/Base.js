import React from 'react';
import { shallow } from 'enzyme';
//JavaScript Testing utilities for React http://airbnb.io/enzyme/
import <%= component.className %> from '<%= component.webpackPath %>';
//How can we import our components ?
describe('<<%= component.className %> />', function () {

  let component;
  beforeEach(function () {
    component = shallow(<<%= component.className %> />);
  });

  describe('when rendering the component', function () {

    it('should have a className of "<%= style.className %>"', function () {
      expect(component.hasClass('<%= style.className %>')).to.equal(true);
    });
  });
});
