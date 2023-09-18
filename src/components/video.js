export function VideoEmbed({ result, url }) {
    return (
        <div className="aspect-w-16 aspect-h-9">
            <iframe width={1080} height={720} title={result.tconst} src={url} frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
    )
}