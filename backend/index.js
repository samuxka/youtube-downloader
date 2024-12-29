const express = require('express')
const cors = require('cors')
const ytdl = require('ytdl-core')

const app = express()
app.use(cors())
app.use(express.json())

app.post('/video-details', async(req, res) => {
    const { url } = req.body;
    console.log('URL recebida: ', url)
    if (!ytdl.validateURL(url)){
        return res.status(400).send({ error: 'URL inválida!' })
    }
    const info = await ytdl.getInfo(url)
    res.send({
        title: info.videoDetails.title,
        description: info.videoDetails.description,
        formats: ['mp4', 'mp3'],
    })
})

app.post('/download', async (req, res) => {
    const { url, format } = req.body
    if(!ytdl.validateURL(url)) {
        return res.status(400).send({ error: 'URL inválida' });
    }
    const videoStream = ytdl(url, { filter: format === 'mp3' ? 'audioonly': 'video' })
    res.setHeader('Content-Dispoition', `attachment; filename="video.${format}"`)
    videoStream.pipe(res)
})

app.listen(5000, () => console.log('backend rodando na porta 5000'))