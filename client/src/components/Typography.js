import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import MuiTypography from "@mui/material/Typography";

const markClassesMapping = {
  center: {
    h1: "",
    h2: "SybersBooksTypography-markedH2Center",
    h3: "SybersBooksTypography-markedH3Center",
    h4: "SybersBooksTypography-markedH4Center",
    h5: "",
    h6: "",
  },
  left: {
    h1: "",
    h2: "",
    h3: "",
    h4: "",
    h5: "",
    h6: "SybersBooksTypography-markedH6Left",
  },
  none: {
    h1: "",
    h2: "",
    h3: "",
    h4: "",
    h5: "",
    h6: "",
  },
};

const styles = ({ theme }) => ({
  [`& .${markClassesMapping.center.h2}`]: {
    height: 3,
    width: 60,
    display: "block",
    margin: `${theme.spacing(1.5)} auto 0`,
    backgroundColor: theme.palette.secondary.main,
    borderRadius: 2,
  },
  [`& .${markClassesMapping.center.h3}`]: {
    height: 3,
    width: 48,
    display: "block",
    margin: `${theme.spacing(1.5)} auto 0`,
    backgroundColor: theme.palette.secondary.main,
    borderRadius: 2,
  },
  [`& .${markClassesMapping.center.h4}`]: {
    height: 3,
    width: 48,
    display: "block",
    margin: `${theme.spacing(1.5)} auto 0`,
    backgroundColor: theme.palette.secondary.main,
    borderRadius: 2,
  },
  [`& .${markClassesMapping.left.h6}`]: {
    height: 2,
    width: 24,
    display: "block",
    marginTop: theme.spacing(0.5),
    background: theme.palette.secondary.main,
    borderRadius: 1,
  },
});

function Typography(props) {
  const { children, variant = "body1", marked = "none", ...other } = props;

  let markedClassName = "";
  if (variant && variant in markClassesMapping[marked]) {
    markedClassName = markClassesMapping[marked][variant];
  }

  return (
    <MuiTypography variant={variant} {...other}>
      {children}
      {markedClassName ? <span className={markedClassName} /> : null}
    </MuiTypography>
  );
}

Typography.propTypes = {
  children: PropTypes.node,
  marked: PropTypes.oneOf(["center", "left", "none"]),
  variant: PropTypes.string,
};

export default styled(Typography)(styles);
