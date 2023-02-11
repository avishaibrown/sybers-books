import Hero from "../components/Hero";
import { CATEGORIES_FROM_DB, HOME, CATEGORIES } from "../utils/constants";
import { Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CategoriesList from "../components/CategoriesList";
import { useDispatch } from "react-redux";
import { searchForCategory } from "../slices/searchResults";

const Home = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const onCategorySearch = (category) => {
    dispatch(searchForCategory(category));
    navigate("/shop");
  };

  return (
    <Container component="section" disableGutters maxWidth={false}>
      <Hero
        title={HOME.hero.titles}
        description={HOME.hero.description}
        image={HOME.hero.image}
        onButtonClick={() => navigate("/shop")}
        buttonText={HOME.hero.button}
      />
      <CategoriesList
        categories={CATEGORIES_FROM_DB}
        title={CATEGORIES}
        onCategorySearch={onCategorySearch}
      />
    </Container>
  );
};

export default Home;
