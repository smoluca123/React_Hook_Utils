import { useState } from 'react';

/**
 *
 * @param defaultValue The initial value of the toggle. Default is false.
 * @returns A boolean value representing the current state of the toggle, and a function to toggle its state.
 * @example
 * function ToggleComponent() {
 * const [value, toggleValue] = useToggle(false)
 * return (
 *  <div>
 *    <div>{value.toString()}</div>
 *    <button onClick={toggleValue}>Toggle</button>
 *    <button onClick={() => toggleValue(true)}>Make True</button>
 *    <button onClick={() => toggleValue(false)}>Make False</button>
 *  </div>
 * )
 *}
 */

export function useToggle(
  defaultValue: boolean = false
): [boolean, (value?: boolean | undefined) => void] {
  const [value, setValue] = useState(defaultValue);

  function toggleValue(value?: boolean) {
    setValue((currentValue: boolean) =>
      typeof value === 'boolean' ? value : !currentValue
    );
  }

  return [value, toggleValue];
}
