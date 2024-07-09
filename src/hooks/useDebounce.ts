import { useState, useEffect } from 'react';

// Định nghĩa kiểu dữ liệu cho tham số đầu vào
export function useDebounce<T>(value: T, delay: number): T {
  // Sử dụng useState để lưu trữ giá trị đã được debounce
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Tạo một timeout để cập nhật giá trị sau một khoảng thời gian
    const timer = setTimeout(() => setDebouncedValue(value), delay);

    // Cleanup function để xóa timeout nếu giá trị hoặc delay thay đổi
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  // Trả về giá trị đã được debounce
  return debouncedValue;
}
