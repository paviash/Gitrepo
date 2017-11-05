const React = require('react');
const reactCreateClass = require('create-react-class');
const Typeahead = require('react-bootstrap-typeahead').Typeahead;
const RepoStore = require('../stores/RepoStore');
const ContributionChart = require('./ContributionChart.react');
const ContributionAPI = require('../utils/ContributionAPI');

function getRepoState() {
  return {
    repos: RepoStore.getList(),
    selected: ' ',
    found: ' ',
  };
}
const RepoList = reactCreateClass({
  getInitialState() {
    return getRepoState();
  },
  componentDidMount() {
    RepoStore.addChangeListener(this.onChange);
  },
  componentWillUnmount() {
    RepoStore.removeChangeListener(this.onChange);
  },
  render() {
    const data = Object.values(this.state.repos);
    let contributions;
    if (this.state.found === 'found') {
      contributions = <ContributionChart repo={this.state.selected} />;
    } else if (this.state.found === 'notfound') {
      contributions = <p>No Users found</p>;
    }
    return (
      <div className="Repo-List">
        <h3>Repositories for {this.props.user}</h3>
        <Typeahead
          labelKey="name"
          options={data}
          onChange={this.handleChange}
        />
        {contributions}
      </div>
    );
  },
  handleChange(item) {
    if (item[0]) {
      const repoSelected = item[0].full_name;
      this.setState({
        selected: repoSelected,
        found: 'found',
      });
      ContributionAPI.get(repoSelected);
    } else {
      this.setState({
        found: 'notfound',
      });
    }
  },
  onChange() {
    this.setState(getRepoState());
  },
});

module.exports = RepoList;
