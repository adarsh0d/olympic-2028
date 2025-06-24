import { render, screen } from '@testing-library/react';
import Home from '../app/page';

describe('Home Page', () => {
  it('should render the main heading', () => {
    render(<Home />);
    expect(screen.getByText('Olympic 2028')).toBeInTheDocument();
  });

  it('should render the welcome message', () => {
    render(<Home />);
    expect(screen.getByText('Welcome to the Olympic 2028 multizone application')).toBeInTheDocument();
  });

  it('should render the medals table link', () => {
    render(<Home />);
    const medalsLink = screen.getByText('Medals Table');
    expect(medalsLink).toBeInTheDocument();
    expect(medalsLink.closest('a')).toHaveAttribute('href', '/medals');
  });

  it('should render the statistics card as disabled', () => {
    render(<Home />);
    expect(screen.getByText('Statistics')).toBeInTheDocument();
    expect(screen.getByText('Coming soon - Detailed Olympic statistics and analytics')).toBeInTheDocument();
  });

  it('should render the venues card as disabled', () => {
    render(<Home />);
    expect(screen.getByText('Venues')).toBeInTheDocument();
    expect(screen.getByText('Coming soon - Olympic venues and event information')).toBeInTheDocument();
  });

  it('should render the architecture description', () => {
    render(<Home />);
    expect(screen.getByText('This is a multizone Next.js application with micro-frontend architecture')).toBeInTheDocument();
  });

  it('should apply correct styling classes', () => {
    render(<Home />);
    
    const mainContainer = screen.getByText('Olympic 2028').closest('div');
    expect(mainContainer).toHaveClass('min-h-screen', 'bg-gradient-to-br', 'from-blue-50', 'to-indigo-100');
    
    const contentContainer = mainContainer?.querySelector('.max-w-4xl');
    expect(contentContainer).toHaveClass('max-w-4xl', 'mx-auto', 'px-6', 'py-12', 'text-center');
  });

  it('should render all three feature cards', () => {
    render(<Home />);
    
    const cards = screen.getAllByText(/Medals Table|Statistics|Venues/);
    expect(cards).toHaveLength(3);
  });

  it('should have correct emoji icons', () => {
    render(<Home />);
    
    expect(screen.getByText('🏅')).toBeInTheDocument(); // Medals
    expect(screen.getByText('📊')).toBeInTheDocument(); // Statistics
    expect(screen.getByText('🏟️')).toBeInTheDocument(); // Venues
  });

  it('should have hover effects on the medals link', () => {
    render(<Home />);
    
    const medalsCard = screen.getByText('Medals Table').closest('a');
    expect(medalsCard).toHaveClass('group', 'hover:shadow-lg', 'hover:border-blue-300');
  });

  it('should have disabled styling on coming soon cards', () => {
    render(<Home />);
    
    const disabledCards = screen.getAllByText(/Statistics|Venues/).map(el => el.closest('div'));
    disabledCards.forEach(card => {
      expect(card).toHaveClass('opacity-50');
    });
  });
}); 