import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Container,
} from "@mui/material";
import { styled } from "@mui/system";

const SearchSection = styled("div")({
  display: "flex",
  alignItems: "center",
  marginBottom: "20px",
});

const SearchInput = styled(TextField)({

});

const SortSelect = styled(FormControl)({
  marginLeft: "10px",
  minWidth: "120px",
});

const CardStyled = styled(Card)({
  height: "100%",
  display: "flex",
  flexDirection: "column",
});

const CardContentStyled = styled(CardContent)({
  flexGrow: 1,
});

const Loader = styled("div")({
  display: "flex",
  justifyContent: "center",
  marginTop: "20px",
});

const SearchApp = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [repos, setRepos] = useState([]);
  const [sort, setSort] = useState("stars");
  const [loading, setLoading] = useState(false);

  const fetchRepos = async () => {
    try {
      const response = await axios.get(
        `https://api.github.com/search/repositories`,
        {
          params: {
            q: searchTerm,
            sort: sort,
          },
        }
      );
      setRepos(response.data.items);
    } catch (error) {
      console.error("Error fetching the repositories:", error);
    }
    setLoading(false);
  };

  return (
    <Container sx={{ padding: "20px" }}>
      <SearchSection>
        <SearchInput
          label="Search Repositories"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={fetchRepos}>
          Search
        </Button>
        <SortSelect variant="outlined">
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            label="Sort By"
          >
            <MenuItem value="stars">Stars</MenuItem>
            <MenuItem value="watchers_count">Watchers</MenuItem>
            <MenuItem value="score">Score</MenuItem>
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="created_at">Created At</MenuItem>
            <MenuItem value="updated_at">Updated At</MenuItem>
          </Select>
        </SortSelect>
      </SearchSection>

      {loading ? (
        <Loader>
          <CircularProgress />
        </Loader>
      ) : (
        <Grid container spacing={2}>
          {repos.map((repo) => (
            <Grid item xs={12} md={6} lg={4} key={repo.id}>
              <CardStyled>
                <CardContentStyled>
                  <Typography variant="h5" component="div">
                    {repo.name}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {repo.language}
                  </Typography>
                  <Typography variant="body2">{repo.description}</Typography>
                  <Typography variant="body2">
                    Stars: {repo.stargazers_count}
                  </Typography>
                  <Typography variant="body2">
                    Watchers: {repo.watchers_count}
                  </Typography>
                </CardContentStyled>
              </CardStyled>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default SearchApp;
