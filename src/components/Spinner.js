import {withStyle} from 'baseui';
import {StyledSpinnerNext} from 'baseui/spinner';

const Spinner = withStyle(StyledSpinnerNext, {
  width: '64px',
  height: '64px',
  borderLeftWidth: '8px',
  borderRightWidth: '8px',
  borderTopWidth: '8px',
  borderBottomWidth: '8px',
  borderTopColor: '#4F4457',
});

export default Spinner;