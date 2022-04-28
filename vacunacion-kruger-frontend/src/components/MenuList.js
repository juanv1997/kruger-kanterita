import React, { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";

const MenuList = (props) => {
  const items = props.items;

  const menuName = props.menuName;

  const ITEM_HEIGHT = 48;

  const listItems = items.map((item) => (
    <MenuItem key={item.toString()}>{item}</MenuItem>
  ));

  const list =
    items.length != 0 ? (
      listItems
    ) : (
      <div className="p-2">
        <Typography>Sin {menuName}</Typography>
      </div>
    );

  // const [anchorEl, setAnchorEl] = useState(null);

  // const open = Boolean(anchorEl);

   const handleClick = (event) => {
   setAnchorEl(event.currentTarget);
   };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Tooltip title={props.toolTipTitle}>
        <Button  onClick={handleClick}>
          {props.icon}
        </Button>
      </Tooltip>

      <Menu
        // anchorEl={anchorEl}
        // open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
          },
        }}
      >
        {list}
      </Menu>
    </div>
  );
};

export default MenuList;
