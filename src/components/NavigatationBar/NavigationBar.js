import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, IconButton,Drawer,List,ListItem,ListItemText } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  }
}))

export default function NavigationBar() {
    const classes = useStyles()

    const [isToggle, setIsToggle] = useState(false)

    const toggleDrawer = (open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setIsToggle(open)
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    Elderman
                </Typography>
            </Toolbar>

            <Drawer open={isToggle} onClose={toggleDrawer(false)}>
                <div
                    className={classes.list}
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                >
                    <List>
                        <ListItem button>
                            <ListItemText primary="PM2.5 sensor line graph" />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="PM2.5 sensor data visual map" />
                        </ListItem>
                    </List>
                </div>
            </Drawer>
        </AppBar>)
}