const { __ } = wp.i18n;

const func = {
    truncate: (str, no_words) => str && str.split(" ").splice(0, no_words).join(" "),
    renderHTML: raw => <span dangerouslySetInnerHTML={{ __html: raw }} />
}
export default func;