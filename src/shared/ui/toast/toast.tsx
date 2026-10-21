"use client";

import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastOptions {
  title: string;
  description?: string;
  type?: ToastType;
  duration?: number;
}

interface ToastItem extends ToastOptions {
  id: string;
  createdAt: number;
  isExiting?: boolean;
}

interface ToastContextType {
  toast: {
    (options: ToastOptions): string;
    success: (title: string, description?: string, duration?: number) => string;
    error: (title: string, description?: string, duration?: number) => string;
    warning: (title: string, description?: string, duration?: number) => string;
    info: (title: string, description?: string, duration?: number) => string;
    dismiss: (id: string) => void;
  };
}

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isExiting: true } : t))
    );
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 220); // match exit animation duration
  }, []);

  const addToast = useCallback(
    ({ title, description, type = "info", duration = 4000 }: ToastOptions) => {
      const id = Math.random().toString(36).substring(2, 9);
      const newToast: ToastItem = {
        id,
        title,
        description,
        type,
        duration,
        createdAt: Date.now(),
      };

      setToasts((prev) => [newToast, ...prev.slice(0, 3)]); // Keep maximum 4 toasts
      return id;
    },
    []
  );

  const toastMethods = Object.assign(addToast, {
    success: (title: string, description?: string, duration?: number) =>
      addToast({ title, description, type: "success", duration }),
    error: (title: string, description?: string, duration?: number) =>
      addToast({ title, description, type: "error", duration }),
    warning: (title: string, description?: string, duration?: number) =>
      addToast({ title, description, type: "warning", duration }),
    info: (title: string, description?: string, duration?: number) =>
      addToast({ title, description, type: "info", duration }),
    dismiss,
  });

  return (
    <ToastContext.Provider value={{ toast: toastMethods }}>
      {children}
      {/* Toast Floating Container */}
      <div
        aria-live="polite"
        className="fixed top-5 right-5 z-[99999] flex flex-col gap-2.5 pointer-events-none max-w-[390px] w-full px-4 sm:px-0"
      >
        {toasts.map((item) => (
          <ToastCard key={item.id} item={item} onDismiss={() => dismiss(item.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

function ToastCard({
  item,
  onDismiss,
}: {
  item: ToastItem;
  onDismiss: () => void;
}) {
  const [isPaused, setIsPaused] = useState(false);
  const duration = item.duration ?? 4000;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPaused || duration <= 0) return;

    timerRef.current = setTimeout(() => {
      onDismiss();
    }, duration);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [duration, isPaused, onDismiss]);

  const typeConfig = {
    success: {
      icon: CheckCircle2,
      iconClass: "text-[#2D6A4F]",
      borderClass: "border-l-4 border-l-[#2D6A4F]",
      barClass: "bg-[#2D6A4F]",
      badgeText: "SUCCESS",
    },
    error: {
      icon: AlertCircle,
      iconClass: "text-[#EF4444]",
      borderClass: "border-l-4 border-l-[#EF4444]",
      barClass: "bg-[#EF4444]",
      badgeText: "ERROR",
    },
    warning: {
      icon: AlertTriangle,
      iconClass: "text-[#F59E0B]",
      borderClass: "border-l-4 border-l-[#F59E0B]",
      barClass: "bg-[#F59E0B]",
      badgeText: "WARNING",
    },
    info: {
      icon: Info,
      iconClass: "text-[#C19A6B]",
      borderClass: "border-l-4 border-l-[#C19A6B]",
      barClass: "bg-[#C19A6B]",
      badgeText: "INFO",
    },
  };

  const config = typeConfig[item.type ?? "info"];
  const Icon = config.icon;

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={cn(
        "pointer-events-auto relative overflow-hidden bg-[#111111] text-white shadow-2xl rounded-[3px] border border-white/10 p-4 transition-all",
        config.borderClass,
        item.isExiting ? "toast-item-exit" : "toast-item-enter"
      )}
    >
      <div className="flex items-start gap-3">
        <Icon className={cn("w-5 h-5 shrink-0 mt-0.5", config.iconClass)} />
        <div className="flex-1 min-w-0 pr-4">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[10px] font-bold tracking-widest text-[#8E8E8E] uppercase">
              {config.badgeText}
            </span>
          </div>
          <p className="text-[13.5px] font-semibold text-white leading-snug">
            {item.title}
          </p>
          {item.description && (
            <p className="text-[12.5px] text-[#A3A3A3] mt-1 leading-relaxed">
              {item.description}
            </p>
          )}
        </div>
        <button
          onClick={onDismiss}
          aria-label="Close Notification"
          className="text-[#8E8E8E] hover:text-white transition-colors cursor-pointer p-0.5"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Progress countdown bar at the bottom */}
      {duration > 0 && (
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10">
          <div
            className={cn("h-full transition-all ease-linear", config.barClass)}
            style={{
              animation: `toast-progress ${duration}ms linear forwards`,
              animationPlayState: isPaused ? "paused" : "running",
            }}
          />
        </div>
      )}
    </div>
  );
}
