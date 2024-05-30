import { InsertTables } from "@/constants/types";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useInsertOrderItems = () => {
    const queryClient = useQueryClient();
    const { session } = useAuth();
    const id = session?.user.id;
    return useMutation({
        async mutationFn (items: InsertTables<'order_items'>[])  {
        const {  error, data: newOrder } = await supabase.from('order_items').insert(items).select();
        if (error) {
            throw new Error(error.message);
        }
        return newOrder;
        }, 
        async onSuccess(){
        await queryClient.invalidateQueries({queryKey: ['orders']});
        }
    });
    }