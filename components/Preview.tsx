import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import { Select } from '@chakra-ui/select';
import React, { useEffect, useRef, useState } from 'react'
import Draggable from 'react-draggable'
import resizeVideo from '../utils/ResizeVideo'
import getClipLink from '../utils/getClipLink'
import downloadURI from '../utils/downloadURI'
interface PreviewProps {
    clip: any
}

  


const Preview: React.FC<PreviewProps> = ({clip}) => {
    const video = useRef<HTMLVideoElement>(null)
    const [uri, setUri] = useState<string>()
    const [choice, setChoice] = useState<string>()
    const [short, toggleShort] = useState<boolean>(false)
    const [x, setX] = useState<number>(0)
    const [y, setY] = useState<number>(0)
    const [title, setTitle] = useState<string>()
    const InputRef = useRef(null)
    const handleDrag = (e, ui) => {
        setX(x + ui.deltaX)
        setY(y + ui.deltaY)
    }
    useEffect(() => {
        const main = async () => {
            toggleShort(false)
            setChoice(null)
            InputRef.current.value = clip.title
            setUri(await getClipLink(clip.slug))
            setTitle(clip.title)
        }
        main()
    }, [clip])  
        return (
            <div style={{
                position: 'sticky'
            }} className="preview">

                <div style={{
                    marginBottom: '15px'
                }}>


                    <Button backgroundColor="#332929" onClick={() => {
                        toggleShort(!short)
                        setChoice(null)
                        if (!short){
                            video.current.pause()
                        }
                        else{
                            video.current.play()
                        }
                    }}>Toggle crop mode</Button>
                    {short && 
                    <>
                    <Button marginLeft="15px" onClick={async () => {
                        const link = await getClipLink(clip.slug) 
                        const src = await resizeVideo(link, 9/16 * video?.current?.offsetHeight, video?.current?.offsetHeight, x)
                        toggleShort(false)
                        setUri(src)
                    }}  backgroundColor="#332929" >Save and download cropped</Button>
                    </>
                    }
                </div>
                <div style={{
                    position: 'absolute'
                }}>
                    <div>
                        
                        {short && 


<Draggable onDrag={handleDrag} axis="x" bounds="parent">
  <div style={{
      zIndex: 111,
      display: 'inline-block',
      position: 'absolute',
      background: 'rgba(255,255,255,0.5)',
      width: 9/16 * video?.current?.offsetHeight,
      height: video?.current?.offsetHeight
  }}></div>
</Draggable>

                        }


                <video style={{
                    zIndex: short ? -1 : 1
                }} ref={video} src={uri} controls={short ? false : true}/>

                    </div>
                                <div>
                    <div className="row">
                        <div className="col-6">
                <Input ref={InputRef}  placeholder="Upload title" defaultValue={title}></Input>
                        </div>
                        <div className="row">
                            <div className="col-6 mt-3">

                            <Button backgroundColor="#332929" onClick={async () => {
                                        const link = await getClipLink(clip.slug) 
                                        downloadURI(link, clip.title)
                                    }
                                }>Download</Button>

                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        );
}
export default Preview