import React, { Component} from "react";

import API from "../../utils/API";
import "../../styles/FutureGamesTable.css";
//import { useHistory } from 'react-router-dom'

class FutureGamesTables extends Component {

  state = {
    results: [],
  };


  componentDidMount() {
    this.getsocceroddsapi();
  }

  handleBet(){
    
  }


  // getgamesbyleague = (props) => {
  //   API.getnext15gamesbyleague(props)
  //     .then(res => this.setState({ results: res }))
  //     .then(res => { console.log(res) })
  //     .catch(err => console.log(err));
  // };

  getsocceroddsapi = () => {
    API.getoddsapi()
      .then(res => this.setState({ results: res.data.data }))
      .then(res => { console.log(res) })
      .catch(err => console.log(err));
  };



  render() {
    const { results } = this.state
    console.log(results)

    const {state, setState, history} =this.props

    console.log(this.props.state)
    const eventTime = results.map(data => {
      return { ...data, commence_time: new Date(data.commence_time * 1000).toString() }
    })

    console.log(eventTime)

    console.log(this.props)

    return (

      <>
        <div class="container is-fluid">
          <div class="notification">
            <h1>Upcoming Games</h1>
            <br></br>
            <table class="table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Home Team</th>
                  <th>Away Team</th>
                  <th>Home Team Spread Line</th>
                  <th>Home Team Odds</th>
                  <th>Bet on this game</th>
                </tr>
              </thead>

              <tbody>
                {eventTime.map(data => {
                  return (<tr>
                    <td >{data.commence_time}</td>
                    <td>{data.home_team}</td>
                    <td>{data.teams[1]}</td>
                    <td>{data.sites[0].odds.spreads.points[0]}</td>
                    <td>{data.sites[0].odds.spreads.odds[0]}</td>

                    <td> <button onClick={ () => { 
                      setState({...state, bet: data})
                      //move to seperate page
                      history.push('/placebet')
                    }
                      }>Place a Bet</button></td>
                  </tr>
                  )
                })}




              </tbody>
            </table>
          </div>
        </div>

      </>

    );
  }
}
export default FutureGamesTables;
