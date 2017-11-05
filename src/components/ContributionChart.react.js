const React = require('react');
const reactCreateClass = require('create-react-class');
const ContributionStore = require('../stores/ContributionStore');
const {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} = require('Recharts');

function getContributionState() {
  return {
    contributions: ContributionStore.getList(),
  };
}
const ContributionChart = reactCreateClass({
  getInitialState() {
    return getContributionState();
  },
  componentDidMount() {
    ContributionStore.addChangeListener(this.onChange);
  },
  componentWillUnmount() {
    ContributionStore.removeChangeListener(this.onChange);
  },
  render() {
    const data = Object.values(this.state.contributions);
    let chart;
    if (data[0] === 'Error') {
      chart = <p>This repo has no contributions</p>;
    } else {
      chart = (
        <div>
          <h4>Users vs Contributions for {this.props.repo}</h4>
          <ResponsiveContainer width="90%" height={400}>
            <BarChart
              height={400}
              layout="horizontal"
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <XAxis dataKey="login" />
              <YAxis />
              <CartesianGrid />
              <Tooltip />
              <Legend verticalAlign="top" height={36} />
              <Bar dataKey="contributions" label="login" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      );
    }
    return <div>{chart}</div>;
  },
  onChange() {
    this.setState(getContributionState());
  },
});

module.exports = ContributionChart;
