import React from 'react';
import './App.scss';
import  CheckBox  from './CheckBox';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      fieldDefinitions: [],
      selectedDefinitions: []
    };

    this.addHandler = this.addHandler.bind(this);
    this.removeHandler = this.removeHandler.bind(this);
  }

  componentDidMount() {
    fetch("/api/definitions/")
      .then(response => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then(json => this.buildList(json));
  }

  buildList(json) {
    this.setState({
      title: json.title,
      fieldDefinitions: json.fieldDefinitions.map(function(item, index) {
        return {
          index,
          value: item,
          isChecked: false
        }
      }),
      selectedDefinitions: []
    })
  }

  addHandler(event) {
    let fieldDefinitions = this.state.fieldDefinitions, selectedDefinitions = this.state.selectedDefinitions;
    
    fieldDefinitions.forEach(fieldDefinition => {
      if (fieldDefinition.isChecked)
        selectedDefinitions.push({...fieldDefinition, isChecked: false });
    });

    this.setState({
      selectedDefinitions: selectedDefinitions,
      fieldDefinitions: fieldDefinitions.filter((fieldDefinition) => {
        return fieldDefinition.isChecked === false
      })
    })
  }

  removeHandler(event) {
    let fieldDefinitions = this.state.fieldDefinitions, selectedDefinitions = this.state.selectedDefinitions;
    
    selectedDefinitions.forEach(fieldDefinition => {
      if (fieldDefinition.isChecked)
        fieldDefinitions.push({...fieldDefinition, isChecked: false });
    });

    this.setState({
      fieldDefinitions: fieldDefinitions,
      selectedDefinitions: selectedDefinitions.filter((fieldDefinition) => {
        return fieldDefinition.isChecked === false
      })
    })
  }

  handleCheckFieldElement = (event, ref) => {
    let fields = this.state[ref || 'selectedDefinitions']
    
    fields.forEach(fieldDefinition => {
      if (fieldDefinition.value === event.target.value)
        fieldDefinition.isChecked =  event.target.checked
    });

    if(ref) {
      this.setState({fieldDefinitions: fields});
    } else {
      this.setState({selectedDefinitions: fields});
    }
  }

  render() {
    let list, selectedList;

    if(this.state.fieldDefinitions) {
      list = this.state.fieldDefinitions.map((item, index) => {
        return (<CheckBox key={ index } handleCheckFieldElement = { (item) => { this.handleCheckFieldElement(item, 'fieldDefinitions') }} { ...item } />)
      });
    }

    if(this.state.selectedDefinitions) {
      selectedList = this.state.selectedDefinitions.map((item, index) => {
        return (<CheckBox key={ index } handleCheckFieldElement = { this.handleCheckFieldElement } {...item} />)
      });
    }

    return (
      <div className="App flex-column">
        <header className="App-header">
          <h1>{ this.state.title }</h1>
        </header>
        <div className="container flex-wrapper">
          <div className="card">
            <div className="card-header">
              Definitions
            </div>
            <div className="card-body">
              { list }
            </div>
          </div>
          <div className="action-buttons">
            <div className="btn-group">
              <button className="btn btn-primary" onClick={ this.addHandler }>&gt; Use</button>
              <button className="btn btn-primary" onClick={ this.removeHandler }>&lt; Remove</button>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              Selected Fields
            </div>
            <div className="card-body">
              { selectedList }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
