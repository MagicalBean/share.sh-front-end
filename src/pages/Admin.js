import React from "react";

import axios from "axios";

// Material UI
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";

import DeleteIcon from "@material-ui/icons/Delete";
import RefreshIcon from "@material-ui/icons/Refresh";
import Grid from "@material-ui/core/Grid";

const styles = (theme) => ({
  spacing: 8,
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  table: {
    minWidth: 10,
  },
  link: {
    textDecoration: "none",
  },
});

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, isLoaded: false, data: {} };

    this.onDelete = this.onDelete.bind(this);
    this.fetch = this.fetch.bind(this);
  }

  componentDidMount() {
    this.fetch();
  }

  fetch() {
    axios
      .get(`${this.props.serverUrl}admin`)
      .then((res) => {
        this.setState({ isLoaded: true, data: res.data });
      })
      .catch((err) => {
        this.setState({ isLoaded: true, error: err });
        // console.log(err);
      });
  }

  onDelete(id) {
    axios
      .delete(`${this.props.serverUrl}${id}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        this.setState({ isLoaded: true, error: err });
        // console.log(err);
      });

    this.fetch();
  }

  render() {
    const { classes } = this.props;
    const { error, isLoaded, data } = this.state;

    let markup;

    if (error) {
      markup = <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      markup = <div>Loading...</div>;
    } else if (data == null) {
      markup = (
        <div>
          <h1>404 Not Found</h1>
        </div>
      );
    } else {
      markup = (
        <TableContainer component={Paper} className={classes.paper}>
          <Table className={classes.table} size="small" aria-label="data-table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <IconButton onClick={this.fetch}>
                    <RefreshIcon />
                  </IconButton>
                </TableCell>
                <TableCell>#</TableCell>
                <TableCell align="center">_id</TableCell>
                <TableCell align="center">Image&nbsp;ID</TableCell>
                <TableCell align="center">Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, i) => (
                <TableRow key={i}>
                  <TableCell component="th" scope="row">
                    <IconButton color="secondary" onClick={() => this.onDelete(row.imgId)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell align="center">{row._id}</TableCell>
                  <TableCell
                    className={classes.link}
                    align="center"
                    component="a"
                    href={`/download/${row.imgId}`}
                  >
                    {row.imgId}
                  </TableCell>
                  <TableCell align="center">{row.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
    }

    return (
      <Box mt={4}>
        <Grid container>
          <Grid item xs={1} />
          <Grid item xs={10}>
            {markup}
          </Grid>
          <Grid item xs={1} />
        </Grid>
      </Box>
    );
  }
}

export default withStyles(styles)(Admin);
