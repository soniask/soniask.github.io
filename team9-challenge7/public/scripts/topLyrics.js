"use strict";

class TopLyrics extends React.Component {
    
    render() {

        return(
            
            <div className="top-lyrics">

                <div className="title">Top Lines:</div>

                <ol>
                    {
                        this.props.favorites.map((line, index) => (
                            <li key={index}
                                className="line">
                                {line}
                            </li>
                        ))
                    }
                </ol>

            </div>
        );
    }
}