import { useEffect } from 'react';
import axios from 'axios';
import echo from '@/Components/EchoComponent/Echo';

function useOnlineStatusChannel(user) {
    useEffect(() => {
        let presenceChannel = null;

        const connectToChannel = () => {
            const presenceChannel = echo.join('online-status');

            presenceChannel.here((users) => {
                const loggedInUserId = user.id;
                const isUserOnline = users.some(user => user.id === loggedInUserId);
                if (isUserOnline) {
                    // The logged-in user is online, update their status
                    axios.put(`/users/${loggedInUserId}/update-status-online`);
                }
            })
            .joining((user) => {
                console.log(user);
                axios.put(`/users/${user.id}/update-status-online`);
            })
            .leaving((user) => {
                axios.put(`/users/${user.id}/update-status-offline`);
            });

            presenceChannel.listen('.connection.errored', () => {
                // Handle connection errors, you can attempt reconnection here
                setTimeout(connectToChannel, 5000); // Retry connection after 5 seconds
            });
        };

        connectToChannel();

        return () => {
            if (presenceChannel) {
                presenceChannel.leave();
            }
        };
    }, [user]);

  // You can return any data or functions that you want to expose to components using this hook

  return null;
}

export default useOnlineStatusChannel;
