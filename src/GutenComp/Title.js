const { __ } = wp.i18n;

const Title = props => {
    const { mt, mb, children } = props;

    return (
        <p className="panel_single-title" style={{ marginTop: `${mt ? mt : '20px'}`, marginBottom: `${mb ? mb : '5px'}` }}>{__(children, 'advanced-post-block')}</p>
    );
};
export default Title;