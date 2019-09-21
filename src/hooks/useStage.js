import { useState, useEffect } from 'react';
import { createStage } from '../gameHelpers';

export const useStage = (player, resetPlayer) => {
  const [stage, setStage] = useState(createStage());
  const [rowsCleared, setRowsCleared] = useState(0);

  useEffect(() => {
    setRowsCleared(0);

    //reduce applies function to each element in an array to reduce it to a single value
    const sweepRows = newStage =>
      newStage.reduce((acc, row) => {
        //findIndex return the index of the first element to satisfy the condition. else it returns -1
        if (row.findIndex(cell => cell[0] === 0) === -1) {
          setRowsCleared(prev => prev + 1);
          acc.unshift(new Array(newStage[0].length).fill([0, 'clear']));
          return acc;
          //row gets cleared here
        }

        //acc is the accumulator for the next stage. It checks if the row has any clear cells
        //if it does, then push that row to the acc. if it doesnt then add an empty row to the top of the stage
        //a row with no 0s will no be pushed into acc.
        //return acc as next stage

        acc.push(row);
        return acc;
      }, []);

    const updateStage = prevStage => {
      //First flush stage
      const newStage = prevStage.map(row =>
        row.map(cell => {
          return cell[1] === 'clear' ? [0, 'clear'] : cell;
        })
      );

      //Then draw the tetromino
      player.tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            newStage[y + player.pos.y][x + player.pos.x] = [
              value,
              `${player.collided ? 'merged' : 'clear'}`
            ];
          }
        });
      });
      // Then check if we have collided
      if (player.collided) {
        resetPlayer();
        return sweepRows(newStage);
      }
      return newStage;
    };
    setStage(prev => updateStage(prev));
  }, [player, resetPlayer]);

  return [stage, setStage, rowsCleared];
};
