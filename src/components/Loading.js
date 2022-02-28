import '../styles/Loading.css'

export default function Loading() { 
    return (
        <div data-testid="loading-spinner">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}