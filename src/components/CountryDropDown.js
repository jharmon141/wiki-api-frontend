import '../styles/CountryDropDown.css';

export default function CountDropDown(props) {
    const handleSelect = event => {
        props.handleSelectCountry(event.target.value);
    }

    return (
        <div className="col-6">
            <label htmlFor="countrySelect">Search by country:</label>
            <select
                className="countrySelect"
                data-testid="select-country"
                name="countrySelect"
                value={props.selectedCountry}
                onChange={handleSelect}>
                <option value="">None</option>
                {props.codes.map(country => <option key={country.alpha2} value={country.alpha2}>{country.name}</option>)}
            </select>
        </div>
    );
}