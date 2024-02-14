let handler = m => m
import db from '../../lib/database.js'

handler.before = async function (m) {
    let user = db.data.users[m.sender]                              
    if (user.health > 100) {
            user.health = 100
        }
    if (user.health < 0) {
            user.health = 0
        }
    }

export default handler
