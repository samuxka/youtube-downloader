import React, { useState } from 'react'
import { fetchVideoDetails, downloadVideo } from '../Services/api.ts'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Downloader: React.FC = () => {
    const [url, setUrl] = useState('')
    const [videoDetails, setVideoDetails] = useState<any>(null)
    const [loading, setLoading] = useState(false)

    const handleFetchDetails = async () => {
        try {
            setLoading(true);
            const details = await fetchVideoDetails(url)
            setVideoDetails(details)
            toast.success('Detalhes do vídeo obtidos!')
        } catch (error) {
            toast.error('Erro ao buscar os detalhes do vídeo.')
        } finally {
            setLoading(false)
        }
    }

    const handleDownload = async (format: string) => {
        try {
            setLoading(true);
            const file = await downloadVideo(url, format);
            const link = document.createElement('a')
            link.href = URL.createObjectURL(new Blob([file]))
            link.download = `video.${format}`
            link.click()
            toast.success('Download iniciado!')
        } catch (error) {
            toast.error('Erro ao iniciar o download.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="downloader">
            <ToastContainer />
            <h1>Youtube Downloader</h1>
            <input 
                type="text"
                placeholder='Insira a URL do video' 
                value={url}
                onChange={(e) => setUrl(e.target.value)}
            />
            <button 
                onClick={handleFetchDetails}
                disabled={loading}
            >
                {loading ? 'Carregando...' : 'Obter Detalhes'}
            </button>
            {videoDetails && (
                <div className="details">
                    <h2>{videoDetails.title}</h2>
                    <p>{videoDetails.description}</p>
                    <div className="formats">
                        {videoDetails.formats.map((format:string) => (
                            <button 
                                key={format}
                                onClick={() => handleDownload(format)}
                            >
                                Baixar {format}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Downloader