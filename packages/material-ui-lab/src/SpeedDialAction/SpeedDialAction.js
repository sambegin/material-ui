import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Tooltip from 'material-ui/Tooltip';

const styles = theme => ({
  root: {
    position: 'relative',
  },
  button: {
    margin: theme.spacing.unit,
    color: theme.palette.text.secondary,
    transition: `${theme.transitions.create('transform', {
      duration: theme.transitions.duration.shorter,
    })}, opacity 0.8s`,
    opacity: 1,
  },
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
      open,
      tooltipClasses,
      tooltipTitle,
      tooltipAlwaysOpen,
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
        className={classNames(classes.root, classNameProp)}
        classes={tooltipClasses}
        title={tooltipTitle}
        placement="left"
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
   * Properties applied to the `Button` component.
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
   * Label to display in the tooltip.
   */
  tooltipTitle: PropTypes.node,
};

SpeedDialAction.defaultProps = {
  delay: 0,
  open: false,
  tooltipAlwaysOpen: false,
  tooltipClasses: {},
};

export default withStyles(styles)(SpeedDialAction);
