import languages from "../languages.json"
import genres from "../genres.json"
import movie_types from "../movie_types.json";
import audio_languages from "../audio_languages.json";
import ElasticSearchAPIConnector from "@elastic/search-ui-elasticsearch-connector";
const connector = new ElasticSearchAPIConnector({ host: 'http://localhost:8001', index: 'movies' });
export const config = {
    debug: true,
    alwaysSearchOnInitialLoad: false,
    apiConnector: connector,
    hasA11yNotifications: true,
    initialState: {
        resultsPerPage: 32
    },
    searchQuery: {
        filters: [],
        resultsPerPage: 32,
        search_fields: {
            "primary_title.raw": {
                weight: 5
            },
            "akas": {
                weight: 3
            },
            "crew.basic_info.primary_name.raw": {
                weight: 2
            },
            "keywords": {
                weight: 2
            },

        },
        result_fields: {
            id: { raw: {} },
            primary_title: { raw: {}, snippet: { size: 100, fallback: true } },
            start_year: { raw: {} },
            num_votes: { raw: {} },
            rating: { raw: {} },
            plot_outline: { raw: {}, snippet: { size: 100, fallback: true } },
            language: { raw: {} },
            genres: { raw: {} },
            title_type: { raw: {} },
            keywords: { raw: {} },
            runtime_minutes: { raw: {} },
            color: { raw: {} },
            tconst: { raw: {} },
            poster: { raw: {} },
            "crew.basic_info.primary_name": {raw: {}}
        },
        disjunctiveFacets: [
          "num_votes",
          "title_type",
          "links.audio_language",
          "rating",
          "color",
          "title_type",
          "language",
          "genres",
          "start_year",
        ],
        facets: {
            num_votes: {
                type: "range",
                ranges: [
                    { from: 1, name: "All" },
                    { from: 1000, name: "More than a thousand" },
                    { from: 10000, name: "More than 10 thousand" },
                    { from: 100000, name: "More than 100 thousand" },
                    { from: 1000000, name: "More than a million" },
                ]
            },
            "title_type": {
                type: "value", values: movie_types
            },
            "links.audio_language": { type: "value", value: audio_languages },
            rating: {
                type: "range",
                ranges: [
                    { from: 1, name: "1 or more out of 10" },
                    { from: 2, name: "2 or more out of 10" },
                    { from: 3, name: "3 or more out of 10" },
                    { from: 4, name: "4 or more out of 10" },
                    { from: 5, name: "5 or more out of 10" },
                    { from: 6, name: "6 or more out of 10" },
                    { from: 7, name: "7 or more out of 10" },
                    { from: 8, name: "8 or more out of 10" },
                    { from: 9, name: "9 or more out of 10" },
                ]
            },
            color: {
                type: "value",
                values: ['color', 'black and white']
            },
            language: {
                type: "value",
                values: languages
            },
            genres: {
                type: "value",
                values: genres
            },
            start_year: {
                type: "range",
                ranges: [
                    { from: 1894, to: 1919, name: "Before 1920" },
                    { from: 1920, to: 1929, name: "1920s" },
                    { from: 1930, to: 1939, name: "1930s" },
                    { from: 1940, to: 1949, name: "1940s" },
                    { from: 1950, to: 1959, name: "1950s" },
                    { from: 1960, to: 1969, name: "1960s" },
                    { from: 1970, to: 1979, name: "1970s" },
                    { from: 1980, to: 1989, name: "1980s" },
                    { from: 1990, to: 1999, name: "1990s" },
                    { from: 2000, to: 2009, name: "2000s" },
                    { from: 2010, to: 2019, name: "2010s" },
                    { from: 2020, name: "2020s" },
                ]
            },
        }
    },
    autocompleteQuery: {
        results: {
            search_fields: {
                primary_title: { raw: {} },
                "aka_suggest": { raw: {}, suggest: {} },
                "crew.basic_info.primary_name": { raw: {} },
                "keywords": { raw: {} },
            },
            resultsPerPage: 32,
            result_fields: {
                id: { raw: {}},
                akas: { raw: {}},
                primary_title: { raw: {}, suggest: {} },
                keywords: { raw: {} },
                start_year: { raw: {} },
                num_votes: { raw: {} },
                rating: { raw: {} },
                plot_outline: { raw: {}, snippet: { size: 100, fallback: true } },
                language: { raw: {} },
                genres: { raw: {} },
                title_type: { raw: {} },
                runtime_minutes: { raw: {} },
                color: { raw: {} },
                tconst: { raw: {} },
                poster: { raw: {} },
            }
        },
        suggestions: {
            types: {
                documents: {
                    fields: ["primary_title.suggest", "akas_suggest.raw", "crew.basic_info.primary_name.suggest"]
                    // fields: ["crew.basic_info.primary_name.suggest"]
                    // fields: ["akas_suggest"]
                }
            },
            size: 10
        }
    }
};
export const SORT_OPTIONS = [
    {
        name: "Relevance",
        value: []
    },
    {
        name: "Title",
        value: [
            {
                field: "primary_title.keyword",
                direction: "asc"
            }
        ]
    },
    {
        name: "Popularity",
        value: [
            {
                field: "num_votes",
                direction: "desc"
            }
        ]
    },
    {
        name: "Rating",
        value: [
            {
                field: "rating",
                direction: "desc"
            }
        ]
    },
    {
        name: "Year",
        value: [
            {
                field: "start_year",
                direction: "desc"
            }
        ]
    },
];