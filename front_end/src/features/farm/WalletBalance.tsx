import React from 'react'
import { Token } from '../Main'
import { useEthers, useTokenBalance } from '@usedapp/core'
import { formatUnits } from '@ethersproject/units'
import { BalanceMsg } from '../../components'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing(2),
    width: '100%',
  },
}))

export interface WalletBalanceProps {
  token: Token
}

export const WalletBalance = ({ token }: WalletBalanceProps) => {
  const classes = useStyles()
  const { image, address, name } = token

  const { account } = useEthers()
  const tokenBalance = useTokenBalance(address, account)

  const formattedTokenBalance: number = tokenBalance
    ? parseFloat(formatUnits(tokenBalance, 18))
    : 0

  return (
    <div className={classes.container}>
      <BalanceMsg
        label={`Your un-staked ${name} balance`}
        amount={formattedTokenBalance}
        tokenImgSrc={image}
      />
    </div>
  )
}
