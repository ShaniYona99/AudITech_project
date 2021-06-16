import axios from 'axios';
import React, {Component} from 'react'

class EventList extends Component {
    constructor(props){
        super(props);
        this.state = {
            eventList: []
        }
    }

    componentDidMount(){
        axios.get('http://87.71.188.81:444/getEvents')
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log("error: "+ error);
        })
    }

    render(){
        return(
            <div>
                
            </div>
        )
    }
}
export default EventList;