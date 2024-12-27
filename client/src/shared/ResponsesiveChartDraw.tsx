import { Grid } from '@mui/material'
import React, { useEffect } from 'react'
import ChartListDraw from '../components/Chat/ChartListDraw'
import ConversationContainer from '../components/Converstation/ConversationContainer'
import { useConversationContext } from '../contexts/ConversationContext';
import { useLocation } from 'react-router-dom';
import NoChatOpen from './NoChatOpen';
const drawerWidth = 320;
const ResponsesiveChartDraw = () => {
  const {state} = useLocation();
  const {conversations, setCurrentConversation, currentConversation} = useConversationContext()
  useEffect(() => {
      if(state && state?.type) {
        setCurrentConversation && setCurrentConversation(state);
      } else {
        setCurrentConversation && setCurrentConversation(null);
      }
  },[state, setCurrentConversation])
  return (
   <Grid container>
        <ChartListDraw conversations={conversations} drawerWidth={drawerWidth} />
        {currentConversation && currentConversation?.id 
        ? (<ConversationContainer drawerWidth={drawerWidth} />) 
        : (
          <NoChatOpen drawerWidth={drawerWidth} />
        )
        }
   </Grid>
  )
}

export default ResponsesiveChartDraw