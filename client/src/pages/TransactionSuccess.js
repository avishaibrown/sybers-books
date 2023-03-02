import { useEffect } from "react";
import { Container } from "@mui/material";
import { SUCCESS } from "../utils/constants";
import InfoActionBox from "../components/InfoActionBox";

const TransactionSuccess = () => {
  //scroll to top when page is navigated to
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container
      component="section"
      sx={{
        mt: { xs: 5, md: 10 },
        mb: { md: 10 },
        alignItems: "center",
        textAlign: "center",
      }}
      disableGutters
      maxWidth={false}
    >
      <InfoActionBox
        title={SUCCESS.title}
        infoText={SUCCESS.message}
        buttonText={SUCCESS.redirectLinkText}
        navigateTo={SUCCESS.redirectLink}
      />
    </Container>
  );
};

export default TransactionSuccess;
