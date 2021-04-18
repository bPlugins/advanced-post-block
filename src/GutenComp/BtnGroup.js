const { Button, ButtonGroup, Tooltip } = wp.components;

const BtnGroup = props => {
    const { options, myValue, setState, icon, classes, size } = props;

    return (
        <ButtonGroup className={`b_blocks_button_groups ${classes && classes}`}>
            {Object.values(options).map(obj => (
                <Tooltip text={obj.label} position="top">
                    <Button icon={icon === true ? obj.icon : null} key={obj.value} isSmall={size === "small" ? true : false} isMedium={size === "small" ? false : true} isPrimary={myValue === obj.value} aria-pressed={myValue === obj.value} onClick={() => setState(obj.value, obj.def && obj.def)}>{icon === true ? '' : obj.icon}</Button>
                </Tooltip>
            ))}
        </ButtonGroup>
    );
};

export default BtnGroup;