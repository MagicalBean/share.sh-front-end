import React, { Component } from "react";

// Material UI
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import grey from "@material-ui/core/colors/grey";
import Grid from "@material-ui/core/Grid";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  logoBox: {
    width: "100%",
    textAlign: "middle center",
    display: "flex",
    flexDirection: "row",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
    [theme.breakpoints.up("md")]: {
      justifyContent: "left",
    },
    alignItems: "center",
  },
  itemsBox: {
    width: "100%",
    textAlign: "middle center",
    display: "flex",
    flexDirection: "row",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
    [theme.breakpoints.up("md")]: {
      justifyContent: "right",
    },
    alignItems: "center",
  },
});

class Nav extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar style={{ background: grey[800] }} position="static">
          <Toolbar>
            <Grid container mx="auto">
              <Grid item xs={12} md={6} className={classes.logoBox}>
                <Button size="large" href="/">
                  <Typography
                    color="textSecondary"
                    style={{ textTransform: "none" }}
                    variant="h4"
                    className={classes.title}
                  >
                    Share.sh
                  </Typography>
                </Button>
              </Grid>
              <Grid item xs={12} md={6} className={classes.itemsBox}>
                <Button color="inherit" href="/">
                  <Typography
                    color="textSecondary"
                    style={{ textTransform: "none" }}
                    variant="h6"
                    className={classes.title}
                  >
                    Home
                  </Typography>
                </Button>
                <Button color="inherit" href="/">
                  <Typography
                    color="textSecondary"
                    style={{ textTransform: "none" }}
                    variant="h6"
                    className={classes.title}
                  >
                    Docs
                  </Typography>
                </Button>
                {localStorage.getItem("admin") && (
                  <Button color="inherit" href="/admin">
                    <Typography
                      color="textSecondary"
                      style={{ textTransform: "none" }}
                      variant="h6"
                      className={classes.title}
                    >
                      Admin
                    </Typography>
                  </Button>
                )}
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(Nav);
