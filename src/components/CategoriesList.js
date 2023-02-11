import {
  Container,
  Grid,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import Typography from "./Typography";

const CategoriesList = (props) => {
  const { categories, title, onCategorySearch } = props;

  return (
    <Container
      maxWidth={false}
      component="section"
      sx={{
        mt: { xs: 5, md: 10 },
        mb: { md: 10 },
        alignItems: "center",
        textAlign: "center",
        flexGrow: 1,
      }}
    >
      <Typography
        variant="h2"
        gutterBottom
        marked="center"
        sx={{ fontSize: { xs: "2rem", md: "2.5rem" }, mb: { xs: 5, md: 10 } }}
      >
        {title}
      </Typography>
      <Grid container spacing={2}>
        {categories.map((category, index) => (
          <Grid item xs={6} sm={4} md={3} xl={2} key={index}>
            <List component="nav">
              <ListItemButton
                selected={true}
                onClick={() => onCategorySearch(category)}
              >
                <ListItemText
                  primary={category}
                  primaryTypographyProps={{ fontSize: "1.25rem" }}
                />
              </ListItemButton>
            </List>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CategoriesList;
