import { useQuery } from '@tanstack/react-query';

const UseLastSixUserIds = () => {
  const { data, isLoading, isError, refetch } = useQuery(["lastSixUserIds"], async () => {
    const res = await fetch(`https://sohozserver.onrender.com/lastSixUserIds`);
    const rawData = await res.json();
    return rawData;
  });

  const userIds = data
    ? data
        .map(user => parseInt(user.userId, 10))
        .sort((a, b) => a - b)
        .join(', ')
    : '';

  return { userIds, isLoading, isError, refetch };
};

export default UseLastSixUserIds;
