import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor, cleanup } from '@testing-library/react';
import { CountFunctional } from './CountFunctional';
import React from 'react';

describe('Count Functional', () => {
  afterEach(() => {
    cleanup();
  });

  it('The component is mounted', async () => {
    const logSpy = vi.spyOn(console, 'log');
    render(<CountFunctional />);
    expect(screen.getByText('Init Value Functional: 2')).not.toBeNull();

    await waitFor(
      () => {
        expect(logSpy).toHaveBeenCalledWith(
          'currentValue functional - timeout:',
          2
        );
      },
      { timeout: 2000 }
    );
    logSpy.mockRestore();
  });

  it('The component is unmounted', () => {
    const logSpy = vi.spyOn(console, 'log');

    const { unmount, container } = render(<CountFunctional />);
    unmount();
    expect(container.innerHTML).toBe('');

    expect(logSpy).toHaveBeenCalledWith('Unmounting functional');
    logSpy.mockRestore();
  });

  it('the user clicks on button', async () => {
    const logSpy = vi.spyOn(console, 'log');
    render(<CountFunctional />);
    const button = screen.getByText('Increment Functional');
    expect(button).toBeDefined();
    button.click();
    await waitFor(() => {
      expect(screen.getByText('Init Value Functional: 4')).not.toBeNull();
      // Should have rendered 3 times: initial, after mount (setState), after click
      const renderLogs = logSpy.mock.calls.filter(
        ([msg]) => msg === 'Functional render count:'
      );
      // Each render logs 'Functional render count: N', so count all such logs
      expect(renderLogs.length).toBeGreaterThanOrEqual(3);
    });
    logSpy.mockRestore();
  });

  it('does not re-render unnecessarily', async () => {
    const logSpy = vi.spyOn(console, 'log');
    const { rerender } = render(<CountFunctional initValue={2} />);
    // Count initial renders
    let renderLogs = logSpy.mock.calls.filter(
      ([msg]) => msg === 'Functional render count:'
    );
    expect(renderLogs.length).toBeGreaterThanOrEqual(2); // initial + setState
    logSpy.mockReset();

    rerender(<CountFunctional initValue={2} />);
    renderLogs = logSpy.mock.calls.filter(
      ([msg]) => msg === 'Functional render count:'
    );
    // Should not re-render if the init value didn't change
    expect(renderLogs.length).toBe(0);
    logSpy.mockReset();

    rerender(<CountFunctional initValue={3} />);
    renderLogs = logSpy.mock.calls.filter(
      ([msg]) => msg === 'Functional render count:'
    );
    // Should re-render at least twice: prop change + setState
    expect(renderLogs.length).toBeGreaterThanOrEqual(2);
    logSpy.mockRestore();
  });
});
