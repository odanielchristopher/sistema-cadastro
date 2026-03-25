import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { colorFormSchema, type ColorFormValues } from './schema';

export const defaultColorFormValues: ColorFormValues = {
  name: '',
  hex: '#000000',
};

export function isValidHex(hex: string) {
  return /^#([0-9a-fA-F]{6})$/.test(hex);
}

export type UseColorFormControllerInput = {
  defaultValues?: Partial<ColorFormValues>;
};

export function useColorFormController({
  defaultValues,
}: UseColorFormControllerInput) {
  const form = useForm<ColorFormValues>({
    resolver: zodResolver(colorFormSchema),
    mode: 'onChange',
    defaultValues: {
      ...defaultColorFormValues,
      ...defaultValues,
    },
  });

  useEffect(() => {
    form.reset({
      ...defaultColorFormValues,
      ...defaultValues,
    });
  }, [defaultValues, form]);

  const hex = form.watch('hex');
  const hexIsValid = isValidHex(hex);

  return {
    form,
    hex,
    hexIsValid,
  };
}
