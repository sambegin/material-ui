import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

export const styles = theme => ({
  /* Styles applied to the root (`Tooltip`) component. */
  root: {
    position: 'relative',
  },
  /* Styles applied to the `Button` component. */
  button: {
    margin: 8,
    color: theme.palette.text.secondary,
    backgroundColor: emphasize(theme.palette.background.default, 0.12),
    '&:hover': {
      backgroundColor: emphasize(theme.palette.background.default, 0.15),
    },
    transition: `${theme.transitions.create('transform', {
      duration: theme.transitions.duration.shorter,
    })}, opacity 0.8s`,
    opacity: 1,
  },
  /* Styles applied to the `Button` component if `open={false}`. */
  buttonClosed: {
    opacity: 0,
    transform: 'scale(0)',
  },
  buttonNoScale: {
    transition: `${theme.transitions.create('transform', {
      duration: theme.transitions.duration.shorter,
    })}, opacity 0.2s`,
  },
  buttonClosedNoScale: {
    opacity: 0,
    transform: 'scale(1)',
  },
});

class SpeedDialAction extends React.Component {
  state = {
    tooltipOpen: false,
  };

  handleTooltipClose = () => {
    this.setState({ tooltipOpen: false });
  };

  handleTooltipOpen = () => {
    this.setState({ tooltipOpen: true });
  };

  render() {
    const {
      ButtonProps,
      classes,
      className: classNameProp,
      delay,
      icon,
      id,
      onClick,
      onKeyDown,
      open,
      tooltipClasses,
      tooltipTitle,
      tooltipAlwaysOpen,
      tooltipPlacement,
      ...other
    } = this.props;

    const tooltipOpen = open && (tooltipAlwaysOpen || this.state.tooltipOpen);
    // Tried multiple solution to fix tooltip position with a scaled button but without success
    // Tried delay enter tooltip, popperProps offset :
    /*
    * PopperProps={{
          modifiers:{
            offset:{
              offset:'0, 20'
            },
          }
        }}

       Which works but tooltips update its position when button is closing... so we have a little
       visual bug there also
    * */

    return (
      <Tooltip
        id={id}
        classes={tooltipClasses}
        title={tooltipTitle}
        placement={tooltipPlacement}
        onClose={this.handleTooltipClose}
        onOpen={this.handleTooltipOpen}
        open={tooltipOpen}
        {...other}
      >
        <Button
          variant="fab"
          mini
          className={classNames(
            classes.button,
            !open && (tooltipAlwaysOpen ? classes.buttonClosedNoScale : classes.buttonClosed),
            tooltipAlwaysOpen && classes.buttonNoScale,
          )}
          style={{ transitionDelay: `${delay}ms` }}
          onClick={onClick}
          tabIndex={-1}
          role="menuitem"
          aria-labelledby={id}
          {...ButtonProps}
        >
          {icon}
        </Button>
      </Tooltip>
    );
  }
}

SpeedDialAction.propTypes = {
  /**
   * Properties applied to the [`Button`](/api/button) component.
   */
  ButtonProps: PropTypes.object,
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * Adds a transition delay, to allow a series of SpeedDialActions to be animated.
   */
  delay: PropTypes.number,
  /**
   * The Icon to display in the SpeedDial Floating Action Button.
   */
  icon: PropTypes.node.isRequired,
  /**
   * @ignore
   */
  id: PropTypes.string,
  /**
   * @ignore
   */
  onClick: PropTypes.func,
  /**
   * @ignore
   */
  onKeyDown: PropTypes.func,
  /**
   * @ignore
   */
  open: PropTypes.bool,
  /**
   * Makes tooltip always open when SpeedDialAction is displayed
   */
  tooltipAlwaysOpen: PropTypes.bool,
  /**
   * Use to override tooltip styles
   */
  tooltipClasses: PropTypes.object,
  /**
   * Placement of the tooltip.
   */
  tooltipPlacement: PropTypes.string,
  /**
   * Label to display in the tooltip.
   */
  tooltipTitle: PropTypes.node,
};

SpeedDialAction.defaultProps = {
  delay: 0,
  open: false,
  tooltipPlacement: 'left',
  tooltipAlwaysOpen: false,
  tooltipClasses: {},
};

export default withStyles(styles, { name: 'MuiSpeedDialAction' })(SpeedDialAction);
