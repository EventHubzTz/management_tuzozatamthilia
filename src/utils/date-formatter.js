export const formatDate = (dateString) => {
    const options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
    };

    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('en-US', options);

    return formattedDate;
};

export const convertDateFormat = (dateString) => {
    const [day, month, year] = dateString.split('/');
    const convertedDate = `${month}/${day}/${year}`;
    return convertedDate;
};

export const formatDateForExcel = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('en-GB');

    return formattedDate;
};