import React from 'react'
import ClipContainer from '../components/ClipContainer';
import Preview from '../components/Preview';
import useStore from '../store/useStore';
interface indexProps {}

const index: React.FC<indexProps> = ({}) => {
  const clip = useStore(store => store.clip)
  


    return (
      <>
      <div className="container row">
      <div className="col-6">
        <ClipContainer/>
      </div>
      <div className="preview__container col-6">
          {clip && 
          <Preview clip={clip}/>
          }
      </div>
      </div>
      </>
    );
}
export default index