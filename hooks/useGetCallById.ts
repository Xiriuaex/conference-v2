
import { useEffect, useState } from 'react';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';

export const useGetCallById = (id: string | string[]) => {
  const [call, setCall] = useState<Call>();
  const [isCallLoading, setIsCallLoading] = useState(true);

  const client =  useStreamVideoClient();

  useEffect(() => {
    console.log(id);
    if (!client) {
      console.warn('Stream Video client not initialized yet');
      return;
    }
    
    const loadCall = async () => {
      try {
        const { calls } = await client.queryCalls({ filter_conditions: { id } });

        console.log(calls);
        console.log('Calls fetched:', calls);
        if (calls.length > 0) {
          setCall(calls[0]);
        } else {
          console.log('No calls found with the provided ID');
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsCallLoading(false);
      }
    };

    loadCall();
  }, [client, id]);

  return { call, isCallLoading };
};