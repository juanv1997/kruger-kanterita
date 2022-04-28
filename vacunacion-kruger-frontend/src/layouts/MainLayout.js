import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import List from "@mui/material/List";
import { ListItem } from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import Divider from "@mui/material/Divider";
import Hidden from "@mui/material/Hidden";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";

const drawerWidth = 240;
const settings = ["Perfil", "Cerrar Sesión"];

const MainLayout = (props) => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [openMenu, setOpenMenu] = React.useState(false);

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // return (
  //   <>
  //     <AppBar position="static">
  //       <Container maxWidth="xl">
  //         <Toolbar disableGutters>
  //           <Typography
  //             variant="h6"
  //             noWrap
  //             component="div"
  //             sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
  //           >
  //             LOGO
  //           </Typography>

  //           <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
  //             <IconButton
  //               size="large"
  //               aria-label="account of current user"
  //               aria-controls="menu-appbar"
  //               aria-haspopup="true"
  //               color="inherit"
  //               onClick={handleOpenMenu}
  //             >
  //               <MenuIcon />
  //             </IconButton>
  //           </Box>
  //           <Typography
  //             variant="h6"
  //             noWrap
  //             component="div"
  //             sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
  //           >
  //             LOGO
  //           </Typography>

  //           <Box sx={{ flexGrow: 0 }}>
  //             <Tooltip title="Open settings">
  //               <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
  //                 <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
  //               </IconButton>
  //             </Tooltip>
  //             <Menu
  //               sx={{ mt: "45px" }}
  //               id="menu-appbar"
  //               anchorEl={anchorElUser}
  //               anchorOrigin={{
  //                 vertical: "top",
  //                 horizontal: "right",
  //               }}
  //               keepMounted
  //               transformOrigin={{
  //                 vertical: "top",
  //                 horizontal: "right",
  //               }}
  //               open={Boolean(anchorElUser)}
  //               onClose={handleCloseUserMenu}
  //             >
  //               {settings.map((setting) => (
  //                 <MenuItem key={setting} onClick={handleCloseUserMenu}>
  //                   <Typography textAlign="center">{setting}</Typography>
  //                 </MenuItem>
  //               ))}
  //             </Menu>
  //           </Box>
  //         </Toolbar>
  //       </Container>
  //     </AppBar>
  //     <div>
  //       <h1>
  //         fwe
  //       </h1>
  //     </div>
  //     <Hidden mdDown>
  //       <List
  //         sx={{ width: "100%", maxWidth: 240, bgcolor: "background.paper" }}
  //         component="nav"
  //         aria-labelledby="nested-list-subheader"
  //       >
  //         <ListItemButton>
  //           <ListItemIcon>
  //             <SendIcon />
  //           </ListItemIcon>
  //           <ListItemText primary="Sent mail" />
  //         </ListItemButton>
  //       </List>
  //     </Hidden>
  //     <Drawer
  //       variant="temporary"
  //       anchor="left"
  //       open={openMenu}
  //       onClose={handleOpenMenu}
  //     >
  //       <List
  //         sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
  //       >
  //         <ListItemButton>
  //           <ListItemIcon>
  //             <SendIcon />
  //           </ListItemIcon>
  //           <ListItemText primary="Sent mail" />
  //         </ListItemButton>
  //       </List>
  //     </Drawer>

  //   </>

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              onClick={handleOpenMenu}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Hidden mdDown>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Toolbar />
          <Divider />
          <List>
            <ListItem button>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="hola" />
            </ListItem>
          </List>
        </Drawer>
      </Hidden>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="temporary"
        open={openMenu}
        onClose={handleOpenMenu}
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="hola" />
          </ListItem>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />

        {props.children}
      </Box>
    </Box>
  );
};
export default MainLayout;
