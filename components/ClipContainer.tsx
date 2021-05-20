import { Button } from '@chakra-ui/button';
import React, { useEffect, useState } from 'react'
import Clip from '../components/Clip';
import Filters from '../components/Filters';
import useStore from '../store/useStore';
import {useInfiniteQuery} from 'react-query'
import qs from 'query-string'
import axios from 'axios';

interface Response {
  clips: any[],
  _cursor: string
}

const ClipContainer: React.FC = ({}) => {

    const filters = useStore(store => store.filters)
    const {
      data,
      fetchNextPage,
      status,
    } = useInfiniteQuery('clips', async ({pageParam}) => {
      console.log(pageParam)
      const q = qs.stringify({...filters, pageParam})
      console.log('trying to fetch...')
      const data = await axios({
          method: 'GET',
          url: `https://api.twitch.tv/kraken/clips/top?${q}`,
          headers: {
              "Client-ID": process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID,
              "Accept": 'application/vnd.twitchtv.v5+json'
          }
      }).then(res => res.data).catch(err => err.message)

      return data as Response
  
    }, {
      getNextPageParam: (lastPage, pages) => {
        console.log(lastPage)
        return lastPage._cursor
      },
    })
    const selectClip = useStore(store => store.selectClip)
    const [storage, setStorage] = useState<Array<String>>([])
    useEffect(() => {
      if (typeof window !== 'undefined'){
          setStorage(JSON.parse(localStorage.getItem('viewed')))
      }
  }, [])
  
  
  
  useEffect(() => {
      if (typeof window !== 'undefined'){ 
          if (storage !== JSON.parse(localStorage.getItem('viewed')) && storage?.length > 0){
              localStorage.setItem('viewed', JSON.stringify(storage))
          }
      }
    }, [storage])
  
  

        return (
            <div className="content__container">
            <Filters/>
            <div className="clips__container row ">
                
            {(data?.pages) ?
            data?.pages.map((page) => (
              page?.clips?.map((clip: any) => (
                <Clip
                key={clip.slug}
                viewed={storage?.includes(clip.slug)}
                click={() => {
                      
                      storage ? setStorage([...storage, clip.slug]) : setStorage([clip.slug])
                      selectClip(clip)
                  }}
                 clip={clip as any} />
              ))
            ))
            :
            <div style={{textAlign: 'center'}}></div>
            }
            </div>
            {(status != 'loading')  && 
            <div className="load__more">
            <Button onClick={() => {
              fetchNextPage()
            }}  colorScheme="blackAlpha" size="md">
             Load More
           </Button>
            </div>
            }
          </div>
        );
}
export default ClipContainer