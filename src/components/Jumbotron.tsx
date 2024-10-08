import React, { FC } from 'react';

const Jumbotron: FC = () => {
    return (
        <div className="container">
            <div className="row space-100">
                <div className="col-lg-7 col-md-12 col-xs-12">
                    <div className="contents">
                    <h2 className="head-title">Blockchain Escrow System <br/> Secure and Transparent Payments</h2> {/* Static heading */}
                    <p>JobGo ensures that payments between job seekers and employers are safe with our blockchain-powered escrow system. 
                        Funds are held securely in escrow and only released when both parties confirm the job is completed, 
                        providing trust and transparency for all transactions.</p>
                        <div className="job-search-form">
                            <form>
                                <div className="row">
                                    <div className="col-lg-5 col-md-5 col-xs-12">
                                        <div className="form-group">
                                            <input className="form-control" type="text" placeholder="Job Title or Company Name"/>
                                        </div>
                                    </div>
                                    <div className="col-lg-5 col-md-5 col-xs-12">
                                        <div className="form-group">
                                            <div className="search-category-container">
                                                <label className="styled-select">
                                                    <select>
                                                        <option value="none">Locations</option>
                                                        <option value="none">New York</option>
                                                        <option value="none">California</option>
                                                        <option value="none">Washington</option>
                                                        <option value="none">Birmingham</option>
                                                        <option value="none">Chicago</option>
                                                        <option value="none">Phoenix</option>
                                                    </select>
                                                </label>
                                            </div>
                                            <i className="lni-map-marker"/>
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-md-2 col-xs-12">
                                        <button type="submit" className="button"><i className="lni-search"/></button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-lg-5 col-md-12 col-xs-12">
                    <div className="intro-img">
                        <img src="assets/img/intro.png" alt="Intro Image"/> {/* Static image alt text */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Jumbotron;
