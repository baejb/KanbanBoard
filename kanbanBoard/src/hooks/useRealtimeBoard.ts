import { supabase } from '../supabaseClient';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchBoards } from '../store/board/boardSlice';

const useRealtimeBoards = () => {
  const dispatch = useDispatch() as any;

  useEffect(() => {
    const channel = supabase.channel('custom-realtime-board');
    channel
      .on('postgres_changes', { event: '*', schema: 'public', table: 'boards' }, (payload) => {
        dispatch(fetchBoards());
      })
      .subscribe((status) => {});

    return () => {
      supabase.removeChannel(channel);
    };
  }, [dispatch]);
};

export default useRealtimeBoards;
