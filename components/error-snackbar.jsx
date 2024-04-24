import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { useGlobalContext } from "@/contexts/global-context";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  myAlert: {
    color: "#DE6278",
    backgroundColor: "#fff",
  },
}));

export default function ErrorSnackbar() {
  const classes = useStyles();
  const { showAlert, setShowAlert, alertMsg } = useGlobalContext();

  const handleClick = () => {
    setShowAlert(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setShowAlert(false);
  };

  return (
    <Snackbar
      sx={{ height: "100%" }}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      open={showAlert}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity="error" className={classes.myAlert}>
        {alertMsg}
      </Alert>
    </Snackbar>
  );
}
