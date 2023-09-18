import { Link } from "react-router-dom"
import * as React from 'react'
import {
    Grid, Card as BootstrapCard, CardActionArea, Card, CardActions, CardMedia,
    CardContent, Paper, Popover, Typography, Badge
} from '@mui/material'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import ImageListItemBar from '@mui/material/ImageListItemBar'
import ListSubheader from '@mui/material/ListSubheader'
import IconButton from '@mui/material/IconButton'
import Button from 'react-bootstrap/Button';
import StarIcon from '@mui/icons-material/Star';
import HdIcon from '@mui/icons-material/Hd';
import SdIcon from '@mui/icons-material/Sd';
// import './details.css'

function getCrewNames(result) {
    return result.crew.raw.map((crew) => { return crew.basic_info.primary_name }).join(', ')
}
export function ResultView({ result }) {
    const [anchorEl, setAnchorEl] = React.useState(null)
    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <>
            <ImageListItem key={result.poster.raw} >
                {result.poster.raw && <img src={result.poster.raw} alt={result.tconst.raw} />}
                {!result.poster.raw && <img src="https://st.depositphotos.com/1981355/3101/v/600/depositphotos_31010683-stock-illustration-film.jpg" alt={result.tconst.raw} />}
                <MoviePopup
                    result={result}
                    open_function={open}
                    anchor_function={anchorEl}
                    handle_close_function={handlePopoverClose}
                />
                <ImageListItemBar
                    title={<Link className="text-left" to={`movies/${result.id.raw}`}> {`${result.primary_title.raw} (${result.start_year.raw})`}</Link>}
                    subtitle={`${result.runtime_minutes.raw} minutes`}
                    aria-owns={open ? `mouse-over-popover-${result.tconst.raw}` : undefined}
                    aria-haspopup="true"
                    onMouseEnter={handlePopoverOpen}
                    onMouseLeave={handlePopoverClose} />
            </ImageListItem>
        </>

    )
}
export function ResultsView({ children }) {
    return (
        <ImageList gap={10} cols={8}>{children}</ImageList>
    )
}
export function MoviePopupContent({ result }) {
    console.log("The result is", result)
    return (
<p>        <div style={{ backgroundColor: 'navy', color: 'white', fontFamily: "Gill Sans", width: "100%", height: '100%' }} >
            <p><strong>Title: </strong>{result.primary_title.raw}</p>
            <p><strong>Year: </strong>{result.start_year.raw}</p>
            <p><strong>Rating: </strong>{result.rating.raw}</p>
            <p><strong>Genres: </strong>{result.genres.raw.join(', ')}</p>
            {result.keywords && result.keywords.raw.length > 0 && <p style={{ width: 400 }}><strong>Keywords: </strong>{result.keywords.raw.slice(0, 5).join(', ')}</p>}
            {result.crew && result.crew.raw.length > 0 && <p style={{ width: 400 }}><strong>Cast: </strong>{getCrewNames(result)}</p>}
            {result.plot_outline.raw && <p style={{ width: 400 }}><strong>Description: </strong>{result.plot_outline.raw.slice(0, 100)}...</p>}
        </div>
        <p></p></p>
    )

}

export function MoviePopup({ result, open_function, anchor_function, handle_close_function }) {
    return (
        <Popover id={`hover-over-popover-${result.tconst.raw}`}
            sx={{ pointerEvents: 'none', width: '100%', height: '100%' }}
            open={open_function}
            anchorEl={anchor_function}
            anchorOrigin={{ vertical: 'bottom', 'horizontal': 'left' }}
            transformOrigin={{ vertical: 'top', 'horizontal': 'left' }}
            onClose={handle_close_function}
            disableRestoreFocus
            PaperProps={{variant: 'elevated'}}
            elevation={0}
        >
            <MoviePopupContent result={result} sx={{ backgroundColor: 'lightgreen', fontColor: 'darkgreen', height: '100%' }} />
        </Popover>
    )
}

export function ResultCard({ result }) {
    const [anchorEl, setAnchorEl] = React.useState(null)
    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };
    const get_quality = () => {
        return 'HD'
    }
    const open = Boolean(anchorEl);
    return (
        <Card raised sx={{width: '100%'}}>
            <CardMedia
                component="img"
                height="240"
                width="200"
                image={result.poster.raw}
                alt={result.tconst.raw}
            ></CardMedia>
            <MoviePopup
                result={result}
                open_function={open}
                anchor_function={anchorEl}
                handle_close_function={handlePopoverClose}
            />
            <CardContent sx={{  backgroundColor: '#1976d2', height: '110%', width: '100%' }}>
                <Typography gutterBottom
                    variant="body2"
                    align="center"
                    onMouseEnter={handlePopoverOpen}
                    onMouseLeave={handlePopoverClose}
                    component="div">
                    <strong>{`${result.primary_title.raw} (${result.start_year.raw})`}</strong>
                </Typography>

                <Typography gutterBottom paragraph={false} variat="caption" align="center">{result.runtime_minutes.raw} min</Typography>

                
                        <Typography gutterBottom align="center"><Link to={`/movies/${result.id.raw}`} style={{ color: 'white', fontFamily: 'optima' }}><strong>Watch</strong></Link></Typography>
<Grid  container columns={2} sx={{bottom: 0, position: 'relative'}}>
                    <Grid item alignItems="left" alignContent='left' sx={{marginRight: '35%'}}>
                            <StarIcon sx={{ fontSize: 'large', color: 'yellow' }} /><strong style={{fontSize: '10px'}}>{result.rating.raw}</strong></Grid>
                        {/* <Badge overlap='rectangular' badgeContent={result.rating.raw} color="primary">
                        </Badge></Grid> */}
                    
                    <Grid item alignItems='right' alignContent='right' sx={{marginLeft: '10%'}}> <HdIcon sx={{ fontSize:'large', color: 'lightgreen' }} /></Grid>
                </Grid>

            </CardContent>
        </Card>
    );
}

