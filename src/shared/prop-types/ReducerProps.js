import PropTypes from 'prop-types'

const { string, shape, number, bool } = PropTypes

export const SidebarProps = shape({
  show: bool,
  collapse: bool,
})

export const ThemeProps = shape({
  className: string,
})

export const RTLProps = shape({
  direction: string,
})

export const RootProps = shape({
  networkId: number,
  isNetworkConnected: bool,
  networkErrors: PropTypes.array,

  connectionState: PropTypes.object,

  errors: PropTypes.object,
})

export const WalletProps = shape({
  networkId: number,
  isAllReady: bool,
  connectedType: string,
  connectedAddress: string,
  connectedName: string,
  connectedBalance: PropTypes.object,
})

export const GemProps = shape({
  data: PropTypes.array,
  isFetching: bool,
  error: PropTypes.object,
})

export const TransactionProps = shape({
  data: PropTypes.array,
  isFetching: bool,
  error: PropTypes.object,
})

export const CasinoProps = shape({
  data: PropTypes.array,
  isFetching: bool,
  error: PropTypes.object,
})
