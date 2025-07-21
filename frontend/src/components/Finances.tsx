import { 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Users,
  Building2,
  Package,
  ArrowUp,
  ArrowDown
} from 'lucide-react'

const Finances: React.FC = () => {
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Format large numbers
  const formatLargeNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const financialMetrics = [
    {
      id: 'revenue',
      title: 'Revenue',
      period: 'Jun 2025',
      currentValue: 499521,
      change: -17.47,
      changeType: 'decrease',
      additionalMetrics: [
        { label: '3 month rolling average', value: formatCurrency(535355.87) }
      ]
    },
    {
      id: 'netIncome',
      title: 'Net Income (Loss)',
      period: 'Jun 2025',
      currentValue: -9215,
      change: 107.26,
      changeType: 'decrease',
      additionalMetrics: [
        { label: '3 month rolling average', value: formatCurrency(45933.21) }
      ]
    },
    {
      id: 'loansFunded',
      title: 'Loans Funded',
      period: 'Jun 2025',
      currentValue: 600163628,
      change: 7.29,
      changeType: 'increase',
      additionalMetrics: [
        { label: 'YTD', value: formatLargeNumber(3224684827) },
        { label: 'total', value: formatLargeNumber(6065072192) }
      ]
    },
    {
      id: 'numLoansFunded',
      title: '# Of Loans Funded',
      period: 'Jun 2025',
      currentValue: 1033,
      change: 2.99,
      changeType: 'increase',
      additionalMetrics: [
        { label: 'YTD', value: formatLargeNumber(5715) },
        { label: 'total', value: formatLargeNumber(10993) }
      ]
    },
    {
      id: 'bankBalance',
      title: 'Bank Balance',
      period: 'Jun 2025',
      currentValue: 960266,
      change: 14.73,
      changeType: 'increase',
      additionalMetrics: [
        { label: '3 month rolling average', value: formatCurrency(827460.32) }
      ]
    },
    {
      id: 'workingCapital',
      title: 'Working Capital (Cash + AR - AP - HST)',
      period: 'Jun 2025',
      currentValue: 491735,
      change: 17.69,
      changeType: 'increase',
      additionalMetrics: [
        { label: '3 month rolling average', value: formatCurrency(366930.06) }
      ]
    },
    {
      id: 'loansProcessed',
      title: 'Loans Processed',
      period: 'Jun 2025',
      currentValue: 2226833517,
      change: -14.82,
      changeType: 'decrease',
      additionalMetrics: [
        { label: 'YTD', value: formatLargeNumber(14225022481) },
        { label: 'total', value: formatLargeNumber(27169819975) }
      ]
    },
    {
      id: 'numLoansProcessed',
      title: '# Of Loans Processed',
      period: 'Jun 2025',
      currentValue: 3919,
      change: -11.89,
      changeType: 'decrease',
      additionalMetrics: [
        { label: 'YTD', value: formatLargeNumber(24152) },
        { label: 'total', value: formatLargeNumber(46213) }
      ]
    }
  ];

  return (
    <div className="finances-container">
      {/* Action Buttons */}
      <div className="finances-actions">
        <button className="action-btn export-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7,10 12,15 17,10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Export Reports
        </button>
        <button className="action-btn create-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Create Invoice
        </button>
      </div>

      <div className="finances-grid">
        {financialMetrics.map((metric) => (
          <div key={metric.id} className="finance-card">
            <div className="finance-header">
              <div className="finance-title">{metric.title}</div>
              <div className="finance-period">{metric.period}</div>
            </div>
            
            <div className="finance-value">
              {metric.currentValue < 0 ? '-' : ''}
              {metric.title.includes('#') || metric.title.includes('Loans') 
                ? formatLargeNumber(Math.abs(metric.currentValue))
                : formatCurrency(Math.abs(metric.currentValue))
              }
            </div>
            
            <div className={`finance-change ${metric.changeType}`}>
              {metric.changeType === 'increase' ? (
                <ArrowUp size={14} />
              ) : (
                <ArrowDown size={14} />
              )}
              {Math.abs(metric.change).toFixed(2)}% from last month
            </div>
            
            <div className="finance-additional">
              {metric.additionalMetrics.map((additional, index) => (
                <div key={index} className="additional-metric">
                  {additional.label}: {additional.value}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="finances-dashboard">
        <div className="dashboard-grid">
          {/* Forecasted Results Table */}
          <div className="dashboard-panel">
            <h3 className="panel-title">Forecasted Results (April To October 2025)</h3>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Metric</th>
                    <th>MAY 2025</th>
                    <th>JUN 2025</th>
                    <th>JUL 2025</th>
                    <th>AUG 2025</th>
                    <th>SEP 2025</th>
                    <th>OCT 2025</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Revenue</td>
                    <td>612,721</td>
                    <td>463,129</td>
                    <td>487,234</td>
                    <td>512,456</td>
                    <td>528,789</td>
                    <td>553,546</td>
                  </tr>
                  <tr>
                    <td>Income (Loss)</td>
                    <td>108,980</td>
                    <td>-39,569</td>
                    <td>-12,340</td>
                    <td>23,456</td>
                    <td>45,678</td>
                    <td>59,656</td>
                  </tr>
                  <tr>
                    <td>Bank Balance</td>
                    <td>542,840</td>
                    <td>711,360</td>
                    <td>698,456</td>
                    <td>623,789</td>
                    <td>567,234</td>
                    <td>435,602</td>
                  </tr>
                  <tr>
                    <td>Working Capital</td>
                    <td>313,914</td>
                    <td>345,678</td>
                    <td>378,901</td>
                    <td>412,345</td>
                    <td>443,456</td>
                    <td>276,558</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Net Income Chart */}
          <div className="dashboard-panel">
            <h3 className="panel-title">Net Income (Loss) - Monthly</h3>
            <div className="chart-container">
              <div className="bar-chart">
                {[
                  { month: 'Jul', value: -11.4 },
                  { month: 'Aug', value: -31.4 },
                  { month: 'Sep', value: -280.7 },
                  { month: 'Oct', value: -113.5 },
                  { month: 'Nov', value: -107.6 },
                  { month: 'Dec', value: -3.4 },
                  { month: 'Jan', value: -42.3 },
                  { month: 'Feb', value: 69.4 },
                  { month: 'Mar', value: 18.9 },
                  { month: 'Apr', value: 20.0 },
                  { month: 'May', value: 127.0 },
                  { month: 'Jun', value: -9.2 }
                ].map((bar, index) => (
                  <div key={index} className="bar-item">
                    <div className="bar-label">{bar.month}</div>
                    <div className="bar-wrapper">
                      <div 
                        className={`bar ${bar.value >= 0 ? 'positive' : 'negative'}`}
                        style={{ 
                          height: `${Math.abs(bar.value) / 3}px`,
                          transform: bar.value >= 0 ? 'none' : 'scaleY(-1)'
                        }}
                      ></div>
                    </div>
                    <div className="bar-value">{bar.value}K</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Expenses Table */}
          <div className="dashboard-panel">
            <h3 className="panel-title">Expenses By Department - Monthly</h3>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Department</th>
                    <th>JAN 2025</th>
                    <th>FEB 2025</th>
                    <th>MAR 2025</th>
                    <th>APR 2025</th>
                    <th>MAY 2025</th>
                    <th>JUN 2025</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Total Expenses</td>
                    <td>268,132</td>
                    <td>312,456</td>
                    <td>345,789</td>
                    <td>389,234</td>
                    <td>423,567</td>
                    <td>457,799</td>
                  </tr>
                  <tr>
                    <td>General & Administrative</td>
                    <td>60,095</td>
                    <td>68,234</td>
                    <td>72,456</td>
                    <td>86,767</td>
                    <td>78,901</td>
                    <td>56,396</td>
                  </tr>
                  <tr>
                    <td>Research & Development</td>
                    <td>183,591</td>
                    <td>218,456</td>
                    <td>245,678</td>
                    <td>276,789</td>
                    <td>301,234</td>
                    <td>368,975</td>
                  </tr>
                  <tr>
                    <td>Sales & Marketing</td>
                    <td>23,805</td>
                    <td>25,766</td>
                    <td>27,655</td>
                    <td>25,678</td>
                    <td>35,103</td>
                    <td>31,788</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Donut Chart */}
          <div className="dashboard-panel">
            <h3 className="panel-title">Expenses By Department - Monthly</h3>
            <div className="donut-chart-container">
              <div className="donut-chart-wrapper">
                <div className="donut-chart">
                  <svg width="200" height="200" viewBox="0 0 200 200">
                    {/* Research & Development - 80.7% (290.52 degrees) */}
                    <circle
                      cx="100"
                      cy="100"
                      r="80"
                      fill="none"
                      stroke="#6b7280"
                      strokeWidth="20"
                      strokeDasharray="402.12 100"
                      strokeDashoffset="0"
                      transform="rotate(-90 100 100)"
                    />
                    {/* General & Administrative - 12.3% (44.28 degrees) */}
                    <circle
                      cx="100"
                      cy="100"
                      r="80"
                      fill="none"
                      stroke="#9ca3af"
                      strokeWidth="20"
                      strokeDasharray="60.32 100"
                      strokeDashoffset="-402.12"
                      transform="rotate(-90 100 100)"
                    />
                    {/* Sales & Marketing - 7.0% (25.2 degrees) */}
                    <circle
                      cx="100"
                      cy="100"
                      r="80"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="20"
                      strokeDasharray="35.04 100"
                      strokeDashoffset="-462.44"
                      transform="rotate(-90 100 100)"
                    />
                  </svg>
                  <div className="donut-center">
                    <div className="donut-total">100%</div>
                  </div>
                </div>
                
                {/* Percentage Labels with Lines */}
                <div className="percentage-label rnd-label">
                  <div className="label-line"></div>
                  <div className="label-text">80.7%</div>
                </div>
                <div className="percentage-label admin-label">
                  <div className="label-line"></div>
                  <div className="label-text">12.3%</div>
                </div>
                <div className="percentage-label sales-label">
                  <div className="label-line"></div>
                  <div className="label-text">7.0%</div>
                </div>
              </div>
              
              <div className="donut-legend">
                <div className="legend-item">
                  <div className="legend-color rnd"></div>
                  <span>Research & Development</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color admin"></div>
                  <span>General & Administrative</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color sales"></div>
                  <span>Sales & Marketing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Finances; 