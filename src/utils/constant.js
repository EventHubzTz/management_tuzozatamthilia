export const headers = { 'event-hub-sign-auth': `${process.env.REACT_APP_KEY}`, }
export const contentTypeJson = { 'Content-Type': `application/json`, }
export const contentTypeFormData = { 'Content-Type': `multipart/form-data`, }
export const capitalizeFirstLetter = (str) => {
    return str
        .replace(/_/g, ' ')
        .toLowerCase()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};
export function formatMoney(amount, currency = 'TZS') {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
    }).format(amount);
}