import React from "react";
import { Box } from "grommet";

import PlayGround from "components/PlayGround";

const vids = [
  "https://www.youtube.com/embed/00XMt8B262U",
  "https://www.youtube.com/embed/PAVy8wY0mgw",
  "https://www.youtube.com/embed/PfTCKS9QAqA",
  "https://www.youtube.com/embed/Fp44pRSjF_Y",
];

const Crimes = () => (
  <PlayGround gravity="horizontal" >
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

export default Crimes;
