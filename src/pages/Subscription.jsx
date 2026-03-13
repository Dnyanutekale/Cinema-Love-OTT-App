import React from 'react';
import { Check, Star, Zap, Shield, CreditCard } from 'lucide-react';

const Subscription = () => {
  const plans = [
    {
      name: 'Free',
      price: '0',
      features: ['Ads supported', '720p Quality', '1 Screen', 'No Offline Downloads'],
      current: false,
    },
    {
      name: 'Standard',
      price: '9.99',
      features: ['Ad-free', '1080p Full HD', '2 Screens', 'Offline Downloads'],
      current: false,
      recommended: true,
    },
    {
      name: 'Premium',
      price: '19.99',
      features: ['Ad-free', '4K + HDR', '4 Screens', 'Dolby Atmos', 'Early Access'],
      current: true,
    },
  ];

  return (
    <div className="subscription-page container fade-in">
      <div className="sub-header text-center animate-slide-up">
        <h1 className="section-title">Manage Your Subscription</h1>
        <p className="text-muted">Choose the plan that's right for your entertainment needs.</p>
      </div>

      <div className="plans-grid animate-slide-up">
        {plans.map((plan, i) => (
          <div key={i} className={`plan-card glass ${plan.recommended ? 'recommended' : ''} ${plan.current ? 'current' : ''}`}>
            {plan.recommended && <div className="recommend-badge">Most Popular</div>}
            {plan.current && <div className="current-badge">Current Plan</div>}
            
            <div className="plan-header">
              <h3>{plan.name}</h3>
              <div className="price-container">
                <span className="currency">$</span>
                <span className="price">{plan.price}</span>
                <span className="period">/mo</span>
              </div>
            </div>

            <ul className="feature-list">
              {plan.features.map((feature, j) => (
                <li key={j} className="feature-item">
                  <Check size={18} className="check-icon" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button className={`btn ${plan.current ? 'btn-secondary' : 'btn-primary'} plan-btn`}>
              {plan.current ? 'Manage Plan' : 'Upgrade Now'}
            </button>
          </div>
        ))}
      </div>

      <div className="billing-history glass animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <div className="card-header">
          <h3><CreditCard size={20} /> Recent Billing</h3>
        </div>
        <div className="billing-list">
          {[
            { date: 'Oct 01, 2023', amount: '$19.99', status: 'Paid', method: '•••• 4242' },
            { date: 'Sep 01, 2023', amount: '$19.99', status: 'Paid', method: '•••• 4242' },
          ].map((bill, i) => (
            <div key={i} className="bill-item">
              <div className="bill-info">
                <p className="bill-date">{bill.date}</p>
                <p className="bill-method">{bill.method}</p>
              </div>
              <div className="bill-status">
                <span className="status-badge paid">{bill.status}</span>
                <p className="bill-amount">{bill.amount}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .subscription-page {
          padding-top: 100px;
          padding-bottom: 5rem;
        }

        .sub-header { margin-bottom: 4rem; }

        .plans-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-bottom: 4rem;
        }

        .plan-card {
          padding: 3rem 2rem;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .plan-card.recommended {
          border-color: var(--accent-primary);
          box-shadow: 0 0 30px rgba(229, 9, 20, 0.15);
          transform: scale(1.05);
        }

        .recommend-badge {
          position: absolute;
          top: -15px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--accent-primary);
          padding: 4px 16px;
          border-radius: var(--radius-full);
          font-size: 0.8rem;
          font-weight: 700;
        }

        .current-badge {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          background: rgba(70, 211, 105, 0.15);
          color: #46d369;
          padding: 2px 10px;
          border-radius: 4px;
          font-size: 0.7rem;
          font-weight: 700;
        }

        .plan-header { text-align: center; margin-bottom: 2.5rem; }
        .plan-header h3 { font-size: 1.75rem; margin-bottom: 1rem; }

        .price-container { display: flex; align-items: baseline; justify-content: center; }
        .currency { font-size: 1.5rem; font-weight: 600; margin-right: 2px; }
        .price { font-size: 3.5rem; font-weight: 800; color: white; }
        .period { color: var(--text-dim); }

        .feature-list { flex: 1; margin-bottom: 3rem; }
        .feature-item { 
          display: flex; 
          align-items: center; 
          gap: 12px; 
          margin-bottom: 1rem;
          color: var(--text-muted);
        }
        .check-icon { color: var(--accent-primary); }

        .plan-btn { width: 100%; height: 50px; justify-content: center; }

        .billing-history { padding: 2rem; }
        .billing-list { display: flex; flex-direction: column; gap: 1rem; margin-top: 1.5rem; }
        
        .bill-item {
          display: flex;
          justify-content: space-between;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: var(--radius-sm);
        }

        .bill-date { font-weight: 600; margin-bottom: 4px; }
        .bill-method { font-size: 0.8rem; color: var(--text-dim); }
        .bill-status { text-align: right; }
        .status-badge { font-size: 0.7rem; font-weight: 700; padding: 2px 8px; border-radius: 4px; }
        .status-badge.paid { background: rgba(70, 211, 105, 0.1); color: #46d369; }
        .bill-amount { margin-top: 4px; font-weight: 700; }

        @media (max-width: 1024px) {
          .plan-card.recommended { transform: none; }
        }
      `}</style>
    </div>
  );
};

export default Subscription;
