import React from 'react';
import { StyledCell } from './styles/StyledCell';
import { TETROMINOS } from '../tetrominos';

const Cell = ({ type }) => {
  return <StyledCell type={type} color={TETROMINOS[type].color} />;
};
//react.memo only rerender the cells that change with the tetromino. only few cells rerender now
//without react.memo, 240 rerenders would happen on every movement
//optomisation
export default React.memo(Cell);
