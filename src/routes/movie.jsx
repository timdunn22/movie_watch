import { useLoaderData } from "react-router-dom"
import axios from "axios"
import { VideoEmbed } from "../components/video"
import { Container, Box, Switch, Stack, Typography, Grid, ButtonGroup, Select, MenuItem, Accordion, AccordionSummary, AccordionDetails } from "@mui/material"
import { Details } from "@mui/icons-material"
import { ButtonBasicDropDown } from "../components/buttons"
import { useState } from "react"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

export async function loader({ params }) {
    const movieId = params.movieId
    const url = "http://localhost:8001/movies/"
    const movie = await axios.get(url + movieId).then((response) => response.data)
    console.log(movie)
    return { movie }
}

function getCrewNames(result) {
    return result.crew.map((crew) => { return crew.basic_info.primary_name }).join(', ')
}

function getKeywords(result) {
    return result.keywords.map((keyword) => { return keyword }).join(', ')
}

function getGenres(result) {
    return result.genres.map((genre) => { return genre }).join(', ')
}
function embeded_link(best_embeded_links, embed_key, links) {
    if (best_embeded_links[embed_key]) {

    const splits = best_embeded_links[embed_key].split('/')
    return `//ok.ru/videoembed/${splits[splits.length - 1]}`
    }
    else {
        return getEmbededVersion(links[0])
    }
}
function getEmbededVersion(link) {
    if (link && link['link_url']) {
    const splits = link['link_url'].split('/')
    console.log(splits)
    return `//ok.ru/videoembed/${splits[splits.length - 1]}`
    }
    else {
        return null
    }
}
function is_embeded(link) {
    try {
        
    return link.includes("ok.ru")
    } catch (error) {
        return false
    }
}
function not_embeded(link) {
    return !(is_embeded(link))
}
function getEmbedQualityOptions(movie) {
    let embed_quality = [...movie.links.map((link) => (link.quality))].filter(is_embeded)
    return [...[...new Set(embed_quality)], 'All' ]
}
function getNonEmbedQualityOptions(movie) {
    let embed_quality = [...movie.links.map((link) => (link.quality))].filter(not_embeded)
    return [...[...new Set(embed_quality)], 'All' ]
}
function getEmbedDubbingOptions(movie) {
    let embed_quality = [...movie.links.map((link) => (link.audio_language))].filter(is_embeded)
    return [...[...new Set(embed_quality)], 'All' ]
}
function getNonEmbedDubbingOptions(movie) {
    let embed_quality = [...movie.links.map((link) => (link.audio_language))].filter(not_embeded)
    return [...[...new Set(embed_quality)], 'All' ]
}
function filterLinkAttribute(the_links, attribute, value) {
    return the_links.filter((link) => (link[attribute] === value))
}
function filterQuality(the_links, audio_language) {
    if (audio_language === 'all') {
        the_links = the_links.filter((link) => (link.audio_language === audio_language))
    }
    return [...new Set(the_links.map((link) => (link.quality)))]
}
function filterDubbing(the_links, quality) {
    if (quality === 'all') {
        the_links = the_links.filter((link) => (link.quality === quality))
    }
    return [...new Set(the_links.map((link) => (link.audio_language)))]
}
<iframe width="1140" height="495" src="https://www.youtube.com/embed/Tw1rAMzPf70" title="Shiny Happy People: Duggar Family Secrets - Official Trailer | Prime Video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

