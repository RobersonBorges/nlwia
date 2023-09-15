import ytdl from 'ytdl-core'
import fs from 'fs'
import { error } from 'console'

export const download = (videoId) => {
  const videoURL = "https://www.youtube.com/shorts/" + videoId
  console.log('fazendo download do video: ' + videoId)

  ytdl(videoURL, { quality: "lowestaudio", filter: "audioonly" })
  .on("info", (info)=>{
    const segundos = info.formats[0].approxDurationsMs / 1000
    if (segundos > 60){
      throw new Error('duração do video é maior que 60 segundos')
    }
  }).on("end", () => {
    console.log(`download completo`)
  })
  .on("error", (error) => {
    console.log('nao foi possível fazer o download do vídeos. Detalhes do erro: ', error)
  }).pipe(fs.createWriteStream("./tmp/audio.mp4"))


}