const AbDateFormat = (dateString) => {
    // Check if dateString is a valid date string
    if (!dateString || isNaN(Date.parse(dateString))) {
        // Return a default value or throw an error
        return 'Invalid Date';
    }
    
    // Parse the date string
    const date = new Date(dateString);
    
    // Format the date
    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
    }).format(date);
};

export default AbDateFormat;
