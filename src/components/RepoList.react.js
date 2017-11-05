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
    found: null,
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
    let repolist;
    if (data[0] === 'Error') {
      repolist = <h4> User Does not exist </h4>;
    } else if (data.length > 0) {
      repolist = (
        <div>
          <h4>Repositories for {this.props.user}</h4>
          <Typeahead
            labelKey="name"
            options={data}
            onChange={this.handleChange}
          />
        </div>
      );
    } else {
      repolist = <h4> This User has no repositories</h4>;
    }
    if (this.state.found === true) {
      contributions = <ContributionChart repo={this.state.selected} />;
    } else if (this.state.found === false) {
      contributions = <p>Repository not found</p>;
    }
    return (
      <div className="Repo-List">
        {repolist}
        {contributions}
      </div>
    );
  },
  handleChange(item) {
    if (item[0]) {
      const repoSelected = item[0].full_name;
      this.setState({
        selected: repoSelected,
        found: true,
      });
      ContributionAPI.get(repoSelected);
    } else {
      this.setState({
        found: false,
      });
    }
  },
  onChange() {
    this.setState(getRepoState());
  },
});

module.exports = RepoList;
