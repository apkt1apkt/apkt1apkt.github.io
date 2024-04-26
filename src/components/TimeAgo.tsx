import { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';

type TimeAgoProps = {
  date: Date | null | undefined;
};

export const TimeAgo = (props: TimeAgoProps) => {
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    const updateTimeAgo = () => {
      const formattedTime = formatDistanceToNow(new Date(props.date || ''), { addSuffix: true });
      setTimeAgo(formattedTime);
    };

    updateTimeAgo();

    const intervalId = setInterval(updateTimeAgo, 1000);

    return () => clearInterval(intervalId);
  }, [props.date]);

  return <span>{timeAgo}</span>;
};
