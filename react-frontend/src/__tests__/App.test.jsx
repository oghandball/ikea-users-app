import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import App from "../App";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ test: 100 }),
  }),
)

test("renders an h1 tag", () => {});
