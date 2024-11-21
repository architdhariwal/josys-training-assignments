import { Customer } from '../types/Customer';

export const validateCustomer = (customer: Customer): string[] => {
  const errors: string[] = [];

  if (!customer.name || customer.name.trim().length < 2) {
    errors.push("Name must be at least 2 characters long");
  }

  if (!customer.city || customer.city.trim().length < 2) {
    errors.push("City must be at least 2 characters long");
  }

  if (!customer.contactNumber.match(/^\d{10}$/)) {
    errors.push("Contact number must be exactly 10 digits");
  }

  if (customer.totalPurchasesPerYear < 0) {
    errors.push("Total purchases cannot be negative");
  }

  if (!customer.photo || !customer.photo.startsWith('http')) {
    errors.push("A valid photo URL is required");
  }

  return errors;
};