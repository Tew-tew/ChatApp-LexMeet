import { useEffect } from 'react';
import axios from 'axios';
import echo from '@/Components/EchoComponent/Echo';

function useOnlineStatusChannel(user) {
    useEffect(() => {

            const presenceChannel = echo.join('online-status');

            presenceChannel.here((users) => {
                const loggedInUserId = user.id;
                const isUserOnline = users.some(user => user.id === loggedInUserId);
                console.log(users);
                if (isUserOnline) {
                    // The logged-in user is online, update their status
                    axios.put(`/users/${loggedInUserId}/update-status-online`);
                }
            })
            .joining((user) => {
                axios.put(`/users/${user.id}/update-status-online`);
            })
            .leaving((user) => {
                axios.put(`/users/${user.id}/update-status-offline`);
            });


            return () => {
                presenceChannel.unsubscribe();
            };
    }, [user]);

  // You can return any data or functions that you want to expose to components using this hook

  return null;
}

export default useOnlineStatusChannel;
