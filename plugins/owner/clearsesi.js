import { tmpdir } from 'os' 
import { join } from 'path'
import path from 'path'
import fs from 'fs';
import { 
  readdirSync,
  statSync,
  unlinkSync,
  existsSync,
  readFileSync,
  watch 
} from 'fs'

let handler = async (m, { args, text }) => {

  deleteFiles(`./sessions`)
  m.reply('Berhasil menghapus sessions!')
  
  function deleteFiles(filenya) {
    fs.readdir(filenya, (err, files) => {
      if (err) throw err;
      for (const file of files) {
        if (file !== 'creds.json') {
          fs.unlink(path.join(filenya, file), err => {
            if (err) throw err;
          });
        }
      }
    });
  }
}
handler.menuowner = ['clearsesi']
handler.tagowner = ['owner']
handler.command = /^(clearsesi)$/i

handler.owner = true

export default handler