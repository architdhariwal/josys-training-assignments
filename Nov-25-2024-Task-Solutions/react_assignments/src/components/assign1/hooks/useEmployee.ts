import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../../services/api';

export const EMPLOYEES_QUERY_KEY = 'employees';

export const useEmployees = () => {
  const queryClient = useQueryClient();

  const { data: employees = [], isLoading, error } = useQuery({
    queryKey: [EMPLOYEES_QUERY_KEY],
    queryFn: api.employees.getAll,
  });

  const addMutation = useMutation({
    mutationFn: api.employees.add,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EMPLOYEES_QUERY_KEY] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: api.employees.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EMPLOYEES_QUERY_KEY] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: api.employees.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EMPLOYEES_QUERY_KEY] });
    },
  });

  return {
    employees,
    isLoading,
    error,
    addEmployee: addMutation.mutate,
    updateEmployee: updateMutation.mutate,
    deleteEmployee: deleteMutation.mutate,
    isAddingEmployee: addMutation.isPending,
    isUpdatingEmployee: updateMutation.isPending,
    isDeletingEmployee: deleteMutation.isPending,
  };
};