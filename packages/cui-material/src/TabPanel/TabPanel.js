import PropTypes from 'prop-types'
import Typography from '../Typography'

const TabPanel = ({
  index,
  value,
  children,
  ...other
}) => (
  <Typography
    component='div'
    hidden={value !== index}
    role='tabpanel'
    {...other}>
    {value === index && children}
  </Typography>
)

TabPanel.propTypes = {
  children: PropTypes.node,
  index   : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired
}

export default TabPanel
