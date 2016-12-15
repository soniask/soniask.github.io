class WeatherSaved extends React.Component {
    render(){
        return (
            <ul className="list-group section">
                <li className="list-group-item list-header">My Locations</li>

                {
                    this.props.saved.map((location) => (
                        <li key={location} className="list-group-item">
                            <div className="row">
                                <div className="col-xs-9">
                                    <a href="#" onClick={(e) => this.onSavedClick(e, location)}>
                                        {location}
                                    </a>
                                </div>
                                <div className="col-xs-3 text-right">
                                    <a 
                                        href="#"
                                        onClick={(e) => this.onRemovedClick(e, location)}>
                                        Remove
                                    </a>
                                </div>
                            </div>
                            
                        </li>
                    ))
                }
            </ul>
        );
    }

    onSavedClick(e, location) {
        e.preventDefault();

        this.props.onClick(location);
    }

    onRemovedClick(e, location) {
        e.preventDefault();
        this.props.onRemoveClick(location);

    }
}
