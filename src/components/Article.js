import '../styles/Article.css'

export default function Article(props)  { 
    return (
        <div tabIndex="0" data-testid="article" className="article-card">
            <div className="title">{props.title}</div>
            <div className="views">
                <span>Views:</span>
                <span>{ props.views }</span>
            </div>
        </div>
    )
}