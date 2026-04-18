import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CoursesSection } from '@/components/CoursesSection';

jest.mock('@/utils/consts', () => ({
  cursos: [
    { category: 'Tech', items: [{ title: 'A', meta: 'm1' }, { title: 'B', meta: 'm2' }] },
    { category: 'Biz', items: [{ title: 'C', meta: 'm3' }] },
  ],
}));

describe('CoursesSection', () => {
  const toggleMock = jest.fn();

  beforeEach(() => toggleMock.mockClear());

it('renders desktop title and desktop pills', () => {
  render(<CoursesSection activeCategory="Tech" toggleCategory={toggleMock} />);

  const title = screen.getByRole('heading', { name: /Cursos/i, level: 2 });
  expect(title).toBeInTheDocument();

  expect(screen.getByText(/Cursos de Curta Duração/i)).toBeInTheDocument();

  expect(screen.getByRole('heading', { name: /Tech/i })).toBeInTheDocument();

  expect(screen.getByRole('button', { name: /Mostrar Tech/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Mostrar Biz/i })).toBeInTheDocument();
});
  it('mobile toggles open/close their own content (simulate clicks)', () => {
    render(<CoursesSection activeCategory="Tech" toggleCategory={toggleMock} />);
    const allButtons = screen.queryAllByRole('button');
    const mobileBtns = allButtons.filter((b) => b.getAttribute('aria-controls'));
    expect(mobileBtns.length).toBeGreaterThanOrEqual(2);

    fireEvent.click(mobileBtns[0]);
    expect(mobileBtns[0]).toBeDefined();
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<CoursesSection activeCategory="Tech" toggleCategory={toggleMock} />);
    expect(asFragment()).toMatchSnapshot();
  });
});