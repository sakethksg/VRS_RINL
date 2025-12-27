# RINL VRS Calculator

A professional web application to calculate Voluntary Retirement Scheme (VRS) compensation for RINL (Rashtriya Ispat Nigam Limited) - Visakhapatnam Steel Plant employees based on the official Gujarat Model.

## Features

✅ **Gujarat Model VRS Calculation** - Matches official RINL calculations exactly  
✅ **Simplified Input** - Only 4 required fields (Basic, DA, DOJ, Retirement Date)  
✅ **Comprehensive Analysis** - Shows VRS vs Continue Working comparison  
✅ **Tax Calculation** - ₹5 lakh exempt, 32% tax on remaining  
✅ **Loss Analysis** - Detailed financial impact assessment  
✅ **Investment Projection** - 5.5% compound interest simulation  
✅ **PF & SBFP Calculations** - Company contributions (12% + 3%)  
✅ **Mobile-Responsive Design** - Works on all devices  
✅ **Real-time Validation** - Form validation with error messages  
✅ **Visual Charts** - Pie chart for compensation breakdown  

## Technology Stack

- **Framework**: Next.js 16 (App Router with Turbopack)
- **Language**: TypeScript
- **UI Library**: Shadcn UI (Radix UI + Tailwind CSS)
- **Styling**: Tailwind CSS
- **Form**: React Hook Form
- **Validation**: Zod
- **Date Handling**: date-fns
- **Charts**: Recharts

## Getting Started

### Prerequisites

- Node.js >= 20.9.0
- npm or yarn

### Installation

```bash
# Navigate to project directory
cd rinl-vrs-calculator

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```

## VRS Calculation Formula (Gujarat Model)

### Official RINL Method

**Compensation 1 - Completed Service:**  
Per Day Salary × 35 days × Completed Service Years

**Compensation 2 - Remaining Service:**  
Per Day Salary × 25 days × Remaining Service Years

**Total VRS Compensation:**  
Min(Compensation 1 + Compensation 2, Basic+DA until retirement)

### Important Notes on Calculation

- **Per Day Salary** = (Basic + DA) ÷ 30
- **Completed Service**: Uses RINL notation (e.g., 32.10 for 32 years 10 months)
- **Remaining Service**: Calculated in decimal years (e.g., 33 months = 2.75 years)
- **Tax Treatment**: ₹5,00,000 exempt, 32% tax on remaining amount

### Loss Analysis Components

1. **Loss (Before Tax)**: Basic+DA until retirement - VRS amount
2. **Loss (After Taxes)**: (Salary after tax + PF/SBFP) - VRS after tax
3. **Loss (With Investment)**: Total if working - VRS invested @ 5.5% compound interest

## Verification with Official RINL Calculation

The calculator has been verified to match official RINL VRS calculations:

