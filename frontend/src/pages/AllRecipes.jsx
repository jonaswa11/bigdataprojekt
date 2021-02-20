import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { IconButton, TextField } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { Grid, Typography, Paper } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import "fontsource-roboto";

/**
 * This is the page that displays all the recipes
 *
 * @author [Lukas Rutkauskas] (https://github.com/LukasRutkauskas)
 */

class AllRecipes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipes: [],
      searchValue: "",
    };
  }

  //Starts the fetch method

  handleSearch = () => {
    this.makeApiCall(this.state.searchValue);
  };

  //Fetches the recipes which correspond to the search value

  makeApiCall = (searchInput) => {
    var searchUrl = `http://34.107.94.7:5000/Chefkoch%20API/all-recipes`;
    fetch(searchUrl)
      .then((response) => {
        return response.json();
      })
      .then((jsonData) => {
        this.setState({ recipes: jsonData });
      });
  };

  render() {
    const { classes } = this.props;
    return (
      <div id="main" align="center">
        <Paper className={classes.page}>
          {/* Saves the input as the searchvalue */}
          {/* If the value of the TextField changes the handleOnChange method starts */}
          <TextField
            id="read-only"
            defaultValue="Alle Rezepte"
            label="Starte die Suche!"
            InputProps={{
              readOnly: true,
            }}
          />
          {/* Button which triggers the handleSearch method */}
          <IconButton aria-label="Search" onClick={this.handleSearch}>
            <SearchIcon style={{ padding: "10px" }} />
          </IconButton>
          <div id="recipes-container">
            {/* Maps every recipe-name into one Accordion */}
            {this.state.recipes.map((recipe, index) => (
              <div key={index}>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel-content"
                    id="panel-header"
                  >
                    <Typography className={classes.heading}>
                      {recipe.name}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container direction="column">
                      <Grid item>
                        <Typography
                          className={classes.listHeading}
                          align="left"
                        >
                          ID:
                        </Typography>
                        <ul className={classes.lists} align="left">
                          {recipe.id}
                        </ul>
                      </Grid>
                      <Grid item>
                        <Typography
                          className={classes.listHeading}
                          align="left"
                        >
                          Kategorie:
                        </Typography>
                        <ul className={classes.lists} align="left">
                          {recipe.category}
                        </ul>
                      </Grid>
                      <Grid item>
                        <Typography
                          className={classes.listHeading}
                          align="left"
                        >
                          Keywords:
                        </Typography>
                        {/* Maps every recipe-keyword into one seperate line */}
                        <ul className={classes.lists} align="left">
                          {recipe.keywords.map((keyword, index) => (
                            <li key={index}>{keyword}</li>
                          ))}
                        </ul>
                      </Grid>
                      <Grid item>
                        <Typography
                          className={classes.listHeading}
                          align="left"
                        >
                          Zutaten:
                        </Typography>
                        {/* Maps every recipe-ingredient into one seperate line */}
                        <ul className={classes.lists} align="left">
                          {recipe.ingredients.map((ingrediant, index) => (
                            <li key={index}>{ingrediant}</li>
                          ))}
                        </ul>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </div>
            ))}
          </div>
        </Paper>
      </div>
    );
  }
}

//Styling of the components

const styles = (theme) => ({
  heading: {},
  lists: {
    fontFamily: "Roboto",
    listStyleType: "none",
  },
  listHeading: {
    fontWeight: "bolder",
  },
  page: {
    width: "71em",
    paddingTop: "1em",
    paddingBottom: "1em",
  },
});

export default withStyles(styles)(AllRecipes);
