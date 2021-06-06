import React from "react";
import { Anchor, Box, Button, Text } from "grommet";
import { Phone } from "grommet-icons";

import Avatar from "components/Avatar";
import Divider from "components/Divider";

const team = [
  {
    name: "Superman",
    logo: "https://image.flaticon.com/icons/png/512/1674/1674292.png",
  },
  {
    name: "Wonder Woman",
    logo: "data:image/png;base64,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",
  },
  {
    name: "Flash",
    logo: "data:image/jpeg;base64,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",
  },
  {
    name: "Green Lantern",
    logo: "https://cdn.imgbin.com/13/4/18/imgbin-green-lantern-batman-avatar-icon-superhero-phone-icon-YFH4FDC158uZsdqF7czZ9VhCq.jpg",
  },
];

const getUserAvatar = (name, image, size) => {
  if (Boolean(name) === false) return;

  return (
    <Box flex="grow">
      <Avatar
        src={image ? image : null}
        width={size}
        height={size}
        round="full"
      >
        <Text color="white" size="small">
          {!image && name.charAt(0).toUpperCase()}
        </Text>
      </Avatar>
    </Box>
  );
};

const CompanyDrop = () => {
  const signOut = () => {
    alert("signOut");
  };

  return (
    <Box
      pad={{ top: "xsmall", bottom: "medium" }}
      width="medium"
      background="background-contrast.dark"
      flex={{ shrink: 0 }}
    >
      <Box align="center" gap="xsmall">
        {getUserAvatar(
          "Batman",
          "https://www.vhv.rs/dpng/d/52-527377_batman-face-cartoon-png-transparent-png.png",
          "xxsmall"
        )}
        <Text>Batman</Text>
      </Box>

      <Box margin={{ vertical: "xsmall" }}>
        <Divider
          style={{ width: "auto", minWidth: "auto" }}
          margin={{ horizontal: "small" }}
          color="none"
          background={{ color: "border", opacity: "medium" }}
        />
        {team.map((hero) => (
          <Box pad="xsmall" direction="row" justify="between" align="center">
            <Box
              pad={{ horizontal: "small" }}
              direction="row"
              align="center"
              gap="medium"
            >
              {getUserAvatar(hero.name, hero.logo, "25px")}
              <Text>{hero.name}</Text>
            </Box>
            <Button
              plain
              size="xsmall"
              icon={<Phone />}
              onClick={() => alert(`Calling ${hero.name}`)}
            />
          </Box>
        ))}
        <Divider
          color="none"
          style={{ width: "auto", minWidth: "auto" }}
          margin={{ horizontal: "small" }}
          background={{ color: "border", opacity: "medium" }}
        />
      </Box>
      <Box align="center" gap="small">
        <Button
          size="xsmall"
          label="Logout"
          onClick={signOut}
          primary
          color="text"
        />
        <Box direction="row" gap="medium">
          <Anchor
            as="span"
            size="small"
            color="info"
            label="Terms and Conditions"
          />
          <Anchor as="span" size="small" color="info" label="Privacy Policy" />
        </Box>
      </Box>
    </Box>
  );
};

export default CompanyDrop;
