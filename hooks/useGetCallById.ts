
import { useEffect, useState } from 'react';
import { Call } from '@stream-io/video-react-sdk';
import useGetClient from './useGetClient';

export const useGetCallById = (id: string | string[]) => {
  const [call, setCall] = useState<Call>();
  const [isCallLoading, setIsCallLoading] = useState(true);

  const {videoClient} =  useGetClient();

  useEffect(() => {
    const callId = JSON.stringify(id);
    console.log(callId);
    if (!videoClient) {
      console.warn('Stream Video client not initialized yet');
      return;
    }
    
    const loadCall = async () => {
      try {

        const response = await videoClient.queryCalls();
        const { calls } = response;
         // Filter calls manually by id
        const filteredCalls = calls.filter(call => call.id === callId);

    // Check if any call was found
    if (filteredCalls.length === 0) {
        console.log('No call found with the specified ID.');
    } else {
        console.log('Filtered Calls:', filteredCalls);
    }
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
  }, [videoClient, id]);

  return { call, isCallLoading };
};