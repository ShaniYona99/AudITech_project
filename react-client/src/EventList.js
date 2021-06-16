import axios from 'axios';
import React, {Component} from 'react'
import './App.css';


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
            var stringV = JSON.stringify(response);
            console.log(JSON.parse(stringV).data.results)
            this.setState({ eventList: JSON.parse(stringV).data.results });
         
            console.log(this.state.eventList)
        })
        .catch(error => {
            console.log("error: "+ error);
        })
    }

    render(){
        return(
            <div>
               <h1>Pull Request Table</h1>
            <table className='table'>
                <thead>
                <tr>
                    <th>Request Id</th>
                    <th>Request Title</th>
                    <th>User</th>
                    <th>Request Head</th>
                    <th>Request Base</th>
                </tr>
                </thead>
                <tbody>
                    {
                        this.state.eventList.map((item) => (
                            <tr key={item.event_id}>
                                <td>{item.event_id}</td>
                                <td>{item.event_title}</td>
                                <td>{item.user}</td>
                                <td>{item.head_branch}</td>
                                <td>{item.base_branch}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            </div>
        )
    }
}
export default EventList;