import React from 'react';
import './indicator.css';
import PropTypes from 'prop-types';

class Indicator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formDeg: -90
        };
    }

    setIndicatorLine(prevFrom) {
        const timerId = setInterval(() => {

            this.setState((state, props) => {
                return {
                    formDeg: props.from !== state.formDeg ? state.formDeg + 1 : state.formDeg
                }
            })

        }, 100);
        setTimeout(() => {
            clearInterval(timerId);
        }, 1000);
    }

    render() {
        return (
            <div className="indicator">
                <div className="indicator-body">
                    <div className="indicator-line"
                        style={{ transitionDuration: '1s linear', background: `conic-gradient(from ${this.state.formDeg}deg, transparent, #000)` }}
                    />
                    <div className="indicator-arrow-body">
                        <div className="indicator-arrow"
                            style={{ transition: '1s', transform: `rotate(${this.props.from}deg)` }}
                        />
                    </div>
                </div>
            </div>
        );
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.from !== this.props.from) {
            this.setIndicatorLine(prevProps.from);
        }
    }

    componentDidMount() {
        this.setState({
            formDeg: this.props.from
        });
    }
}

Indicator.propTypes = {
    from: PropTypes.number,
    to: PropTypes.number
};

export default Indicator;
