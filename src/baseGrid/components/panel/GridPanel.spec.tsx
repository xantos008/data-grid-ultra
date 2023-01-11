import * as React from 'react';
import { GridPanel } from '../../../baseGrid';

function MyPanel() {
  return (
    <div>
      <GridPanel classes={{ paper: 'paper' }} open modifiers={[{ name: 'flip', enabled: false }]} />
    </div>
  );
}
