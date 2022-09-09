const axios = require('axios')
const constants = require('../constants/constants')

function getPitcherStats(req, res) {
    console.log(req.query.season)
    console.log(req.query.player_id)
    const options = {
        method: 'GET',
        url: `${constants.host}/json/named.sport_pitching_tm.bam?league_list_id='mlb'&game_type='R'&season='${req.query.season}'&player_id='${req.query.player_id}'`
    };

    axios.request(options).then((response) => {
        console.log(response.data)
        res.json(
            {"w": response.data.sport_pitching_tm.queryResults.row.w,
            "l": response.data.sport_pitching_tm.queryResults.row.l,
            "era": response.data.sport_pitching_tm.queryResults.row.era,
            "whip": response.data.sport_pitching_tm.queryResults.row.whip}
        )
    }).catch((error) => {
        console.error(error)
    })
}

module.exports = { getPitcherStats }