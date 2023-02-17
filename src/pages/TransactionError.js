import { useEffect } from "react";
import { Container } from "@mui/material";
import InfoActionBox from "../components/InfoActionBox";
import { ERROR } from "../utils/constants";

const TransactionError = () => {
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
        title={ERROR.title}
        infoText={ERROR.message}
        buttonText={ERROR.linkText}
        navigateTo={ERROR.link}
      />
    </Container>
  );
};

export default TransactionError;
