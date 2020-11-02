import React from "react";

// Material UI
import { withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

const styles = (theme) => ({
  spacing: 8,
  main: {
    textAlign: "center",
  },
});

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes } = this.props;

    return (
      <Box mt={4} className={classes.main}>
        <Typography variant="h2" component="h1">
          Home Page
        </Typography>
      </Box>
    );
  }
}

export default withStyles(styles)(Home);