**Test Case (Employee #117031):**
- Basic: ₹44,260 | DA: ₹100,514
- Completed Service: 32.10 years
- Remaining Service: 2.75 years (33 months)

**Results Match:**
- ✓ Compensation 1: ₹5,421,786.30
- ✓ Compensation 2: ₹331,773.75
- ✓ Total 35/25: ₹5,753,560.05
- ✓ Final VRS: ₹4,777,542.00

## Project Structure

```
rinl-vrs-calculator/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with metadata
│   │   ├── page.tsx            # Main calculator page
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   ├── ui/                 # Shadcn UI components
│   │   ├── calculator-form.tsx # VRS input form (4 fields)
│   │   ├── results-display.tsx # Comprehensive results
│   │   ├── compensation-breakdown-chart.tsx # Visual breakdown
│   │   └── investment-simulator.tsx # Investment projections
│   ├── lib/
│   │   ├── calculations.ts     # Gujarat Model VRS logic
│   │   └── utils.ts            # Utility functions
│   └── types/
│       └── index.ts            # TypeScript interfaces
├── public/                     # Static assets
├── package.json
└── README.md
```

## Usage

### Simple 4-Step Process

1. **Enter Salary Details:**
   - Basic Pay (₹)
   - Dearness Allowance (DA) (₹)

2. **Select Dates:**
   - Date of Joining (when you joined RINL)
   - Date of Retirement (expected retirement date)

3. **Calculate:**
   - Click "Calculate VRS Compensation" button

4. **Review Results:**
   - VRS Compensation (after tax)
   - Salary breakdown
   - Service period details
   - VRS compensation breakdown with tax details
   - Investment projection @ 5.5% annual interest
   - **Complete loss analysis** comparing VRS vs continuing employment

### Understanding the Results

**VRS Compensation Card:**
- Shows your final take-home amount after ₹5 lakh tax exemption and 32% tax

**Salary Information:**
- Basic + DA calculation
- Per day salary

**Service Period:**
- Completed service (in years.months format)
- Remaining service until retirement

**VRS Compensation Breakdown:**
- Compensation 1 (35 days × completed service)
- Compensation 2 (25 days × remaining service)
- Tax calculation details
- Final amount after tax

**Investment Projection:**
- Monthly interest earnings
- Matured amount at retirement with 5.5% compound interest

**Comparison Analysis:**
- Financial projection if you continue working
- Loss calculation in three scenarios:
  1. Before tax consideration
  2. After tax consideration
  3. After tax + investment returns @ 5.5%

## Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

```bash
# Install Vercel CLI
npm i -g vercel

# Login and deploy
vercel login
vercel

# Deploy to production
vercel --prod
```

Or connect your GitHub repository to Vercel for automatic deployments.

### Other Deployment Options

- **Netlify**: Connect repository for automatic deployments
- **Railway**: Deploy directly from GitHub
- **Docker**: Use Next.js Dockerfile

### Environment Variables

No environment variables required.

## Sample Calculation

**Example Employee Data:**
- Basic Pay: ₹44,260
- DA: ₹100,514
- Date of Joining: 24 Aug 1993
- Date of Retirement: 30 Jun 2028

**Expected Results:**
- Basic + DA: ₹144,774
- Per Day Salary: ₹4,825.80
- Completed Service: 32 years 10 months (32.10)
- Remaining Service: 2 years 9 months (33 months)
- Compensation 1: ₹5,421,786.30
- Compensation 2: ₹331,773.75
- Final VRS (before tax): ₹4,777,542.00
- After Tax Amount: ₹3,408,963.44

## Formula Verification

The calculator uses the exact same method as RINL's official VRS calculation system:

1. **Completed Service Notation**: Uses years.months (e.g., 32.10 for 32 years 10 months)
2. **Remaining Service**: Converts to decimal years (33 months = 2.75 years)
3. **VRS Cap**: Ensures VRS doesn't exceed Basic+DA until retirement
4. **Tax Rules**: ₹5 lakh exempt, 32% flat rate on remaining amount

## License

This project is for informational purposes only. Always verify calculations with official RINL HR department before making VRS decisions.

## Disclaimer

This calculator provides estimates based on the Gujarat Model VRS formula. Actual VRS amounts may vary based on:
- Company-specific policies
- Government regulations
- Tax law changes
- Individual employment terms

**Always consult with RINL HR department and financial advisors before making VRS decisions.**

## Support

For issues or questions:
1. Check the calculation verification section
2. Review the official RINL VRS documentation
3. Contact RINL HR department for official calculations

## Author

Developed for RINL (Rashtriya Ispat Nigam Limited) - Visakhapatnam Steel Plant employees.

---

**Note**: This tool is designed to help employees make informed decisions about VRS by providing transparent calculations and comprehensive financial analysis.

**Output:**
- Total Basic Pay: ₹57,000
- Current Salary: ₹77,000
- Service: 25 years, 11 months
- Compensation: ₹4,32,26,250
- Notice Pay: ₹77,010
- **Total Payout: ₹4,33,03,260**

## Disclaimer

This calculator provides an estimate based on the Gujarat Pattern formula. Actual VRS benefits may vary based on company policy, government regulations, and individual circumstances. Please consult with HR department for official calculations.

## License

This project is created for RINL employees. For informational purposes only.

## Support

For issues or questions, please contact RINL HR Department.

---

© 2025 RINL - Rashtriya Ispat Nigam Limited
