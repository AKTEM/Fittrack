import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';

interface HealthRecord {
  id: string;
  date: string;
  steps: number;
  blood_pressure: string;
  heart_rate: number;
  blood_oxygen: number;
  temperature: number;
  respiratory_rate: number;
  bmi: number;
  blood_sugar: number;
  hydration: number;
}

export function useHealthRecords() {
  const { supabase, user } = useAuth();
  const [records, setRecords] = useState<HealthRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchRecords();
    }
  }, [user]);

  const fetchRecords = async () => {
    try {
      const { data, error } = await supabase
        .from('health_records')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });

      if (error) throw error;
      setRecords(data || []);
    } catch (error) {
      console.error('Error fetching health records:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveRecord = async (record: Partial<HealthRecord>) => {
    try {
      const { data, error } = await supabase
        .from('health_records')
        .upsert({
          user_id: user.id,
          ...record,
        })
        .select()
        .single();

      if (error) throw error;
      
      setRecords(prev => {
        const index = prev.findIndex(r => r.date === record.date);
        if (index >= 0) {
          return [...prev.slice(0, index), data, ...prev.slice(index + 1)];
        }
        return [data, ...prev];
      });

      return data;
    } catch (error) {
      console.error('Error saving health record:', error);
      throw error;
    }
  };

  return {
    records,
    loading,
    saveRecord,
    fetchRecords,
  };
}