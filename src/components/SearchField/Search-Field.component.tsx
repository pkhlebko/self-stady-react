import React from 'react';

type SearchFieldProps = {updateSearchString: (searchString: string) => void};
type SearchFieldState = {searchString: string};

export class SearchField extends React.Component<SearchFieldProps, SearchFieldState> {
  constructor(props: SearchFieldProps) {
    super(props);
    this.state = {searchString: ''};

    this.handleInputChange = this.handleInputChange.bind(this);
    this.cleanSearchbox = this.cleanSearchbox.bind(this);
  }

  render() {
    return (
      <>
        <input name="searchString" type="text" value={this.state.searchString} onChange={this.handleInputChange} />
        <button onClick={this.cleanSearchbox}>Clean</button>
        <button onClick={() => this.props.updateSearchString(this.state.searchString)}>Search</button>
      </>
    );
  }

  handleInputChange({target}: React.ChangeEvent<HTMLInputElement>) {
    this.setState({searchString: target.value});
  }

  cleanSearchbox() {
    this.props.updateSearchString('');
    this.setState({searchString: ''});
  }
}
