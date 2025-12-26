# RINL VRS Calculator

A professional, user-friendly web application to calculate Voluntary Retirement Scheme (VRS) compensation for RINL (Rashtriya Ispat Nigam Limited) employees.

## Features

✅ Real-time VRS compensation calculation  
✅ Based on Gujarat Pattern formula  
✅ Clean, modern UI with Shadcn components  
✅ Mobile-responsive design  
✅ Form validation with Zod  
✅ Date pickers for easy input  
✅ Detailed compensation breakdown  
✅ Print-friendly results  

## Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **UI Library**: Shadcn UI (Radix UI + Tailwind CSS)
- **Styling**: Tailwind CSS
- **Form**: React Hook Form
- **Validation**: Zod
- **Date Handling**: date-fns

## Getting Started

### Prerequisites

- Node.js >= 20.9.0
- npm or yarn

### Installation

```bash
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

## VRS Calculation Formula

### Gujarat Pattern

**For Completed Service:**  
35 days of salary × completed years of service

**For Leftover Service:**  
25 days of salary × remaining years until superannuation (58 years)

**Minimum Guarantee:**  
Higher of ₹25,000 or 250 days salary

**Notice Pay:**  
30 days of salary

**Total Payout:**  
Final Compensation + Notice Pay

### Calculation Components

- **Total Basic Pay** = Basic Pay + Stagnation Increment + Personal Pay
- **Current Salary** = Total Basic Pay + DA
- **Daily Salary** = Current Salary ÷ 30

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
│   │   ├── calculator-form.tsx # VRS input form
│   │   └── results-display.tsx # Results breakdown
│   ├── lib/
│   │   ├── calculations.ts     # VRS calculation logic
│   │   └── utils.ts            # Utility functions
│   └── types/
│       └── index.ts            # TypeScript interfaces
├── public/                     # Static assets
├── package.json
└── README.md
```

## Usage

1. Enter employee details:
   - Basic Pay
   - Stagnation Increment
   - Personal Pay (PP)
   - Dearness Allowance (DA)
   
2. Select dates:
   - Date of Joining
   - Date of Birth
   - Release Date (optional, defaults to today)

3. Click "Calculate VRS Compensation"

4. View detailed breakdown:
   - Salary components
   - Service details
   - Compensation calculation
   - Final payout

5. Print or save results using browser print function (Ctrl+P / Cmd+P)

## Deployment

### Deploy to Vercel (Recommended)

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

### Environment Variables

No environment variables required for MVP.

## Sample Calculation

**Input:**
- Basic Pay: ₹50,000
- Stagnation Increment: ₹5,000
- Personal Pay: ₹2,000
- DA: ₹20,000
- Date of Joining: 01-01-2000
- Date of Birth: 15-06-1970

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
