const React = require('react');
const reactCreateClass = require('create-react-class');
const RepoAPI = require('../utils/RepoAPI');
const RepoList = require('./RepoList.react');

const UserList = reactCreateClass({
  getInitialState() {
    return {
      selected: '',
      found: null,
    };
  },
  render() {
    let repo;
    if (this.state.found === true) {
      repo = <RepoList user={this.state.selected} />;
    } else if (this.state.found === false) {
      repo = <p>This can not be left blank</p>;
    }
    return (
      <div className="Repo-List">
        <h3>Github explorer</h3>
        <h4>Github User</h4>
        <form onSubmit={this.handleSubmit}>
          <input
            type="search"
            id="search"
            placeholder="Github user name"
            value={this.state.selected}
            onChange={this.handleChange}
          />
          <button>Go</button>
        </form>
        {repo}
      </div>
    );
  },
  handleChange(e) {
    this.setState({ selected: e.target.value });
  },
  handleSubmit(e) {
    if (this.state.selected !== '') {
      RepoAPI.get(this.state.selected);
      this.setState({ found: true });
    } else {
      this.setState({ found: false });
    }
    e.preventDefault();
  },
});

module.exports = UserList;