export default function Movie() {
    const { movie } = useLoaderData()
    const [embedLinks, setEmbedLinks] = useState(movie.links.filter(is_embeded))
    const [links, setLinks] = useState(movie.links.filter(not_embeded))
    const [embededLink, setEmbededLink] = useState(embeded_link(movie.best_embeded_links, "null_language", embedLinks))
    const [embedQualityOptions, setEmbedQualityOptions] = useState(getEmbedQualityOptions(movie))
    const [embedDubbingOptions, setEmbedDubbingOptions] = useState(getEmbedDubbingOptions(movie))
    const [nonEmbedQualityOptions, setNonEmbedQualityOptions] = useState(getNonEmbedQualityOptions(movie))
    const [nonEmbedDubbingOptions, setNonEmbedDubbingOptions] = useState(getNonEmbedDubbingOptions(movie))
    const [nonEmbedQuality, setNonEmbedQuality] = useState('All')
    const [nonEmbedDubbing, setNonEmbedDubbing] = useState('All')
    console.log('movie is', movie)
    console.log('embededlink is', embededLink)
    const toggleLink = () => {
        if (embededLink === embeded_link(movie.best_embeded_links, "null_language", embedLinks)) {
            setEmbededLink('https://www.youtube.com/embed/Tw1rAMzPf70')
            // setEmbededLink("//v.traileraddict.com/95161" )
        }
        else {
            setEmbededLink(embeded_link(movie.best_embeded_links, "null_language", embedLinks))
        }
    }
    const changeEmbedQuality = (e) => {
        if (e === 'All') {
            setEmbedLinks(movie.links.filter(is_embeded))
            setEmbedDubbingOptions(getEmbedDubbingOptions(movie))
        }
        else {
            setEmbedLinks(filterLinkAttribute(embedLinks, 'quality', e))
            setEmbedDubbingOptions(filterDubbing(embedLinks, e))
            setEmbededLink(embedLinks[0])
        }
    }
    const changeEmbedDubbing = (e) => {
        if (e === 'All') {
            setEmbedLinks(movie.links.filter(is_embeded))
            setEmbedQualityOptions(filterQuality(embedLinks, e))
        }
        else {
            setEmbedLinks(filterLinkAttribute(embedLinks, 'audio_language', e))
            setEmbedQualityOptions(filterQuality(embedLinks, e))
            setEmbededLink(embedLinks[0])
        }
    }
    const changeNonEmbedQuality = (e) => {
        if (e === 'All') {
            setLinks(movie.links.filter(not_embeded))
        }
        else {
            setLinks(filterLinkAttribute(links, 'quality', e))
            setNonEmbedDubbingOptions(filterDubbing(links, e))
        }
        setNonEmbedQuality(e)
    }
    const changeNonEmbedDubbing = (e) => {
        if (e === 'All') {
            setLinks(movie.links.filter(not_embeded))
        }
        else {
            setLinks(filterLinkAttribute(links, 'audio_language', e))
            setNonEmbedQualityOptions(filterQuality(links, e))
        }
        setNonEmbedDubbing(e)
    }


    return (
        <>
            <Container><div style={{ marginTop: '50px' }}>
                {/* <img src={movie.poster} alt={movie.tconst}></img> */}
                {/* <ul>Links</ul> */}
                <div style={{ marginBottom: '5px', color: 'white' }}><p><strong>{`${movie.primary_title} (${movie.start_year})`}</strong></p></div>
                {movie.best_embeded_links.null_language && embedLinks &&
                    <Box>
                        <VideoEmbed result={movie} url={embededLink} />
                    </Box>
                }
                <Stack direction={'row'} alignItems={'center'} spacing={2} sx={{ marginTop: '10px', marginLeft: '660px' }}>
                    {embedQualityOptions && embedQualityOptions > 1 && <ButtonBasicDropDown options={embedQualityOptions}
                        onChange={(e) => (changeEmbedQuality(e))}
                        label={'Quality'}
                         style={{ backgroundColor: 'darkgreen' }} /> }
                    {embedDubbingOptions && embedDubbingOptions > 1 && <ButtonBasicDropDown
                        onChange={(e) => (changeEmbedDubbing(e))}
                        options={embedDubbingOptions}
                         label={'Dubbing'} /> }
                    {embededLink && movie.trailer && <div><Typography sx={{ color: 'white' }}>Trailer</Typography><Switch onChange={() => (toggleLink())} defaultChecked></Switch><Typography sx={{ color: 'white' }}>Movie</Typography></div> }
                </Stack>
                {/* <Grid item xs={2}></Grid> */}
                {/* <Grid item xs={2}><Stack direction={'row'} alignItems={'center'}><Typography>Trailer</Typography><Switch defaultChecked></Switch><Typography>Movie</Typography></Stack> */}
                {/* </Grid> */}

                <div style={{ marginBottom: '10px', marginTop: '10px' }}>
                    <Accordion sx={{ backgroundColor: '#0d6efd', color: 'white' }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>Genres</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {getGenres(movie)}
                        </AccordionDetails>
                    </Accordion><Accordion sx={{ backgroundColor: '#0d6efd', color: 'white' }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography>Description</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {movie.plot_outline}
                        </AccordionDetails>
                    </Accordion>
                    <Accordion sx={{ backgroundColor: '#0d6efd', color: 'white' }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel3a-content"
                            id="panel3a-header"
                        >
                            <Typography>Cast</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {getCrewNames(movie)}
                        </AccordionDetails>
                    </Accordion>
                    {movie.keywords && movie.keywords.length > 1 &&
                        <Accordion sx={{ backgroundColor: '#0d6efd', color: 'white' }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel4a-content"
                                id="panel4a-header"
                            >
                                <Typography>Keywords</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {getKeywords(movie)}
                            </AccordionDetails>
                        </Accordion>
                    }
                    <Accordion sx={{ backgroundColor: '#0d6efd', color: 'white' }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel5a-content"
                            id="panel5a-header"
                        >
                            <Typography>Other Places to Watch</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Stack direction={'row'} alignItems={'center'} spacing={2} sx={{ marginTop: '10px', marginBottom: '10px'}}>
                                {nonEmbedQualityOptions && nonEmbedQualityOptions.length > 1 && <ButtonBasicDropDown selected={nonEmbedQuality} options={nonEmbedQualityOptions} 
                                default_value={nonEmbedQuality}
                                onChange={(e) => (changeNonEmbedQuality(e))} 
                                label={'Quality'} 
                                style={{ backgroundColor: 'darkgreen' }} /> }
                                {nonEmbedDubbingOptions && nonEmbedDubbingOptions.length > 1 && <ButtonBasicDropDown 
                                default_value={nonEmbedDubbing} 
                                options={nonEmbedDubbingOptions} 
                                onChange={(e) => (changeNonEmbedDubbing(e))} 
                                label={'Dubbing'} /> }
                            </Stack>
                            {links && links.length > 0 && links.map((link) => (
                                <p>
                                    <a style={{ color: 'white' }} href={link.link_url}>{link.link_url}</a></p>
                            ))}
                        </AccordionDetails>
                    </Accordion>
                </div>
            </div></Container>
        </>
    )

}