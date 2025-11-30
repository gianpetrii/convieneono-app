"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface NumberInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onValueChange?: (value: string) => void;
}

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  ({ className, value, onChange, onValueChange, ...props }, ref) => {
    const [displayValue, setDisplayValue] = React.useState("");

    // Formatear número con separadores de miles
    const formatNumber = (val: string) => {
      // Remover todo excepto números y punto decimal
      const cleaned = val.replace(/[^\d.]/g, '');
      if (!cleaned) return '';
      
      // Separar parte entera y decimal
      const parts = cleaned.split('.');
      // Agregar separadores de miles a la parte entera
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      
      // Retornar con máximo 2 decimales
      return parts.length > 1 ? `${parts[0]}.${parts[1].slice(0, 2)}` : parts[0];
    };

    // Limpiar número (remover comas)
    const cleanNumber = (val: string) => {
      return val.replace(/,/g, '');
    };

    // Actualizar display cuando cambia el value prop
    React.useEffect(() => {
      if (value !== undefined) {
        const stringValue = String(value);
        setDisplayValue(formatNumber(stringValue));
      }
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      const cleaned = cleanNumber(inputValue);
      const formatted = formatNumber(cleaned);
      
      setDisplayValue(formatted);
      
      // Crear un nuevo evento con el valor limpio
      const newEvent = {
        ...e,
        target: {
          ...e.target,
          value: cleaned,
          name: e.target.name,
        },
      } as React.ChangeEvent<HTMLInputElement>;
      
      if (onChange) {
        onChange(newEvent);
      }
      
      if (onValueChange) {
        onValueChange(cleaned);
      }
    };

    return (
      <input
        type="text"
        inputMode="decimal"
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        value={displayValue}
        onChange={handleChange}
        {...props}
      />
    );
  }
);

NumberInput.displayName = "NumberInput";

export { NumberInput };

