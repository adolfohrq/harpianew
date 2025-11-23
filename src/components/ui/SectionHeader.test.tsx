import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { SectionHeader } from './SectionHeader';

// Helper para renderizar com Router
const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('SectionHeader', () => {
  it('renders title correctly', () => {
    renderWithRouter(<SectionHeader title="TEST TITLE" />);
    expect(screen.getByText('TEST TITLE')).toBeInTheDocument();
  });

  it('renders label when provided', () => {
    renderWithRouter(<SectionHeader label="Test Label" title="Title" />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    renderWithRouter(<SectionHeader title="Title" description="This is a test description" />);
    expect(screen.getByText('This is a test description')).toBeInTheDocument();
  });

  it('renders link when provided', () => {
    renderWithRouter(
      <SectionHeader
        title="Title"
        link={{ to: '/test', text: 'Click Here', ariaLabel: 'Test link' }}
      />
    );
    const link = screen.getByRole('link', { name: 'Test link' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/test');
  });

  it('uses custom className when provided', () => {
    const { container } = renderWithRouter(
      <SectionHeader title="Title" className="custom-class" />
    );
    const header = container.querySelector('header');
    expect(header).toHaveClass('custom-class');
  });

  it('applies center alignment correctly', () => {
    const { container } = renderWithRouter(<SectionHeader title="Title" align="center" />);
    const header = container.querySelector('header');
    expect(header).toHaveClass('text-center');
  });

  it('applies left alignment by default', () => {
    const { container } = renderWithRouter(<SectionHeader title="Title" />);
    const header = container.querySelector('header');
    expect(header).toHaveClass('text-center', 'md:text-left');
  });

  it('uses default description max width', () => {
    const { container } = renderWithRouter(
      <SectionHeader title="Title" description="Description" />
    );
    const description = container.querySelector('p');
    expect(description).toHaveClass('max-w-2xl');
  });

  it('applies custom description max width', () => {
    const { container } = renderWithRouter(
      <SectionHeader title="Title" description="Description" descriptionMaxWidth="sm" />
    );
    const description = container.querySelector('p');
    expect(description).toHaveClass('max-w-sm');
  });

  it('renders without label, description, and link (minimal)', () => {
    renderWithRouter(<SectionHeader title="Minimal Title" />);
    expect(screen.getByText('Minimal Title')).toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('uses ariaLabel from link prop', () => {
    renderWithRouter(
      <SectionHeader
        title="Title"
        link={{ to: '/services', text: 'View', ariaLabel: 'View all services' }}
      />
    );
    const link = screen.getByRole('link', { name: 'View all services' });
    expect(link).toBeInTheDocument();
  });

  it('falls back to link text when ariaLabel not provided', () => {
    renderWithRouter(
      <SectionHeader title="Title" link={{ to: '/services', text: 'View Services' }} />
    );
    const link = screen.getByRole('link', { name: 'View Services' });
    expect(link).toBeInTheDocument();
  });
});
