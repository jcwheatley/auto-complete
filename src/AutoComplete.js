import React, { Component } from 'react'
import './AutoComplete.css';

class AutoComplete extends Component {
    constructor() {
        super();
        this.state = { 
            inputValue: '',
            activeIndex: -1,
            selectedIndex: -1,
            myArray: []
        };
    }

    async searchInput(input) {
        const res = await fetch(`https://coding-challenge.echoandapex.com/locations?q= ${input}`)
        const json = await res.json()
        this.clearList();
        json.predictions.forEach(prediction => {
            this.setState(prevState => ({
                myArray: [...prevState.myArray, prediction]
              }))
        })
    }

    clearList() {
        this.setState({
            myArray: []
        });
    }

    inputChangeHandler = (e) => {
        this.setState({
          inputValue: e.target.value}, () => {
            this.searchInput(this.state.inputValue);
        });
    }

    keyDownHandler = (e) => {
        if(e.keyCode === 38){
            if(this.state.activeIndex > -1){
                this.setState( prevState => ({
                    activeIndex: prevState.activeIndex - 1,
                    selectedIndex: -1
                }))
            }
            
        }
        else if (e.keyCode === 40){
            if(this.state.activeIndex < (this.state.myArray.length - 1)){
                this.setState( prevState => ({  
                    activeIndex: prevState.activeIndex + 1,
                    selectedIndex: -1
                }))
            }
            
        }
        else if(e.keyCode === 13){
            this.setState( prevState => ({  
                selectedIndex: this.state.activeIndex
            }))
        }
        
    }

    isActive = (i) => {
        return (this.state.activeIndex === i ? 'active-index' : null);
    }

    isSelected = (i) => {
        return (this.state.selectedIndex === i ? 'selected-index' : null);
    }
    
    render() {
        return (
            <div className="auto-complete-container">
                <input 
                    className="input-box" 
                    value={this.state.inputValue} 
                    onChange={e => this.inputChangeHandler(e)} 
                    onKeyDown={ this.keyDownHandler }
                    placeholder="Please Enter a Location..."/>
                <div className="results-container">
                    {this.state.myArray.map((item, i) => (
                        
                        <div key={i} className={`results ${this.isActive(i)} ${this.isSelected(i)}`}>
                            {console.log("item: " + JSON.stringify(item))}
                            <b className={"item-name"}>{item.name}</b><br/>
                            {item.description}<br/>
                            {item.tags.map((tag, tagIndex) => {
                                if(tagIndex > 0){
                                    return (<span className={"item-tag"}>, {tag}</span>);
                                }
                                else{
                                    return (<span className={"item-tag"}>{tag}</span>);
                                }
                            })}
                        </div>
                        
                    ))}
                </div>
            </div>
        )
    }
}

export default AutoComplete;