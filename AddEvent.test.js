// __tests__/Login-page-test.js
import 'react-native';
import React from 'react';
import AddEvent from './components/AddEvent';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <AddEvent />
    ).toJSON();
  expect(tree).toMatchSnapshot();
});
