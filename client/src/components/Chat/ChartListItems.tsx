import React from 'react'
import ChartListItem from './ChartListItem'
import { Conversation } from '../../utils/type'
import NotDataAvaliable from '../../shared/NotDataAvaliable'

const ChartListItems = ({conversations}:{conversations:Conversation}) => {
  if(conversations && Array.isArray(conversations) && conversations?.length > 0) {
    return conversations?.map((conversation) => (<ChartListItem key={conversation?.id} conversation={conversation} />))
  } 
  return <NotDataAvaliable message='No chats found' />
}

export default ChartListItems