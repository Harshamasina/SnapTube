import { Typography } from "@mui/material";

const PublishedAt = ({ publishedAt }) => {
    const currentTimeStamp = new Date();
    const publishedTimeStamp = new Date(publishedAt);
    const timeDiff = currentTimeStamp - publishedTimeStamp;
    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    let timeAgo = '';
    if (years > 0) {
        timeAgo = `${years} year${years > 1 ? 's' : ''} ago`;
    } else if (months > 0) {
        timeAgo = `${months} month${months > 1 ? 's' : ''} ago`;
    } else if (weeks > 0) {
        timeAgo = `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    } else if (days > 0) {
        timeAgo = `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
        timeAgo = `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
        timeAgo = `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    }

    return (
        <Typography variant="subtitle2" color="gray">
            {timeAgo}
        </Typography>
    );
};

export default PublishedAt;