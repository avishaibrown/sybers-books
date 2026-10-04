import React from "react";
import { Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Hero from "../components/Hero";
import FeaturesBar from "../components/FeaturesBar";
import CategoriesList from "../components/CategoriesList";
import StorySpotlight from "../components/StorySpotlight";
import { CATEGORIES_FROM_DB, HOME } from "../utils/constants";
import { searchForCategory, searchResults } from "../slices/searchResults";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onCategorySearch = (category) => {
    dispatch(searchForCategory(category));
    navigate("/shop");
  };

  const onHeroSearch = (term) => {
    dispatch(searchResults(term));
    navigate("/shop");
  };

  return (
    <Container component="section" disableGutters maxWidth={false}>
      {/* 1. Atmospheric Literary Hero */}
      <Hero
        title={HOME.hero.titles}
        description={HOME.hero.description}
        image={HOME.hero.image}
        onButtonClick={() => navigate("/shop")}
        onSearch={onHeroSearch}
        buttonText={HOME.hero.button}
      />

      {/* 2. Trust Signals & Boutique Value Props */}
      <FeaturesBar />

      {/* 3. Curated Category Browser */}
      <CategoriesList
        categories={CATEGORIES_FROM_DB}
        title={HOME.categoriesHeading}
        buttonText={HOME.categoriesShowMore}
        onCategorySearch={onCategorySearch}
      />

      {/* 4. Story & Melbourne Storefront Spotlight */}
      <StorySpotlight />
    </Container>
  );
};

export default Home;
