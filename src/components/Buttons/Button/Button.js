import PropTypes from 'prop-types';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    button: {
        marginTop: theme.spacing(3),
        padding: theme.spacing(1, 5),
        fontSize: '1.8rem',
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.light,
        boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
        borderRadius: '0px 25px 25px 25px',
        transition: 'background-color 0.3s, box-shadow 0.3s, transform 0.3s',
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
            boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.3)',
            transform: 'translateY(-2px)',
        },
        '&[disabled]': {
            backgroundColor: '#CCCCCC',
            color: '#666666',
            cursor: 'not-allowed',
            boxShadow: 'none',
        },
        '&.active': {
            backgroundColor: '#FF4081',
            boxShadow: '0px 4px 10px rgba(255, 64, 129, 0.5)',
        },
    },
}));

const Button = ({
                    children = 'Default button',
                    onClick = () => {},
                    className = '',
                    disabled = false,
                    active = false,
                    ...attrs
                }) => {
    const classes = useStyles();

    const handleClick = (e) => {
        if (disabled) {
            e.preventDefault();
        } else {
            onClick(e);
        }
    };

    const buttonClassNames = classNames(classes.button, className, { active });

    const Tag = attrs.href ? 'a' : 'button';

    return (
        <Tag
            className={buttonClassNames}
            onClick={handleClick}
            {...(Tag === 'button' && { disabled })}
            {...attrs}
        >
            {children}
        </Tag>
    );
};

Button.propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    active: PropTypes.bool,
};

export { Button };
