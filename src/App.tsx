import React, { useState } from "react";
import "./App.css";
import {
  Typography,
  Button,
  ButtonGroup,
  Card,
  Divider,
  Grid,
  ThemeProvider,
  Container,
  CssBaseline,
  Link,
} from "@material-ui/core";
import {
  makeStyles,
  createStyles,
  createMuiTheme,
} from "@material-ui/core/styles";
import { ArrowUpward, ArrowDownward, ImportExport, FileCopy, GetApp } from "@material-ui/icons";
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles(() =>
  createStyles({
    card: {
      padding: 20,
    },
    divider: {
      marginLeft: -20,
      marginRight: -20,
      marginTop: 20,
      marginBottom: 20,
    },
    bottomSection: { width: "50%" },
    flexCenter: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    madeBy: {
      margin: 10,
    },
    darkMode: {
      marginLeft: 10,
      marginTop: 10,
    },
    planksNote: { textAlign: "center" },
  })
);

function App() {
  const [repeaterCount, setRepeaterCount] = useState(1);
  const classes = useStyles();
  const [darkState] = useState(true);
  const palletType = darkState ? "dark" : "light";
  const darkTheme = createMuiTheme({
    palette: {
      type: palletType,
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container>
        <div className="App">
          <Card className={classes.card}>
            <Grid container spacing={2}>
              <Grid item sm={6} xs={12} className={classes.flexCenter}>
                <Typography variant="body1">
                  <Typography variant="h5">The Repeater Calculator</Typography>
                </Typography>
              </Grid>
              <Grid item sm={3} xs={6} className={classes.flexCenter}>
                <Typography variant="body1">
                  {repeaterCount * 1} repeater{repeaterCount > 1 ? "s" : ""}
                </Typography>
              </Grid>
              <Grid item sm={3} xs={6} className={classes.flexCenter}>
                <ButtonGroup variant="contained">
                  <Button onClick={() => addCount(1)}>
                    <ArrowUpward />
                  </Button>
                  <Button onClick={() => addCount(-1)}>
                    <ArrowDownward />
                  </Button>
                  <Button onClick={textBoxInput}>
                    <ImportExport />
                  </Button>
                </ButtonGroup>
              </Grid>
            </Grid>
            <Divider className={classes.divider} />
            <Grid container spacing={2}>
              <Grid item className={classes.bottomSection}>
                <Typography variant="body1">Final ingredients</Typography>
                <Typography variant="body1">
                  {prettyStacks(repeaterCount * 3)} stone
                </Typography>
                <Typography variant="body1">
                  {prettyStacks(repeaterCount * 2)} redstone torches
                </Typography>
                <Typography variant="body1">
                  {prettyStacks(repeaterCount * 1)} redstone dust
                </Typography>
                <ButtonGroup variant="contained">
                  <Tooltip title="Download as file">
                    <Button onClick={() => save(true)}>
                      <GetApp />
                    </Button>
                  </Tooltip>
                  <Tooltip title="Copy to Clipboard">
                    <Button onClick={() => copy(true)}>
                      <FileCopy />
                    </Button>
                  </Tooltip>
                </ButtonGroup>
              </Grid>
              <Grid item className={classes.bottomSection}>
                <Typography variant="body1">Raw ingredients</Typography>
                <Typography variant="body1">
                  {prettyStacks(repeaterCount * 3)} stone
                </Typography>
                <Typography variant="body1">
                  {prettyStacks(Math.ceil(repeaterCount / 2) * 2)} wooden
                  planks*
                </Typography>
                <Typography variant="body1">
                  {prettyStacks(repeaterCount * 3)} redstone dust
                </Typography>
                <ButtonGroup variant="contained">
                  <Tooltip title="Download as file">
                    <Button onClick={() => save(false)}>
                      <GetApp />
                    </Button>
                  </Tooltip>
                  <Tooltip title="Copy to Clipboard">
                    <Button onClick={() => copy(false)}>
                      <FileCopy />
                    </Button>
                  </Tooltip>
                </ButtonGroup>
              </Grid>
            </Grid>
            <Divider className={classes.divider} />
            <Typography variant="body1" className={classes.planksNote}>
              *wooden planks are rounded up
            </Typography>
          </Card>
          <Typography variant="body1" className={classes.madeBy}>
            Made by Honbra <br /> Special thanks to the{" "}
            <Link href="https://github.com/HonbraDev/repeater-counter/graphs/contributors/">
              contributors
            </Link>
            .
          </Typography>
        </div>
      </Container>
    </ThemeProvider>
  );

  function addCount(i: number) {
    if (repeaterCount + i > 0) setRepeaterCount(repeaterCount + i);
  }

  function prettyStacks(i: number) {
    // thanks Tokfrans03
    return `${Math.floor(i / 64)} x64 + ${i % 64}`;
  }

  function save(side: boolean) {
    let textToSave = ""
    if (side) {
      // left side
      textToSave += `${prettyStacks(repeaterCount * 3)} stone\n`;
      textToSave += `${prettyStacks(repeaterCount * 2)} redstone torches\n`;
      textToSave += `${prettyStacks(repeaterCount * 1)} redstone dust\n`;

    } else {
      // right side
      textToSave += `${prettyStacks(repeaterCount * 3)} stone\n`;
      textToSave += `${prettyStacks(Math.ceil(repeaterCount / 2) * 2)} wooden planks\n`;
      textToSave += `${prettyStacks(repeaterCount * 3)} redstone dust\n`;
    }

    var hidden = document.createElement('a');

    hidden.href = 'data:attachment/text,' + encodeURI(textToSave);
    hidden.target = '_blank';
    hidden.download = `${repeaterCount}_Repeaters_${side? "Final": "Raw"}.txt`;
    hidden.click();
  }

  function copy(side: boolean) {
    let textToSave = ""
    if (side) {
      // left side
      textToSave += `${prettyStacks(repeaterCount * 3)} stone\n`;
      textToSave += `${prettyStacks(repeaterCount * 2)} redstone torches\n`;
      textToSave += `${prettyStacks(repeaterCount * 1)} redstone dust\n`;

    } else {
      // right side
      textToSave += `${prettyStacks(repeaterCount * 3)} stone\n`;
      textToSave += `${prettyStacks(Math.ceil(repeaterCount / 2) * 2)} wooden planks\n`;
      textToSave += `${prettyStacks(repeaterCount * 3)} redstone dust\n`;
    }

    navigator.clipboard.writeText(textToSave)
  }


  function textBoxInput() {
    // ok boomer V0W4N
    var count = prompt("Repeaters", repeaterCount.toString());

    if (
      count == null ||
      count === "" ||
      isNaN(parseInt(count)) ||
      parseInt(count) < 1
    ) {
    } else {
      setRepeaterCount(parseInt(count));
    }
  }
}

export default App;
