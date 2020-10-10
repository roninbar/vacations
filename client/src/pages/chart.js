import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Html5Entities } from 'html-entities';

const entities = new Html5Entities();

class Chart extends Component {

    constructor(props) {
        super(props);

        this.state = {

            chartOptions: {
                chart: {
                    type: 'bar'
                },
                title: {
                    text: 'Followers by Vacation',
                },
                xAxis: {
                    categories: ['Africa', 'America', 'Asia', 'Europe', 'Oceania'],
                    title: {
                        text: 'Vacation ID',
                    },
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: null,
                    },
                    labels: {
                        overflow: 'justify'
                    }
                },
                tooltip: {
                },
                plotOptions: {
                    bar: {
                        dataLabels: {
                            enabled: true
                        }
                    }
                },
                legend: {
                },
                credits: {
                    enabled: false
                },
                series: [],
            },
        };
    }

    render() {
        const { vacations } = this.props;
        const { chartOptions } = this.state;
        return (
            vacations?.length > 0
                ? (
                    <HighchartsReact highcharts={Highcharts} options={chartOptions} />)
                : (
                    <h1>No vacation is being followed.</h1>
                )
        );

    }

    componentDidMount() {
        const { vacations } = this.props;
        this.updateChartOptions(vacations);
    }

    componentDidUpdate({ vacations: prevVacations }) {
        const { vacations: currVacations } = this.props;
        const xor = _.xor(prevVacations, currVacations);
        if (!_.isEmpty(xor)) {
            this.updateChartOptions(currVacations);
        }
    }

    updateChartOptions(vacations) {
        const { chartOptions: { xAxis: { categories, ...restXAxis }, series, ...restChartOptions } } = this.state;
        this.setState({
            chartOptions: {
                xAxis: {
                    categories: vacations.map(({ id }) => id),
                    ...restXAxis,
                },
                series: [
                    {
                        name: 'Followers',
                        data: vacations.map(({ destination, from, to, followers }) => ({
                            name: this.formatCategory(destination, from, to),
                            y: followers,
                        })),
                    },
                ],
                ...restChartOptions,
            },
        });
    }

    formatCategory(destination, from, to) {
        return entities.decode(`${destination}, ${from} &ndash; ${to}`);
    }
}

const mapStateToProps = ({ vacations: { vacations } }) => ({ vacations: vacations.filter(({ followers, }) => followers > 0) });

const withRedux = connect(mapStateToProps);

export default withRedux(Chart);