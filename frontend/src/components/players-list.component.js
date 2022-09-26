import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Player = props => {
	return (
	<tr>
		<td>{props.name}</td>
		<td>{props.avg}</td>
		<td>{props.obp}</td>
		<td>{props.slg}</td>
		<td>{props.ops}</td>
		<td>{props.hr}</td>
		<td>{props.rbi}</td>
		<td>
			<a href="#" onClick={() => {}}></a>
		</td>
	</tr>);
}


export default class PlayersList extends Component {
	constructor(props) {
		super(props);

		this.deletePlayer = this.deletePlayer.bind(this);

		this.state = {players: [], playersData: []};
	}

	componentDidMount() {
		axios.get(`http://localhost:5000/users/get-hitters?email=${localStorage.user}`)
			.then(response => {
				this.setState({ players: response.data });
				response.data.forEach(player => {
					const options = {
						method: 'GET',
						url: `http://lookup-service-prod.mlb.com/json/named.sport_hitting_tm.bam?league_list_id='mlb'&game_type='R'&season='${new Date().getFullYear()}'&player_id='${player}'`
					};
					axios.request(options).then((req, res) => {
						res = { "player_id": req.data.sport_hitting_tm.queryResults.row.player_id,
							"avg": req.data.sport_hitting_tm.queryResults.row.avg,
							"obp": req.data.sport_hitting_tm.queryResults.row.obp,
							"slg": req.data.sport_hitting_tm.queryResults.row.slg,
							"ops": req.data.sport_hitting_tm.queryResults.row.ops,
							"hr": req.data.sport_hitting_tm.queryResults.row.hr,
							"rbi": req.data.sport_hitting_tm.queryResults.row.rbi }
						const options2 = {
							method: 'GET',
							url: `http://lookup-service-prod.mlb.com/json/named.player_info.bam?sport_code='mlb'&player_id='${player}'`
						};
						axios.request(options2).then((req) => {
							res["name"] = req.data.player_info.queryResults.row.name_display_first_last;
							this.setState(prevState => ({
								playersData: [...prevState.playersData, res]
							}))
						})
					}).catch((error) => {
						console.error(error)
					})
				});
			});
	}

	deletePlayer(id) {
		axios.delete(`http://localhost:5000/delete-hitter/${id}`)
			.then(response => { console.log(response.data) })
		this.setState({
			players: this.state.players.filter(player => player.player_id !== id)
		})
	}

	playerList() {
		return this.state.playersData.map(player => 
			<Player avg={player.avg} obp={player.obp} slg={player.slg} ops={player.ops} hr={player.hr} rbi={player.rbi} deletePlayer={this.deletePlayer} name={player.name}
			key={player.player_id}/>
		)
	}

  render() {
		return (
			<div>
				<table className="table">
					<thead className="tdead-light">
						<tr>
							<th>Name</th>
							<th>AVG</th>
							<th>OBP</th>
							<th>SLG</th>
							<th>OPS</th>
							<th>HR</th>
							<th>RBI</th>
						</tr>
					</thead>
					<tbody>
						{ this.playerList() }
					</tbody>
				</table>
			</div>
		)
  }
}