import React from 'react';
import './indicator.css';
import PropTypes from 'prop-types';

class Indicator extends React.Component {
    render() {
        return (
            <div className="indicator">
                <div className="indicator-body">
                    <div className="indicator-line"/>
                    <div className="indicator-arrow" />
                </div>
            </div>
        );
    }
}

Indicator.propTypes = {
    from: PropTypes.number,
    to: PropTypes.number
};

export default Indicator;