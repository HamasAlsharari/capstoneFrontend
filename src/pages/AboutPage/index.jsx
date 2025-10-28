import "./styles.css"

export default function AboutPage() {
  return (
    <div className="about-container">
      <h1>💰 About ExpenseTracker</h1>
      <p className="about-description">
        ExpenseTracker helps you stay on top of your spending — track your expenses,
        manage categories, and keep your budget in control easily and visually.
      </p>

      <div className="about-features">
        <div className="feature-card">
          <span>📊</span>
          <p>See where your money goes</p>
        </div>
        <div className="feature-card">
          <span>🏷️</span>
          <p>Organize with smart categories</p>
        </div>
        <div className="feature-card">
          <span>💳</span>
          <p>Track payment methods easily</p>
        </div>
      </div>

      <footer className="about-footer">
        <p>Built with ❤️ using React & Django REST</p>
      </footer>
    </div>
  );
}