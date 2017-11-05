const React = require('react');
const reactCreateClass = require('create-react-class');
const Typeahead = require('react-bootstrap-typeahead').Typeahead;
const UserStore = require('../stores/UserStore');
const RepoAPI = require('../utils/RepoAPI');
const RepoList = require('./RepoList.react');

function getUserState() {
  return {
    users: UserStore.getList(),
    selected: ' ',
    found: ' ',
  };
}
const UserList = reactCreateClass({
  getInitialState() {
    return getUserState();
  },
  componentDidMount() {
    UserStore.addChangeListener(this.onChange);
  },
  componentWillUnmount() {
    UserStore.removeChangeListener(this.onChange);
  },
  render() {
    const data = Object.values(this.state.users);
    let repo;
    if (this.state.found === 'found') {
      repo = <RepoList user={this.state.selected} />;
    } else if (this.state.found === 'notfound') {
      repo = <p>No repositories found</p>;
    }
    return (
      <div className="Repo-List">
        <h3>Github Repositories</h3>
        <Typeahead
          labelKey="login"
          options={data}
          onChange={this.handleChange}
        />
        {repo}
      </div>
    );
  },
  handleChange(item) {
    if (item[0]) {
      const userSelected = item[0].login;
      this.setState({
        selected: userSelected,
        found: 'found',
      });
      RepoAPI.get(userSelected);
    } else {
      this.setState({
        found: 'notfound',
      });
    }
  },
  onChange() {
    this.setState(getUserState());
  },
});

module.exports = UserList;
