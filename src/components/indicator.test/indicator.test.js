import React from 'react';
import './indicator.test.css';
import PropTypes from 'prop-types';

class IndicatorTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            semiCf: 0,
            cf: 0,
            radius: 0,
            mask: 32,
            range: 30,
        };
        this.wrapper = React.createRef();
        this.circleOutlineCurves = React.createRef();
        this.circleLow = React.createRef();
        this.circleLowMask = React.createRef();
        this.circleOutlineEnds = React.createRef();
        this.meterNeedle = React.createRef();
    }

    onResizeWindow = () => {
        const {innerWidth} = window;
        switch (innerWidth) {
            case innerWidth > 992 && innerWidth < 1199: {
                //this.initSpeedometer()
                break;
            }
            default: break;
        }
    };

    initSpeedometer(radius = this.state.radius) {

        if(radius === 0) {
            radius = this.props.radius;
        }

        const circles = [
            this.circleOutlineCurves.current,
            this.circleLow.current,
            this.circleLowMask.current,
            this.circleOutlineEnds.current
        ];

        circles.forEach(circle => circle.setAttribute('r', radius));

        const meterDimension = (radius * 2) + 100;
        const wrapper = this.wrapper.current;
        wrapper.style.width = meterDimension + "px";
        wrapper.style.height = meterDimension + "px";

        const cf = 2 * Math.PI * radius;
        const semiCf = cf / 2;

        this.circleOutlineCurves.current.setAttribute("stroke-dasharray", semiCf + "," + cf);
        this.circleLow.current.setAttribute("stroke-dasharray", semiCf + "," + cf);
        this.circleOutlineEnds.current.setAttribute("stroke-dasharray", 2 + "," + (semiCf - 2));
        this.circleLowMask.current.setAttribute("stroke-dasharray", semiCf + "," + cf);

        const {innerWidth} = window;
        const isLessThan575 = innerWidth < 575 && radius <= 100;
        let strokeWidth = this.state.mask;
        if (isLessThan575) {
            strokeWidth = Math.ceil(radius * 0.264);
        }

        setTimeout(() => {
            this.rangeChangeEvent(semiCf, cf);
            this.setState({
                semiCf,
                cf,
                radius,
                mask: strokeWidth,
                range: strokeWidth - 2,
            });
        }, 0);
    }

    rangeChangeEvent = (semiCf, cf) => {
        const percent = this.props.from;
        const meterValue = semiCf - ((percent * (100 / this.props.to) * semiCf) / 100);
        this.circleLowMask.current.setAttribute("stroke-dasharray", meterValue + "," + cf);
        this.meterNeedle.current.style.transform = "rotate(" + (270 + ((percent * (100 / this.props.to) * 180) / 100)) + "deg)";
    };

    render() {
        const { radius } = this.state;
        return (
            <div className="indicator-test" style={{ maxHeight: `${radius + 100}px` }}>
                <div ref={this.wrapper} className="wrapper">
                    <svg className="meter">
                        <circle ref={this.circleOutlineCurves} className="circle outline" cx="50%" cy="50%" />

                        <circle ref={this.circleLow} className="circle range" cx="50%" cy="50%"
                                style={{ strokeWidth: `${this.state.range}` }}
                        />

                        <circle ref={this.circleLowMask} className="circle mask" cx="50%" cy="50%"
                            style={{ strokeWidth: `${this.state.mask}` }}
                        />

                        <circle ref={this.circleOutlineEnds} className="circle outline" cx="50%" cy="50%" />
                    </svg>
                    <div className="body-meter-needle">
                        <div ref={this.meterNeedle} className="meter-needle"
                            style={{ height: `${radius * 2}px` }}
                        />
                    </div>
                </div>
            </div>
        );
    }

    componentDidUpdate(prevProps) {
        if(prevProps.from !== this.props.from) {
            this.rangeChangeEvent(this.state.semiCf, this.state.cf);
        }
    }

    componentDidMount() {
        this.initSpeedometer();
        window.addEventListener('resize', this.onResizeWindow);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onResizeWindow);
    }
}

IndicatorTest.propTypes = {
    from: PropTypes.number,
    to: PropTypes.number,
    radius: PropTypes.number,
};

export default IndicatorTest;
