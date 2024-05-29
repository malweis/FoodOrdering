import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useOrderList = ({ archived = false }: { archived: boolean }) => {
    const statuses = archived
      ? ['Delivered']
      : ['New', 'Cooking', 'Delivering'];
  
    return useQuery({
      queryKey: ['orders', { archived }],
      queryFn: async () => {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .in('status', statuses)
          .order('created_at', { ascending: false });
        if (error) {
          throw new Error(error.message);
        }
        return data;
      },
    });
  };
export const useMyOrderList = () => {
    const { session } = useAuth();
    const id = session?.user.id;
    
    
    return useQuery({
        queryKey: ['orders', {userId : id}],
        queryFn: async () => {
        if (!id) {
            return null;
        }
        const { data, error } = await supabase.from('orders').select('*').eq('user_id', id);
        if (error) {
            throw new Error(error.message);
        }
        return data;
        }
    });

   
    }