const axios = require('axios')
const constants = require('../constants/constants')

function getHitterStats(player_id, season) {
	const options = {
		method: 'GET',
		url: `${constants.host}/json/named.sport_hitting_tm.bam?league_list_id='mlb'&game_type='R'&season='${season}'&player_id='${player_id}'`
	};
	let res = {}
	axios.request(options).then((response) => {
		res = { "player_id": response.data.sport_hitting_tm.queryResults.row.player_id,
			"avg": response.data.sport_hitting_tm.queryResults.row.avg,
			"obp": response.data.sport_hitting_tm.queryResults.row.obp,
			"slg": response.data.sport_hitting_tm.queryResults.row.slg,
			"ops": response.data.sport_hitting_tm.queryResults.row.ops,
			"hr": response.data.sport_hitting_tm.queryResults.row.hr,
			"rbi": response.data.sport_hitting_tm.queryResults.row.rbi }
	}).catch((error) => {
		console.error(error)
	})
	return res;
}

module.exports = { getHitterStats }