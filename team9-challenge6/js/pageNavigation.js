"use strict";

class PageNavigation extends React.Component {

    render() {

        var currentPage= this.props.currentPage;
        var totalPages= (this.props.totalPages < 1000) || 1000;
        var totalResults= (this.props.totalResults < 20*1000) || 20*1000;

        return(

            <nav aria-label="Movie page navigation">

                <ul className="pager">

                     
                    {(currentPage <= 1) 
                        ? (
                            <li className="previous disabled">
                                <a 
                                    href="#"
                                    onClick={(e) => this.getPage(e, 1)}
                                >
                                    <span aria-hidden="true">&larr;</span> First
                                </a>
                            </li>
                        ) 
                        : (
                            <li className="previous">
                                <a 
                                    href="#"
                                    onClick={(e) => this.getPage(e, 1)}
                                >
                                    <span aria-hidden="true">&larr;</span> First
                                </a>
                            </li>
                        )
                    }
                    

                    {(currentPage <= 1)
                        ? (
                            <li className="disabled">

                                    <a 
                                        href="#"
                                    >
                                        <span aria-hidden="true">&larr;</span> Previous
                                    </a>

                            </li>                            
                        )
                        : (
                            <li>
                                <span>
                                    <a 
                                        href="#"
                                        onClick={(e) => this.getPage(e, currentPage - 1)}
                                    >
                                        <span aria-hidden="true">&larr;</span> Previous
                                    </a>
                                </span>
                            </li>
                        )
                    }
                        
                    <li><span>page <b>{currentPage}</b> of <b>{totalPages}</b>    ({totalResults} total results)</span></li>

                    {(currentPage >= totalPages)
                        ? (
                            <li className="disabled">
                                    <a 
                                        href="#"
                                    >
                                        Next <span aria-hidden="true">&rarr;</span>
                                    </a>
                            </li>
                        )
                        : (
                            <li>
                                    <a 
                                        href="#"
                                        onClick={(e) => this.getPage(e, currentPage + 1)}
                                    >
                                        Next <span aria-hidden="true">&rarr;</span>
                                    </a>
                            </li>
                        )
                    }

                    {(currentPage >= totalPages)
                        ? (
                            <li className="next disabled">
                                <a 
                                    href="#"
                                    onClick={(e) => this.getPage(e, totalPages)}
                                >
                                    Last <span aria-hidden="true">&rarr;</span>
                                </a>
                            </li>
                        )
                        : (
                            <li className="next">
                                <a 
                                    href="#"
                                    onClick={(e) => this.getPage(e, totalPages)}
                                >
                                    Last <span aria-hidden="true">&rarr;</span>
                                </a>
                            </li>
                        )
                    }

                </ul>
            </nav>

        );
    }

    getPage(e, page) {
        e.preventDefault();

        this.props.onClick(page);
    }
}
