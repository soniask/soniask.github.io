class WeatherCurrent extends React.Component {
    render() {
        return (
            <div className="section">
                <h2>{this.props.location}</h2>

                <ul className="list-inline">
                    <li>
                        <div >
                            <img src={this.props.icon} />
                        </div>
                    </li>
                    <li>
                        <p >{this.props.temperature}&deg;</p>
                    </li>
                    <li>
                        <p>{this.props.description}</p>
                    </li>
                </ul>

                <button
                    className="btn btn-default"
                    onClick={(e) => this.save(e)}
                >
                    Save
                </button>
            </div>

        );
    }

    save(e) {
        this.props.onSave(this.props.location);
    }
}
