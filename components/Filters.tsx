import React, { useState } from 'react'
import { Button, Input, Select } from "@chakra-ui/react"
import useStore from '../store/useStore';



const Filters: React.FC = ({}) => {      
      const setFilters = useStore(store => store.setFilters)
      const filters = useStore(store => store.filters)
      const [channel, setChannel] = useState<string>()
      const GameFilter = useStore(store => store.GameFilter)
      const [game, setGame] = useState<string>()
        return (
        <div className="filters__container">
          <Input onChange={e => setChannel(e.target.value)} marginRight="10px" maxWidth="25%" placeholder="Streamer name" />
          <Button onClick={() => {
            if (channel?.length > 2) {
              setFilters({
                ...filters,
                channel
              })
            }
          }} backgroundColor="#332929"> Go! </Button>

<Input onChange={e => setGame(e.target.value)} marginRight="10px" maxWidth="25%" placeholder="Game name" />
          <Button onClick={() => {
            if (game?.length > 2) {
              setFilters({
                ...filters,
                game
              })
            }
          }} backgroundColor="#332929"> Go! </Button>

<Select onChange={(e) => setFilters({...filters, period: e.target.value})}>
  <option style={{color: 'black'}} value="day">Day</option>
  <option style={{color: 'black'}} value="week">Week</option>
  <option style={{color: 'black'}} value="month">Month</option>
  <option style={{color: 'black'}} value="all">All Time</option>
</Select>

          <Input onChange={e => GameFilter(e.target.value)} placeholder="Filter out game (exact match)"/>

          <Select onChange={e => setFilters({...filters, language: e.target.value})}>
            <option style={{
              color: 'black'
            }} value="en">English</option>
            <option style={{
              color: 'black'
            }}  value="ru">Russian</option>
          </Select>
        </div>
        );
}
export default Filters