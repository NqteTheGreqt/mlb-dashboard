const axios = require('axios')
const constants = require('../constants/constants')

function getHitterStats(req, res) {
    console.log(req.query.season)
    console.log(req.query.player_id)
    const options = {
        method: 'GET',
        url: `${constants.host}/json/named.sport_hitting_tm.bam?league_list_id='mlb'&game_type='R'&season='${req.query.season}'&player_id='${req.query.player_id}'`
    };

    axios.request(options).then((response) => {
        console.log(response.data)
        res.json(
            {"avg": response.data.sport_hitting_tm.queryResults.row.avg,
            "obp": response.data.sport_hitting_tm.queryResults.row.obp,
            "slg": response.data.sport_hitting_tm.queryResults.row.slg,
            "ops": response.data.sport_hitting_tm.queryResults.row.ops,
            "hr": response.data.sport_hitting_tm.queryResults.row.hr,
            "rbi": response.data.sport_hitting_tm.queryResults.row.rbi}
        )
    }).catch((error) => {
        console.error(error)
    })
}

module.exports = { getHitterStats }