import React, { Component } from 'react';
import NewCompForm from './NewCompForm';
const IPC = require('electron').ipcRenderer;


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tree: 'sample text',
      components: [
        {
          name: 'App',
          child: []
        }
      ],
      newName: '',
      newParent: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Updates a placeholder in state with text input value.
  handleInputChange(e) {
    this.setState({newName: e.target.value})
  }

  // Updates a placeholder in state with selected value.
  handleSelectChange(e) {
    this.setState({newParent: e.target.value})
  }

  // Submits form data and updates state with new component details.
  handleSubmit(e) {
      e.preventDefault()
      const newName = this.state.newName
      const parent = this.state.newParent;
      const comp = this.state.components.slice();
      if (newName === '') {
        alert('Please enter a component name.')
      } else if (parent === '') {
        alert('Please select a parent component.')
      } else {
        for (let i = 0; i < comp.length; i += 1) {
          if (comp[i].name === parent) {
            comp[i].child.push(newName)
            break
          }
        }
        comp.push({
          name: newName,
          child: []
        })
        this.setState({ components: comp })
      }
    }

    componentWillMount() {
      //this sends this.state.tree to the back end
      IPC.send('treeInfo', this.state.tree);
    }

    render() {
      return (
        <div>
          <h1>Hello KVK</h1>
          <NewCompForm
            newName={this.state.newName}
            newParent={this.props.newParent}
            handleInputChange={this.handleInputChange}
            handleSelectChange ={this.handleSelectChange}
            handleSubmit={this.handleSubmit}
            components={this.state.components}
            />
        </div>
      );
    }
  }

  export default App;
