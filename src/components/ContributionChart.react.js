const React = require('react');
const reactCreateClass = require('create-react-class');
const {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} = require('Recharts');
const ContributionStore = require('../stores/ContributionStore');

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
    return (
      <div>
        <h3>Users vs Contributions for {this.props.repo}</h3>
        <ResponsiveContainer width="90%" height={400}>
          <LineChart
            height={400}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis dataKey="login" />
            <YAxis dataKey="contributions" />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="contributions"
              stroke="#8884d8"
              activeDot={{ r: 10 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  },
  onChange() {
    this.setState(getContributionState());
  },
});

module.exports = ContributionChart;
