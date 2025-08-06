import React from 'react';
import { afterEach, describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, cleanup } from '@testing-library/react';
import { CountClass } from './CountClass';

describe('Count Class', () => {
  afterEach(() => {
    cleanup();
  });

  it('The component is mounted', async () => {
    const logSpy = vi.spyOn(console, 'log');
    render(<CountClass />);
    expect(screen.getByText('Init Value Class: 2')).not.toBeNull();

    await waitFor(
      () => {
        expect(logSpy).toHaveBeenCalledWith('currentValue class - timeout:', 2);
      },
      { timeout: 2000 }
    );
    logSpy.mockRestore();
  });

  it('The component is unmounted', () => {
    const logSpy = vi.spyOn(console, 'log');

    const { unmount, container } = render(<CountClass />);
    unmount();
    expect(container.innerHTML).toBe('');

    expect(logSpy).toHaveBeenCalledWith('Unmounting class');
    logSpy.mockRestore();
  });

  it('the user clicks on button', async () => {
    const renderSpy = vi.spyOn(CountClass.prototype, 'render');

    render(<CountClass />);

    const button = screen.getByText('Increment Class');

    expect(button).toBeDefined();

    button.click();

    await waitFor(() => {
      expect(screen.getByText('Init Value Class: 4')).not.toBeNull();
      expect(renderSpy).toHaveBeenCalledTimes(3); // first mount (new prop), second state change (+2, automatically),  button pressed (+2)
    });
  });

  it('does not re-render unnecessarily', async () => {
    const renderSpy = vi.spyOn(CountClass.prototype, 'render');
    const { rerender } = render(<CountClass initValue={2} />);
    expect(renderSpy).toHaveBeenCalledTimes(2);
    renderSpy.mockReset();

    rerender(<CountClass initValue={2} />);
    // Should not render if the init value didn't change
    expect(renderSpy).toHaveBeenCalledTimes(0);
    renderSpy.mockReset();

    rerender(<CountClass initValue={3} />);
    // Should re-render twice because 3 and 3+2
    expect(renderSpy).toHaveBeenCalledTimes(2);
    renderSpy.mockRestore();
  });
});

describe('CountClass Error Boundaries', () => {
  let getDerivedStateFromErrorSpy;
  let componentDidCatchSpy;
  let consoleErrorSpy;

  beforeEach(() => {
    cleanup();
    // Create spies for Error Boundary methods and console.error
    // getDerivedStateFromError is static, so spy directly on the class
    getDerivedStateFromErrorSpy = vi.spyOn(
      CountClass,
      'getDerivedStateFromError'
    );
    // componentDidCatch is an instance method, so spy on the prototype
    componentDidCatchSpy = vi.spyOn(CountClass.prototype, 'componentDidCatch');
    // It's also good practice to spy on console.error to avoid real errors flooding the test console and to verify it was called
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    // Restore mocks after each test to ensure a clean state
    getDerivedStateFromErrorSpy.mockRestore();
    componentDidCatchSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });

  it('should call getDerivedStateFromError and componentDidCatch when a child throws an error', () => {
    // Render the CountClass component and pass the shouldThrow prop as true.
    // This will make CountClass render ThrowingComponent, which will throw an error.
    render(<CountClass shouldThrow={true} />);

    // Verify that getDerivedStateFromError was called
    expect(getDerivedStateFromErrorSpy).toHaveBeenCalledTimes(2);
    expect(getDerivedStateFromErrorSpy).toHaveBeenCalledWith(expect.any(Error));

    // Verify that componentDidCatch was called
    expect(componentDidCatchSpy).toHaveBeenCalledTimes(1);
    expect(componentDidCatchSpy).toHaveBeenCalledWith(
      expect.any(Error),
      expect.objectContaining({ componentStack: expect.any(String) })
    );

    // Verify that the Error Boundary fallback message is shown
    expect(screen.getByText('Something went wrong!')).toBeDefined();
    expect(consoleErrorSpy).toHaveBeenCalledTimes(4); // Once for each Error Boundary method
  });

  it('should not call error boundary methods if no error occurs', () => {
    // Render the component without the shouldThrow prop, so no error is thrown
    render(<CountClass />);

    // Verify that Error Boundary methods were NOT called
    expect(getDerivedStateFromErrorSpy).not.toHaveBeenCalled();
    expect(componentDidCatchSpy).not.toHaveBeenCalled();

    // Verify that the fallback message is NOT shown
    expect(screen.queryByText('Something went wrong!')).toBe(null);
  });
});
