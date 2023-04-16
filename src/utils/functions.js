export const truncate = (str, no_words) => str && str.split(' ').splice(0, no_words).join(' ');
export const renderHTML = raw => <span dangerouslySetInnerHTML={{ __html: raw }} />;
export const filterSelected = (taxonomy, selected) => taxonomy?.map(tax => tax.id)?.filter(tax => selected.indexOf(tax) !== -1);