import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { Dropdown, ColorPicker, Button } from '@wordpress/components';

const BColor = props => {
    const { value, defaultColor, onChange, disableAlpha } = props;
    const [state, setState] = useState(value);

    return (
        <Dropdown position='top center'
            renderToggle={({ isOpen, onToggle }) => {
                return (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div className='bColorButtonContainer'>
                            <Button
                                className='bColorButton'
                                isPrimary
                                onClick={onToggle}
                                aria-expanded={isOpen}
                                style={{ backgroundColor: value ? value : 'transparent' }}
                            />
                        </div>
                        {defaultColor && defaultColor != state && (
                            <Button icon='image-rotate' label={__('Reset', 'advanced-post-block')}
                                onClick={() => {
                                    onChange(defaultColor);
                                    setState(defaultColor);
                                }}
                            />
                        )}
                    </div>
                );
            }}
            renderContent={() => (
                <ColorPicker color={value || ''}
                    onChangeComplete={(c) => {
                        onChange(`rgba(${c.rgb.r}, ${c.rgb.g}, ${c.rgb.b}, ${c.rgb.a})`);
                        setState(c.hex);
                    }}
                    disableAlpha={disableAlpha ? disableAlpha : false}
                />
            )}
        />
    );
};
export default BColor;