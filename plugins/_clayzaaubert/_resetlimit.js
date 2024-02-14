import moment from "moment-timezone";
import db from '../../lib/database.js'

let handler = (m) => m;
let messageSent = false;

handler.before = async function (m) {
  const timezone = "Asia/Jakarta";

  const cronJob = () => {
    let users = db.data.users;

    let resetUsers = Object.entries(users).filter(
      ([user, data]) => data.limit < 10000000
    );

    if (resetUsers.length > 0 && !messageSent) {
      let limit = 10;

      resetUsers.forEach(([user, data]) => {
        data.limit = limit;
      });

      console.log("Reset Limit");

      /*const q = {
        key: {
          remoteJid: "status@broadcast",
          participant: "0@s.whatsapp.net",
          fromMe: false,
          id: "",
        },
        message: { conversation: "Successfully reset user limit" },
      };

      conn.sendMessage(
        `120363198175533674@g.us`,
        { text: `*[ ${global.name.bot} Notif ]* Limit User Reset.` },
        { quoted: q }
      );*/

      messageSent = true;
    }
  };

  const scheduleNextExecution = () => {
    const now = moment().tz(timezone);
    const nextExecution = moment
      .tz(now, timezone)
      .startOf("day")
      .add(12, "hours");

    if (now.isAfter(nextExecution)) {
      nextExecution.add(1, "day");
    }

    const delay = nextExecution.diff(now);

    setTimeout(() => {
      cronJob();
      scheduleNextExecution();
    }, delay);
  };

  scheduleNextExecution();
};

export default handler;
