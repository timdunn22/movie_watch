import React from "react";

import {
    ErrorBoundary,
    Facet,
    SearchProvider,
    SearchBox,
    Results,
    PagingInfo,
    ResultsPerPage,
    Paging,
    Sorting,
    WithSearch
} from "@elastic/react-search-ui";
import {
    Layout,
    SingleSelectFacet,
} from "@elastic/react-search-ui-views";
import "@elastic/react-search-ui-views/lib/styles/styles.css";
import "../index.css"
import { ResultView, ResultsView, ResultCard } from "../components/results"
import { config, SORT_OPTIONS } from "../components/config"
import Grid from '@mui/material/Grid'
import { Box, ButtonGroup, Container, ImageList, Button } from "@mui/material";
import { SearchAppBar } from "../components/header"
import { SortingButton, ResultsPerPage as PerPageComponent, RatingButton, PopularityButton, ColorButton, LanguageButton, DubbingButton, MovieTypeButton, GenreButton, YearButton } from "../components/buttons";
import { FormControl } from "react-bootstrap";
import genres from "../genres.json"
import PaginationView from "../components/pagination";
import { Outlet } from "react-router-dom"

export default function Root() {
    return (
        <>
            
                <SearchProvider config={config} resultsPerPage={32} >
                    <div style={{backgroundColor: 'navy'}}>
                    <WithSearch
                        mapContextToProps={({ wasSearched }) => ({
                            wasSearched
                        })}
                    >
                        {({ wasSearched }) => {
                            return (

                                <div className="flex">
                                    <ErrorBoundary>
                                        <SearchAppBar />
                                        <Container>
                                            <Outlet />
                                        </Container>
                                        {/* <Container>
                                        <div style={{ textAlign: 'center', marginTop: "2%", marginBottom: "2%" }}>{wasSearched && <PagingInfo style={{ color: 'darkgreen' }} />}</div>
                                        <Grid container sx={{marginTop: "2%", marginBottom: "2%"}}>
                                            <Grid item xs={1}></Grid>
                                            <Grid item xs={10}><ButtonGroup variant="contained" aria-label="outlined primary button group">
                                                <Facet show={genres.length} field="genres" label="Genres" filterType="all" isFilterable={true} view={GenreButton} />
                                                <Facet show={12} field="start_year" label="Year" filterType="any" isFilterable={true} view={YearButton} />
                                                <Facet field="title_type" label="Movie Type" filterType="any" isFilterable={true} view={MovieTypeButton} />
                                                <Facet field="links.audio_language" label="Available in below language" isFilterable={true} filterType="any" showSearch={true} show={1000} view={DubbingButton} />
                                                <Facet field="language" label="Language" isFilterable={true} filterType="any" show={1000} view={LanguageButton} />
                                                <Facet field="color" label="Color" filterType="any" isFilterable={true} view={ColorButton} />
                                                <Facet field="num_votes" label="Popularity" filterType="any" isFilterable={true} view={PopularityButton} />
                                                <Facet field="rating" label="Rating" isFilterable={true} filterType="all" show={1000} view={RatingButton} />
                                                {wasSearched && (<Sorting label={"Sort by"} view={SortingButton} sortOptions={SORT_OPTIONS} />)}
                                                {wasSearched && <ResultsPerPage options={[16, 32, 48]} view={PerPageComponent} label={"Per Page"} />}
                                            </ButtonGroup></Grid>
                                            <Grid item xs={1}></Grid>
                                        </Grid>

                                        <Results
                                            titleField="primary_title.raw"
                                            thumbnailField="poster"
                                            resultView={ResultCard}
                                            view={ResultsView}
                                            className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
                                            shouldTrackClickThrough={true}
                                        />
                                        <div style={{ marginTop: "1%", float: 'right', }}>{wasSearched && <Paging view={PaginationView} />}</div>
                                    </Container> */}
                                    </ErrorBoundary>
                                </div>

                            );
                        }}
                    </WithSearch></div>
                </SearchProvider>
            
        </>
    );
}