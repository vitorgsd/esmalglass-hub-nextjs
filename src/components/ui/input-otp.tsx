"use client";

import * as React from "react";
import { MinusIcon } from "lucide-react";

import { cn } from "./utils";

// Contexto para gerenciar o estado do OTP
interface OTPContextType {
  slots: Array<{
    char: string;
    hasFakeCaret: boolean;
    isActive: boolean;
  }>;
  value: string;
  onChange: (value: string) => void;
}

const OTPInputContext = React.createContext<OTPContextType | null>(null);

interface InputOTPProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  maxLength?: number;
  onChange?: (value: string) => void;
  containerClassName?: string;
  value?: string;
  render?: (props: { slots: OTPContextType['slots'] }) => React.ReactNode;
}

function InputOTP({
  containerClassName,
  maxLength = 6,
  onChange,
  value = "",
  render,
  ...props
}: InputOTPProps) {
  const [internalValue, setInternalValue] = React.useState(value);
  const [activeIndex, setActiveIndex] = React.useState(0);

  const actualValue = String(value || internalValue);

  const slots = React.useMemo(() => {
    return Array.from({ length: maxLength }, (_, index) => ({
      char: actualValue.charAt(index) || "",
      hasFakeCaret: index === activeIndex && index === actualValue.length,
      isActive: index === activeIndex,
    }));
  }, [actualValue, activeIndex, maxLength]);

  const handleChange = React.useCallback((newValue: string) => {
    if (newValue.length <= maxLength) {
      setInternalValue(newValue);
      onChange?.(newValue);
      setActiveIndex(Math.min(newValue.length, maxLength - 1));
    }
  }, [maxLength, onChange]);

  const handleKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Backspace') {
      const newValue = actualValue.slice(0, -1);
      handleChange(newValue);
      setActiveIndex(Math.max(0, newValue.length));
    } else if (/^[0-9]$/.test(e.key)) {
      const newValue = actualValue + e.key;
      handleChange(newValue);
    }
  }, [actualValue, handleChange]);

  const contextValue: OTPContextType = React.useMemo(() => ({
    slots,
    value: actualValue,
    onChange: handleChange,
  }), [slots, actualValue, handleChange]);

  return (
    <OTPInputContext.Provider value={contextValue}>
      <div
        data-slot="input-otp"
        className={cn(
          "flex items-center gap-2 has-disabled:opacity-50",
          containerClassName,
        )}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        role="textbox"
        aria-label="One-time password input"
        {...props}
      >
        {render ? render({ slots }) : (
          <InputOTPGroup>
            {slots.map((_, index) => (
              <InputOTPSlot key={index} index={index} />
            ))}
          </InputOTPGroup>
        )}
      </div>
    </OTPInputContext.Provider>
  );
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn("flex items-center gap-1", className)}
      {...props}
    />
  );
}

function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  index: number;
}) {
  const inputOTPContext = React.useContext(OTPInputContext);
  
  if (!inputOTPContext) {
    throw new Error("InputOTPSlot must be used within InputOTP");
  }

  const slot = inputOTPContext.slots[index];
  
  if (!slot) {
    return null;
  }

  const { char, hasFakeCaret, isActive } = slot;

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        "data-[active=true]:border-ring data-[active=true]:ring-ring/50 data-[active=true]:aria-invalid:ring-destructive/20 dark:data-[active=true]:aria-invalid:ring-destructive/40 aria-invalid:border-destructive data-[active=true]:aria-invalid:border-destructive dark:bg-input/30 border-input relative flex h-9 w-9 items-center justify-center border-y border-r text-sm bg-input-background transition-all outline-none first:rounded-l-md first:border-l last:rounded-r-md data-[active=true]:z-10 data-[active=true]:ring-[3px]",
        className,
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="animate-caret-blink bg-foreground h-4 w-px duration-1000" />
        </div>
      )}
    </div>
  );
}

function InputOTPSeparator({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div 
      data-slot="input-otp-separator" 
      role="separator" 
      className={cn("flex items-center justify-center", className)}
      {...props}
    >
      <MinusIcon className="h-4 w-4" />
    </div>
  );
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
