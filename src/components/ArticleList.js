import Error from './Error';
import Loading from './Loading';
import Article from './Article';

export default function ArticleList(props)  { 
    const renderArticles = () => {
        if (props.fetching) {
            return <Loading/>;
        } else if (props.error) {
            return <Error/>;
        } else {
            return props.articles.map((article, index) => {
                if (index < props.articleCount) {
                    return <Article title={article.article} key={index} views={article.views ? article.views : article.views_ceil}/>
                }
            })
        }
    }
    return (
        <div data-testid="article-list">
            { renderArticles() }
        </div>
    );
}