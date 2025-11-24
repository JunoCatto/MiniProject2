import * as React from "react";
import { useContext } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import { Link } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { PlayerContext } from "../Context/PlayerContext";
import { Menu } from "lucide-react";

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);
  const { player } = useContext(PlayerContext);
  const name = player?.name;
  const toLowerCaseName = name?.toLowerCase();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List sx={{ color: "#cdd6f4" }}>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to={`/${toLowerCaseName}/skills`}
            state={{ player }}
          >
            <ListItemText primary="Skills" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to={`/${toLowerCaseName}/activities`}
            state={{ player }}
          >
            <ListItemText primary="Activities" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <Button className="drawer" onClick={toggleDrawer(true)}>
        <Menu />
      </Button>
      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
        slotProps={{ paper: { sx: { backgroundColor: "#11111b" } } }}
      >
        {DrawerList}
      </Drawer>
    </div>
  );
}
