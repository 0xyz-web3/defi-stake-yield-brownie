import React, { useState } from 'react'
import { useEthers } from '@usedapp/core'
import { TabContext, TabList, TabPanel } from '@material-ui/lab'
import { ConnectionRequiredMsg } from '../../components'
import { Tab, Box, makeStyles } from '@material-ui/core'
import { Token } from '../Main'
import { Unstake } from './Unstake'
import { Stake } from './Stake'
import { WalletBalance } from './WalletBalance'

interface TokenFarmContractProps {
  token: Token
}

const useStyles = makeStyles((theme) => ({
  tabContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing(4),
  },
  box: {
    backgroundColor: 'white',
    borderRadius: '25px',
    margin: `${theme.spacing(4)}px 0`,
    padding: theme.spacing(2),
  },
  header: {
    color: 'white',
  },
}))

const action = ['Stake', 'Unstake']

export const TokenFarmContract = ({ token }: TokenFarmContractProps) => {
  const classes = useStyles()
  const [selectedTokenIndex, setSelectedTokenIndex] = useState<number>(0)

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setSelectedTokenIndex(parseInt(newValue))
  }

  const { account } = useEthers()

  const isConnected = account !== undefined

  return (
    <Box>
      <h1 className={classes.header}>{token.name}</h1>
      <Box className={classes.box}>
        <div>
          {isConnected ? (
            <TabContext value={selectedTokenIndex.toString()}>
              <TabList onChange={handleChange} aria-label="stake form tabs">
                {action.map((state, index) => {
                  return (
                    <Tab label={state} value={index.toString()} key={index} />
                  )
                })}
              </TabList>

              <TabPanel value={'1'} key={1}>
                <Unstake token={token} />
              </TabPanel>

              <TabPanel value={'0'} key={0}>
                <WalletBalance token={token} />
                <Stake token={token} />
              </TabPanel>
            </TabContext>
          ) : (
            <ConnectionRequiredMsg />
          )}
        </div>
      </Box>
    </Box>
  )
}
