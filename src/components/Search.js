import React from 'react';
import './Search.scss';

class Search extends React.Component{
       
//whenever state gets updated using setState(), render() is called
onInputChange(e){
    this.props.inputChange(e);

}

onFormSubmit(e){
    e.preventDefault();// helps us to not refresh the page when enter is pressed
   this.props.formSubmitted();
}

render(){
    const location=this.props.location;
    //const temp='this.state.temp';
    return(
        <div className="search-bar">
            <form className="search-bar_form"onSubmit={(e)=>this.onFormSubmit(e)}>
            
            <input className="search-bar_input"  id="search" name="search" value={location} onChange={(e)=>this.onInputChange(e)}>
                </input>
                <button className= "search-bar_button" type="Submit">
                            Search
                </button>
               
            </form>
        </div>
    )
}
}

export default Search;