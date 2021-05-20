import axios from 'axios'



interface uploadProgress {
    url: string;
    progress: number;
}

const downloadVideo = async (url: string, setProgress: React.Dispatch<React.SetStateAction<uploadProgress[]>>, progress: uploadProgress[]) => {
    console.log(url)
    const clip = await axios({
        method: 'GET',
        url: `${process.env.NEXT_PUBLIC_CORS}/${url}`,
        responseType: "blob",
        onDownloadProgress: (progressEvent) => {
            const percentage = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
                if (progress && progress.findIndex(i => i.url ==  url) != - 1){
                    let c = progress
                    c[c.findIndex(o => o.url == url)].progress = percentage
                    setProgress(c)
                }
                else{
                    let c = progress ? progress : []
                    c.push({
                        url,
                        progress: percentage
                    })
                    setProgress(c)
                }
        }
    }).then(res => new File([res.data], `${url.split('.net/')[1]}`))


    console.log(clip)
    return clip
}
export default downloadVideo