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
        sx={{ fontSize: { xs: "1.5rem", md: "2rem" }, mb: { xs: 5, md: 10 } }}
      >
        {title}
      </Typography>
      <Grid container spacing={2}>
        {categories.map((category, index) => (
          <Grid item xs={12} sm={6} md={4} xl={3} key={index}>
            <List component="nav">
              <ListItemButton
                selected={true}
                onClick={() => onCategorySearch(category)}
              >
                <ListItemText
                  primary={category}
                  primaryTypographyProps={{
                    fontSize: "1.125rem",
                    noWrap: true,
                  }}
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
