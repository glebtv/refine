import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import * as util from "util";

/**
* Mantine mocks
*
* info: https://mantine.dev/guides/jest/
* */
import '@testing-library/jest-dom/extend-expect';

const { getComputedStyle } = window;
window.getComputedStyle = (elt) => getComputedStyle(elt);

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

window.scroll = jest.fn();
window.alert = jest.fn();

Object.defineProperty(window, "TextEncoder", {
    writable: true,
    value: util.TextEncoder,
});
Object.defineProperty(window, "TextDecoder", {
    writable: true,
    value: util.TextDecoder,
});

class ResizeObserver {
    observe() {
        // do nothing
    }
    unobserve() {
        // do nothing
    }
    disconnect() {
        // do nothing
    }
}

window.ResizeObserver = ResizeObserver;
