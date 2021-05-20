import axios from "axios"

const getClipLink = async (slug: string) => {
    const clipLink: string = await axios({
        method: 'POST',
        url: 'https://gql.twitch.tv/gql',
        data: {
            operationName: "VideoAccessToken_Clip",
            variables: {
                slug
            },
            extensions: {
                persistedQuery: {
                    version: 1,
                    sha256Hash: '36b89d2507fce29e5ca551df756d27c1cfe079e2609642b4390aa4c35796eb11'
                }
            }
        },
        headers: {
            "Client-ID": "kimne78kx3ncx6brgo4mv6wki5h1ko"
        }
    }).then(res => res.data.data.clip.videoQualities[0].sourceURL).catch(err => console.log('Error while getting clip link: ', err.message))
    return clipLink
}
export default getClipLink