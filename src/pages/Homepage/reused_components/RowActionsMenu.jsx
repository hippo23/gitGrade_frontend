import { Menu, MenuItem, IconButton } from "@mui/material";
import { useState } from "react";

const RowActionsMenu = ({ row, Icon, actions }) => {
  const [anchor, setAnchor] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchor(event.currentTarget);
    console.log(actions);
  };

  const handleMenuClose = () => {
    setAnchor(null);
  };

  const handleActionClick = (action) => {
    console.log(`Action: ${action}, Row ID: ${row.id}`);
    handleMenuClose();
  };

  return (
    <div>
      <IconButton onClick={handleMenuOpen}>{Icon}</IconButton>
      <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={handleMenuClose}>
        {actions.map((action) => {
          return (
            <MenuItem
              onClick={() => {
                action.method();
                handleMenuClose();
              }}
            >
              {action.name}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
};

export default RowActionsMenu;
