import { useForm } from 'react-hook-form';

interface VehicleFormData {
  ownerName: string;
  contactNumber: string;
  vehicleModel: string;
  registrationNumber: string;
  vehicleColor: string;
}

export const VehicleRegistrationForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<VehicleFormData>(
    {
        defaultValues: {
            ownerName: "Dummy",
            contactNumber: "1234567890",
            vehicleModel: "bike",
            registrationNumber: "TS01AB2349",
            vehicleColor: "black"
        },
      }
  );

  const onSubmit = (data: VehicleFormData) => {
    console.log(data);
    reset();
  };

  return (
    <div className="max-w-md mx-auto bg-gray-100 p-6 rounded-lg shadow-md">
 <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Owner Name</label>
        <input
          {...register('ownerName', { required: 'Owner name is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
        {errors.ownerName && (
          <p className="mt-1 text-sm text-red-600">{errors.ownerName.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Contact Number</label>
        <input
          {...register('contactNumber', {
            required: 'Contact number is required',
            pattern: {
              value: /^\d{10}$/,
              message: 'Please enter a valid 10-digit number'
            }
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
        {errors.contactNumber && (
          <p className="mt-1 text-sm text-red-600">{errors.contactNumber.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Vehicle Model</label>
        <input
          {...register('vehicleModel', { required: 'Vehicle model is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
        {errors.vehicleModel && (
          <p className="mt-1 text-sm text-red-600">{errors.vehicleModel.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Registration Number</label>
        <input
          {...register('registrationNumber', {
            required: 'Registration number is required',
            pattern: {
              value: /^TS\d{2}[A-Z]{2}\d{4}$/,
              message: 'Please enter a valid registration number (e.g., TS09EA1234)'
            }
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
        {errors.registrationNumber && (
          <p className="mt-1 text-sm text-red-600">{errors.registrationNumber.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Vehicle Color</label>
        <input
          {...register('vehicleColor', { required: 'Vehicle color is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
        {errors.vehicleColor && (
          <p className="mt-1 text-sm text-red-600">{errors.vehicleColor.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
    </div>
   
  );
};