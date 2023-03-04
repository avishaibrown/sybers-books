import { useState, useEffect } from "react";
import { Container } from "@mui/material";
import { SUCCESS } from "../utils/constants";
import InfoActionBox from "../components/InfoActionBox";

const TransactionSuccess = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  //scroll to top when page is navigated to
  useEffect(() => {
    window.scrollTo(0, 0);

    const url = new URL(window.location.href);
    const sessionId = url.searchParams.get('session_id');

    fetch("http://localhoist:4000/success", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sessionId: sessionId,
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then(data => {
        setTitle(`Congratulations ${data.customerName}!`);
        setMessage([`Your order was successfully placed. A confirmation email has been sent to ${data.customerEmail}. Please allow up to 30 minutes for the email to arrive.`]);
      })
      .catch((error) => {
        console.error(error.message);
        setTitle(SUCCESS.title);
        setMessage(SUCCESS.message);
      });
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
        title={title}
        infoText={message}
        buttonText={SUCCESS.redirectLinkText}
        navigateTo={SUCCESS.redirectLink}
      />
    </Container>
  );
};

export default TransactionSuccess;
