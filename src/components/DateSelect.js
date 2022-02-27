export default function DateSelect(props) {
    const handleSelect = event => {
        event.preventDefault();
        props.handleSelectDate(event.target.value);
    }
    return (
        <div className="col-6">
            <label htmlFor="start">Start date:</label>
            <input
                type="date"
                data-testid="select-date"
                id="start"
                max={props.maxDate}
                onChange={handleSelect}
                value={props.date}
                required>
            </input>
        </div>
    );
}