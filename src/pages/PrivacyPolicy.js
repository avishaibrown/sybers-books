import { Container, Box, List, ListItem } from "@mui/material";
import Typography from "../components/Typography";
import { PRIVACY_POLICY } from "../utils/constants";

const PrivacyPolicy = () => {
  return (
    <Container
      component="section"
      sx={{
        mt: { xs: 15, md: 20 },
        mb: { md: 10 },
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h2"
        gutterBottom
        marked="center"
        sx={{ fontSize: { xs: "3rem", md: "3.75rem" }, mb: 10 }}
      >
        {PRIVACY_POLICY.title}
      </Typography>
      <Box
        sx={{
          alignItems: "center",
          textAlign: "left",
        }}
        spacing={2}
      >
        <Typography paragraph>
          At Syber's Books, we understand the importance of protecting your
          personal information. This Privacy Policy outlines how we collect,
          use, store, and disclose your personal information.
        </Typography>
        <Typography paragraph>
          <b>INFORMATION COLLECTION:</b> We collect information from you when
          you register on our website, place an order, subscribe to our
          newsletter, or fill out a form. The information we collect may include
          your name, mailing address, email address, phone number, and payment
          information.
        </Typography>
        <Typography>
          <b>INFORMATION USE:</b> We use the information we collect from you for
          the following purposes:
        </Typography>
        <List
          sx={{
            listStyleType: "disc",
            pl: 4,
            "& .MuiListItem-root": {
              display: "list-item",
            },
          }}
        >
          <ListItem>To process and fulfill your orders</ListItem>
          <ListItem>
            To send you information about your account and order
          </ListItem>
          <ListItem>
            To send you promotional emails about new products, special offers,
            and other updates
          </ListItem>
          <ListItem>To improve our website and customer service</ListItem>
          <ListItem>
            To administer a contest, promotion, survey, or other site feature
          </ListItem>
        </List>

        <Typography paragraph>
          <b>INFORMATION STORAGE AND SECURITY:</b> We take appropriate measures
          to protect the security of your personal information, including the
          use of encryption technology. We store your information in a secure
          database and only authorized personnel have access to it.
        </Typography>
        <Typography paragraph>
          <b>INFORMATION DISCLOSURE:</b> We do not sell, trade, or rent your
          personal information to third parties. We may disclose your
          information to our service providers, such as shipping companies and
          payment processors, to the extent necessary to provide our services to
          you.
        </Typography>
        <Typography paragraph>
          <b>COOKIES:</b> A cookie is a small data file that is stored on your
          device when you visit our website. We use cookies to remember your
          preferences and to track your usage of our website. You can choose to
          disable cookies in your browser, but this may affect your ability to
          use certain features of our website.
        </Typography>
        <Typography paragraph>
          <b>THIRD-PARTY LINKS:</b> Our website may contain links to other
          sites. We are not responsible for the privacy practices of other sites
          and encourage you to read their privacy policies.
        </Typography>
        <Typography paragraph>
          <b>CHANGES TO THIS PRIVACY POLICY:</b> We reserve the right to make
          changes to this Privacy Policy at any time. Any changes will be posted
          on this page and will become effective immediately.
        </Typography>
        <Typography paragraph>
          <b>CONTACT US:</b> If you have any questions or concerns about our
          Privacy Policy, please contact us at {PRIVACY_POLICY.email}. This
          Privacy Policy was last updated on {PRIVACY_POLICY.lastUpdatedDate}.
        </Typography>
      </Box>
    </Container>
  );
};

export default PrivacyPolicy;
