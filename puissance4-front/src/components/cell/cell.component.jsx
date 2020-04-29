import React from "react";

import './cell.styles.scss';

const Cell = ({bg, opac}) => (
  <div
    className='cell'
    style={{
      backgroundColor: bg,
      border: opac? "1px solid red": "0",
      transition: "all 0.8s ease"
    }}
  >

  </div>
);

export default Cell;