import { Link } from "@mui/material";

const ContactLink = (props) => {
  const { linkType, linkText } = props;

  return (
    <Link
      href={linkType + linkText}
      variant="body1"
      sx={{ display: "block" }}
      gutterBottom
    >
      {linkText}
    </Link>
  );
};

export default ContactLink;
