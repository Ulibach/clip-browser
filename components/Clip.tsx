import React from 'react'
import useStore from '../store/useStore';

interface ClipProps {
    clip:any;
    click: React.MouseEventHandler<HTMLDivElement>;
    viewed: boolean;
}

const Clip: React.FC<ClipProps> = ({clip, click, viewed}) => {
    const game = useStore(store => store.game)
    console.log(clip)
    const styles = {
        opacity: viewed ? 0.35 : 1,
        display: game == clip.game ? 'none' : 'block'
    }
        return (
            <div style={styles} onClick={click} className="clip col-3">
            <img style={{position: 'relative'}} src={clip.thumbnails.medium} alt=""/>
            
<div style={{display: 'flex', justifyContent: 'space-between', wordBreak: 'break-word'}}>{clip.title}
</div>
<div>{clip.broadcaster.display_name} playing {clip.game}</div> <div>{clip.created_at.split('T')[0]}</div>

<div>{clip.views} views </div>
</div>
        );
}
export default Clip