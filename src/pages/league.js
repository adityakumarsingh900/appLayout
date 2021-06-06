import React from "react";
import { Box } from "grommet";

import PlayGround from "components/PlayGround";

const vids = [
  "https://www.youtube.com/embed/ouPzDocgr64",
  "https://www.youtube.com/embed/326s1ISaVRI",
  "https://www.youtube.com/embed/32Sgp5aDyGs",
];

// const layout = [
//   {
//     w: 8,
//     h: 5,
//     x: 0,
//     y: 0,
//     i: "0",
//     minW: 5,
//     minH: 5,
//     moved: false,
//     static: false,
//   },
//   {
//     w: 7,
//     h: 5,
//     x: 8,
//     y: 0,
//     i: "1",
//     minW: 5,
//     minH: 5,
//     moved: false,
//     static: false,
//   },
//   {
//     w: 7,
//     h: 5,
//     x: 15,
//     y: 0,
//     i: "2",
//     minW: 5,
//     minH: 5,
//     moved: false,
//     static: false,
//   },
//   {
//     w: 8,
//     h: 5,
//     x: 0,
//     y: 5,
//     i: "3",
//     minW: 5,
//     minH: 5,
//     moved: false,
//     static: false,
//   },
//   {
//     w: 7,
//     h: 5,
//     x: 8,
//     y: 5,
//     i: "4",
//     minW: 5,
//     minH: 5,
//     moved: false,
//     static: false,
//   },
//   {
//     w: 7,
//     h: 5,
//     x: 15,
//     y: 5,
//     i: "5",
//     minW: 5,
//     minH: 5,
//     moved: false,
//     static: false,
//   },
//   {
//     w: 7,
//     h: 10,
//     x: 22,
//     y: 0,
//     i: "6",
//     minW: 5,
//     minH: 5,
//     moved: false,
//     static: false,
//   },
// ];

const League = () => (
  <PlayGround gravity="horizontal">
    {vids.map((url, i) => (
      <Box fill>
        <iframe
          width="100%"
          height="100%"
          title={`i`}
          src={`${url}?controls=0`}
        />
      </Box>
    ))}
  </PlayGround>
);

export default League;
