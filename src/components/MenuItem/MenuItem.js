import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from "@material-ui/core/styles";
import classNames from 'classnames';
import { ThemeContext } from '../../themes/theme-context';
import './MenuItem.module.css';

const useStyles = makeStyles((theme) => ({
    menuItem: {
        cursor: 'pointer',
        padding: '10px 15px',
        borderRadius: '5px',
        display: 'inline-block',
        margin: '5px',
        transition: 'background-color 0.3s, color 0.3s',
        '&:hover': {
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.primary.contrastText,
        },
        '&.disabled': {
            cursor: 'not-allowed',
            opacity: 0.5,
        },
    },
    icon: {
        fontSize: '1.5rem',
    },
}));

const MenuItem = ({
                      name,
                      className,
                      size,
                      onClick,
                      disabled,
                      ...attrs
                  }) => {
    const theme = useContext(ThemeContext);
    const classes = useStyles(theme);

    const elemSize = size ? { fontSize: `${size}rem` } : null;

    return (
        <i
            {...attrs}
            className={classNames(classes.menuItem, 'fa', `fa-${name}`, { disabled }, className)}
            onClick={disabled ? null : onClick}
            style={elemSize}
        />
    );
};

MenuItem.propTypes = {
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
    size: PropTypes.number,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
};

MenuItem.defaultProps = {
    className: '',
    size: null,
    onClick: null,
    disabled: false,
};

export { MenuItem };
