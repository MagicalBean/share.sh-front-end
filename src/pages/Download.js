import React from "react";

import axios from "axios";

// Material UI
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const styles = (theme) => ({
  spacing: 8,
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  gridMargin: {
    marginTop: theme.spacing(3),
  },
  main: {
    textAlign: "center",
    marginTop: theme.spacing(3),
  },
  container: {
    maxHeight: 650,
  },
  image: {
    maxHeight: "100%",
    maxWidth: "100%",
  },
  download: {
    width: "100%",
    textAlign: "middle center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "right",
    alignItems: "center",
    marginTop: theme.spacing(3),
  },
  delete: {
    width: "100%",
    textAlign: "middle center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "left",
    alignItems: "center",
    marginTop: theme.spacing(3),
  },
});

class Download extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, isLoaded: false, item: {}, id: null };

    this.onDelete = this.onDelete.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    axios
      .get(`http://localhost:4000/${id}`)
      .then((res) => {
        console.log(res.data.item);

        this.setState({ isLoaded: true, item: res.data.item });
      })
      .catch((err) => {
        this.setState({ isLoaded: true, error: err });
        // console.log(err);
      });
  }

  onDelete() {
    const { id } = this.props.match.params;

    axios
      .delete(`http://localhost:4000/${id}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        this.setState({ isLoaded: true, error: err });
        // console.log(err);
      });

    this.props.history.push("/");
  }

  render() {
    const { classes } = this.props;
    const { error, isLoaded, item } = this.state;
    // console.log(this.state.item);

    let markup;

    if (error) {
      markup = <Typography my={2}>Error: {error.message}</Typography>;
    } else if (!isLoaded) {
      markup = <Typography my={2}>Loading...</Typography>;
    } else if (item == null) {
      markup = (
        <Typography my={2}>
          <h1>404 | File Not Found</h1>
        </Typography>
      );
    } else {
      let image = Buffer.from(item.img.data.data);
      let imageUrl = `data:image/${item.img.contentType};base64, ${image.toString("base64")}`;
      markup = (
        <div>
          <Paper className={classes.paper}>
            <Grid container>
              <Grid item className={classes.gridMargin} xs={12} my={4}>
                <Typography component="h2" variant="h4">
                  Download {item.name}
                </Typography>
              </Grid>
              <Grid container xs={12}>
                <Grid item className={classes.download} xs={5}>
                  <Button
                    variant="contained"
                    color="default"
                    download={`${item.name}`}
                    href={imageUrl}
                  >
                    Download
                  </Button>
                </Grid>
                <Grid item xs={2} />
                <Grid item className={classes.delete} xs={5}>
                  <Button variant="contained" color="secondary" onClick={this.onDelete}>
                    Delete
                  </Button>
                </Grid>
              </Grid>
              <Grid item xs={12} style={{ margin: 24 }} className={classes.container} my={4}>
                <img className={classes.image} src={imageUrl} alt="download"></img>
              </Grid>
            </Grid>
          </Paper>
        </div>
      );
    }

    return (
      <Grid container className={classes.main}>
        <Grid item xs={1} md={2} />
        <Grid item xs={10} md={8}>
          {markup}
        </Grid>
        <Grid item xs={1} md={2} />
      </Grid>
    );
  }
}

export default withStyles(styles)(Download);
