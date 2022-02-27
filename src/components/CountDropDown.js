const options = ["25", "50", "75", "100", "200"];

export default function CountDropDown(props) {
    const handleSelect = event => {
        props.handleSelectCount(event.target.value);
    }

    return (
        <div className="col-6">
            <label htmlFor="countSelect">Number of Results</label>
            <select
                data-testid="select-article-count"
                name="countSelect"
                value={props.count}
                onChange={handleSelect}>
                {options.map((option, i) => <option key={i} value={option}>{option}</option>)}
            </select>
        </div>
    );
}