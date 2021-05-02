const Title = props => {
    const { mt, mb, children } = props;

    return (
        <p className='panel_single-title' style={{ marginTop: `${mt ? mt : '20px'}`, marginBottom: `${mb ? mb : '5px'}` }}>{children}</p>
    );
};
export default Title;